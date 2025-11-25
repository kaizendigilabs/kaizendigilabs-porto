import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/upload-helpers';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const bucket = formData.get('bucket') as 'team-images' | 'testimonial-images';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        if (!bucket || !['team-images', 'testimonial-images', 'project-images'].includes(bucket)) {
            return NextResponse.json(
                { error: 'Invalid bucket' },
                { status: 400 }
            );
        }

        const result = await uploadImage(file, bucket);

        if ('error' in result) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Upload API error:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
