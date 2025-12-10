import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase.rpc('get_unique_tech_stacks');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // data is an array of objects: [{ tech: 'React' }, { tech: 'Next.js' }]
  // map to array of strings
  const stacks = data.map((item: { tech: string }) => item.tech);

  return NextResponse.json(stacks);
}
