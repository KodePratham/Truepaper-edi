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

    // Read existing organizations
    if (!fs.existsSync(dataFile)) {
      return NextResponse.json(
        { error: 'No organizations found' },
        { status: 404 }
      )
    }

    const fileContent = fs.readFileSync(dataFile, 'utf8')
    const organizations = JSON.parse(fileContent)

    // Find organization with matching credentials
    const organization = organizations.find(
      (org: any) => org.organizationName === organizationName && org.password === password
    )

    if (!organization) {
      return NextResponse.json(
        { error: 'Invalid organization name or password' },
        { status: 401 }
      )
    }

    // Return success without password
    const { password: _, ...orgData } = organization
    return NextResponse.json({ 
      success: true, 
      organization: orgData,
      message: 'Sign in successful'
    })

  } catch (error) {
    console.error('Error during sign in:', error)
    return NextResponse.json(
      { error: 'Failed to sign in' },
      { status: 500 }
    )
  }
}
