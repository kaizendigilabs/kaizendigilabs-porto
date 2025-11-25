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
    ...props
}: OptimizedImageProps) {
    const [error, setError] = useState(false)

    // Use fallback if src is missing or if error occurred
    const imageSource = error || !src ? fallbackSrc : src

    return (
        <Image
            src={imageSource}
            alt={alt}
            onError={() => setError(true)}
            {...props}
        />
    )
}
