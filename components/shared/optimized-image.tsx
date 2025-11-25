"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
    src: string | null | undefined
    fallbackSrc?: string
}

export function OptimizedImage({
    src,
    alt,
    fallbackSrc = "/images/placeholder.svg",
    className,
    ...props
}: OptimizedImageProps) {
    const [error, setError] = useState(false)

    // Use fallback if src is missing or if error occurred
    const imageSource = error || !src ? fallbackSrc : src
    const isPlaceholder = imageSource === fallbackSrc

    // If using placeholder, render with special styling
    if (isPlaceholder) {
        return (
            <div className="relative w-full h-full bg-zinc-100 flex items-center justify-center">
                <div className="w-16 h-16 opacity-30">
                    <Image
                        src={imageSource}
                        alt={alt}
                        width={64}
                        height={64}
                        className="object-contain"
                    />
                </div>
            </div>
        )
    }

    return (
        <Image
            src={imageSource}
            alt={alt}
            onError={() => setError(true)}
            className={className}
            {...props}
        />
    )
}
