import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

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
    const { data: organization, error } = await supabase
      .from('organizations')
      .select('id, organization_name, created_at')
      .eq('organization_name', organizationName)
      .eq('password', password)
      .maybeSingle()

    if (error) {
      console.error('Error finding organization:', error)
      return NextResponse.json(
        { error: 'Failed to authenticate' },
        { status: 500 }
      )
    }

    if (!organization) {
      return NextResponse.json(
        { error: 'Invalid organization name or password' },
        { status: 401 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      organization: organization,
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
