import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from('services')
    .select('title')
    .order('title');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // data is an array of objects: [{ title: 'Service A' }, { title: 'Service B' }]
  // map to array of strings
  const services = data.map((item: { title: string }) => item.title);

  return NextResponse.json(services);
}
