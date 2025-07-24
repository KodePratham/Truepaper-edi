import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const certificateId = searchParams.get('id')

    if (!certificateId) {
      return NextResponse.json(
        { error: 'Certificate ID is required' },
        { status: 400 }
      )
    }

    // Find certificate by ID
    const { data: certificate, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', certificateId)
      .maybeSingle()

    if (error) {
      console.error('Error finding certificate:', error)
      return NextResponse.json(
        { error: 'Failed to verify certificate' },
        { status: 500 }
      )
    }

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      certificate: certificate,
      message: 'Certificate verified successfully'
    })

  } catch (error) {
    console.error('Error during certificate verification:', error)
    return NextResponse.json(
      { error: 'Failed to verify certificate' },
      { status: 500 }
    )
  }
}
