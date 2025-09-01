import {NextRequest, NextResponse} from 'next/server'
import {getPlausibleData} from '@/lib/plausible'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const period = searchParams.get('period') || '7d'
    const data = await getPlausibleData(period)
    if (!data) {
      return NextResponse.json(
        {error: 'Failed to fetch data from Plausible.'},
        {status: 500}
      )
    }
    return NextResponse.json(data)
  } catch (e) {
    console.error('Analytics detail error:', e)
    return NextResponse.json({
      error: 'Internal server error.',
    }, {status: 500})
  }
}