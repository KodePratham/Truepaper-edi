import { NextRequest, NextResponse } from 'next/server'

// Import the same organizations array (in a real app, you'd use a database)
let organizations = [
  {
    "id": "1753243673939",
    "organizationName": "Test Org",
    "password": "123456",
    "createdAt": "2025-07-23T04:07:53.939Z"
  },
  {
    "id": "1753244560331",
    "organizationName": "Nayan",
    "password": "123456",
    "createdAt": "2025-07-23T04:22:40.331Z"
  }
]

export async function POST(request: NextRequest) {
  try {
    const { organizationName, password } = await request.json()

    if (!organizationName || !password) {
      return NextResponse.json(
        { error: 'Organization name and password are required' },
        { status: 400 }
      )
    }

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
