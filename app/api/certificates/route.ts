import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { name, certificateUrl, organizationId, organizationName } = await request.json()

    if (!name || !certificateUrl || !organizationId || !organizationName) {
      return NextResponse.json(
        { error: 'Name, certificate URL, organization ID, and organization name are required' },
        { status: 400 }
      )
    }

    // Generate unique certificate ID
    const certificateId = uuidv4()

    // Insert new certificate
    const { data, error } = await supabase
      .from('certificates')
      .insert([
        {
          id: certificateId,
          name: name,
          certificate_url: certificateUrl,
          organization_id: organizationId,
          organization_name: organizationName
        }
      ])
      .select('*')
      .single()

    if (error) {
      console.error('Error inserting certificate:', error)
      return NextResponse.json(
        { error: 'Failed to issue certificate' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      certificate: data,
      message: 'Certificate issued successfully'
    })
  } catch (error) {
    console.error('Error issuing certificate:', error)
    return NextResponse.json(
      { error: 'Failed to issue certificate' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data: certificates, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching certificates:', error)
      return NextResponse.json(
        { error: 'Failed to fetch certificates' },
        { status: 500 }
      )
    }

    return NextResponse.json(certificates || [])
  } catch (error) {
    console.error('Error reading certificates:', error)
    return NextResponse.json(
      { error: 'Failed to read certificates' },
      { status: 500 }
    )
  }
}
