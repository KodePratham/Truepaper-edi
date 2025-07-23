import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'public', 'organizations.json')

export async function POST(request: NextRequest) {
  try {
    const { organizationName, password } = await request.json()

    if (!organizationName || !password) {
      return NextResponse.json(
        { error: 'Organization name and password are required' },
        { status: 400 }
      )
    }

    // Read existing data or create empty array
    let organizations = []
    if (fs.existsSync(dataFile)) {
      const fileContent = fs.readFileSync(dataFile, 'utf8')
      organizations = JSON.parse(fileContent)
    }

    // Check if organization name already exists
    const existingOrg = organizations.find(
      (org: any) => org.organizationName === organizationName
    )

    if (existingOrg) {
      return NextResponse.json(
        { error: 'Organization name already exists' },
        { status: 409 }
      )
    }

    // Add new organization
    const newOrganization = {
      id: Date.now().toString(),
      organizationName,
      password,
      createdAt: new Date().toISOString()
    }

    organizations.push(newOrganization)

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Write back to file
    fs.writeFileSync(dataFile, JSON.stringify(organizations, null, 2))

    return NextResponse.json({ success: true, id: newOrganization.id })
  } catch (error) {
    console.error('Error saving organization:', error)
    return NextResponse.json(
      { error: 'Failed to save organization' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(dataFile)) {
      return NextResponse.json([])
    }

    const fileContent = fs.readFileSync(dataFile, 'utf8')
    const organizations = JSON.parse(fileContent)
    
    return NextResponse.json(organizations)
  } catch (error) {
    console.error('Error reading organizations:', error)
    return NextResponse.json(
      { error: 'Failed to read organizations' },
      { status: 500 }
    )
  }
}
