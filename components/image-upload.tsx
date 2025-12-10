'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
    value?: string | null;
    onChange: (url: string | null) => void;
    bucket: 'team-images' | 'testimonial-images' | 'project-images';
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, bucket, disabled }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = useCallback(async (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB');
            return;
        }

        setError(null);
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('bucket', bucket);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            onChange(data.url);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err instanceof Error ? err.message : 'Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    }, [bucket, onChange]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpload(file);
        }
    }, [handleUpload]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleUpload(file);
        }
    }, [handleUpload]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleRemove = useCallback(() => {
        onChange(null);
        setError(null);
    }, [onChange]);

    return (
        <div className="space-y-2">
            {value ? (
                <div className="relative group">
                    <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border border-zinc-200">
                        <Image
                            src={value}
                            alt="Upload preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {!disabled && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ) : (
                <div
                    className={`
            relative border-2 border-dashed rounded-lg p-8
            transition-colors cursor-pointer
            ${isDragging ? 'border-red-500 bg-red-50' : 'border-zinc-300 hover:border-zinc-400'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        disabled={disabled || isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />

                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        {isUploading ? (
                            <>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
                                <p className="text-sm text-zinc-600">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <div className="rounded-full bg-zinc-100 p-3">
                                    {isDragging ? (
                                        <Upload className="h-6 w-6 text-brand" />
                                    ) : (
                                        <ImageIcon className="h-6 w-6 text-zinc-600" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-900">
                                        {isDragging ? 'Drop image here' : 'Click to upload or drag and drop'}
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-1">
                                        PNG, JPG, GIF up to 5MB
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
