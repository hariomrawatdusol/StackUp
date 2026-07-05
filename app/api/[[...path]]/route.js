import { NextResponse } from 'next/server'

// StackUp MVP is a client-only app (mock data + localStorage via Zustand).
// This route exists only so /api/* returns clean JSON instead of a 404.

function cors(res) {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return res
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 200 }))
}

async function handler(request, { params }) {
  const { path = [] } = (await params) || { path: [] }
  const route = '/' + path.join('/')

  if (route === '/' || route === '/health') {
    return cors(NextResponse.json({
      ok: true,
      app: 'StackUp',
      tagline: 'Stack skills. Stack clients. Stack income.',
      env: process.env.NODE_ENV,
    }))
  }

  return cors(NextResponse.json({ ok: false, error: 'Not found', route }, { status: 404 }))
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler
