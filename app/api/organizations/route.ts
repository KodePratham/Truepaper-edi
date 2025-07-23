import { NextRequest, NextResponse } from 'next/server'

// In-memory storage (will reset on each deployment)
let organizations = [
  {
    id: '1753243673939',
    organizationName: 'Test Org',
    password: '123456',
    createdAt: '2025-07-23T04:07:53.939Z'
  },
  {
    id: '1753244560331',
    organizationName: 'Nayan',
    password: '123456',
    createdAt: '2025-07-23T04:22:40.331Z'
  }
]

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { organizationName, password } = await request.json()

    if (!organizationName || !password) {
      return NextResponse.json(
        { error: 'Organization name and password are required' },
        { status: 400 }
      )
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
    return NextResponse.json(organizations)
  } catch (error) {
    console.error('Error reading organizations:', error)
    return NextResponse.json(
      { error: 'Failed to read organizations' },
      { status: 500 }
    )
  }
}
