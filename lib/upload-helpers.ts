import { createServerClient } from './supabase/server';

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name ('team-images' or 'testimonial-images')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
    file: File,
    bucket: 'team-images' | 'testimonial-images',
    folder?: string
): Promise<{ url: string; path: string } | { error: string }> {
    try {
        const supabase = await createServerClient();

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = folder ? `${folder}/${fileName}` : fileName;

        // Upload file
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('Upload error:', error);
            return { error: error.message };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return { url: publicUrl, path: data.path };
    } catch (error) {
        console.error('Upload exception:', error);
        return { error: 'Failed to upload image' };
    }
}

/**
 * Delete an image from Supabase Storage
 * @param path - The file path in storage (not the full URL)
 * @param bucket - The storage bucket name
 */
export async function deleteImage(
    path: string,
    bucket: 'team-images' | 'testimonial-images'
): Promise<{ success: boolean; error?: string }> {
    try {
        const supabase = await createServerClient();

        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            console.error('Delete error:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Delete exception:', error);
        return { success: false, error: 'Failed to delete image' };
    }
}

/**
 * Extract the storage path from a public URL
 * @param url - The public URL from Supabase Storage
 * @param bucket - The storage bucket name
 * @returns The file path within the bucket
 */
export function getPathFromUrl(
    url: string,
    bucket: 'team-images' | 'testimonial-images'
): string | null {
    try {
        // URL format: https://{project}.supabase.co/storage/v1/object/public/{bucket}/{path}
        const bucketPath = `/storage/v1/object/public/${bucket}/`;
        const index = url.indexOf(bucketPath);

        if (index === -1) return null;

        return url.substring(index + bucketPath.length);
    } catch {
        return null;
    }
}
