import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Construct headers dynamically to avoid sending "Bearer undefined"
    const headers: Record<string, string> = {};
    const jwt = process.env.PINATA_JWT;
    const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || process.env.PINATA_API_KEY;
    const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || process.env.PINATA_SECRET_KEY;

    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    } else if (apiKey && secretKey) {
      headers['pinata_api_key'] = apiKey;
      headers['pinata_secret_api_key'] = secretKey;
    } else {
      console.error("Missing Pinata credentials");
      return NextResponse.json({ error: "Server configuration error: Missing Pinata credentials" }, { status: 500 });
    }

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: headers,
      body: data,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Pinata API Error:", errorText);
      return NextResponse.json({ error: `Pinata Upload Failed: ${res.statusText}` }, { status: res.status });
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch (error: any) {
    console.error("IPFS Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
