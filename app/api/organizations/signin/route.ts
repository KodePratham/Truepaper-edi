import { NextRequest, NextResponse } from 'next/server'
import { findOrganization } from '@/lib/organizations'

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

    // Find organization with matching credentials
    const organization = findOrganization(organizationName, password)

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
