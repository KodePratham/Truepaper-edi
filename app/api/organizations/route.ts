import { NextRequest, NextResponse } from 'next/server'
import { readOrganizations, addOrganization } from '@/lib/organizations'

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

    const newOrganization = addOrganization(organizationName, password)

    return NextResponse.json({
      success: true,
      id: newOrganization.id,
      message: 'Organization created successfully'
    })
  } catch (error) {
    console.error('Error saving organization:', error)

    if (error instanceof Error && error.message === 'Organization name already exists') {
      return NextResponse.json(
        { error: 'Organization name already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to save organization' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const organizations = readOrganizations()
    // Remove passwords from response
    const safeOrganizations = organizations.map(({ password, ...org }) => org)
    return NextResponse.json(safeOrganizations)
  } catch (error) {
    console.error('Error reading organizations:', error)
    return NextResponse.json(
      { error: 'Failed to read organizations' },
      { status: 500 }
    )
  }
}
