import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

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
    const { data: existingOrg, error: checkError } = await supabase
      .from('organizations')
      .select('id')
      .eq('organization_name', organizationName)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking existing organization:', checkError)
      return NextResponse.json(
        { error: 'Failed to check organization existence' },
        { status: 500 }
      )
    }

    if (existingOrg) {
      return NextResponse.json(
        { error: 'Organization name already exists' },
        { status: 409 }
      )
    }

    // Insert new organization
    const { data, error } = await supabase
      .from('organizations')
      .insert([
        {
          organization_name: organizationName,
          password: password
        }
      ])
      .select('id, organization_name, created_at')
      .single()

    if (error) {
      console.error('Error inserting organization:', error)
      return NextResponse.json(
        { error: 'Failed to create organization' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      organization: data,
      message: 'Organization created successfully'
    })
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
    const { data: organizations, error } = await supabase
      .from('organizations')
      .select('id, organization_name, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching organizations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch organizations' },
        { status: 500 }
      )
    }

    return NextResponse.json(organizations || [])
  } catch (error) {
    console.error('Error reading organizations:', error)
    return NextResponse.json(
      { error: 'Failed to read organizations' },
      { status: 500 }
    )
  }
}
