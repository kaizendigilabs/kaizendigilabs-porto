"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ArticleEditor from "@/components/editor"
import { createArticle } from "../actions"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewArticlePage() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState<any>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await createArticle({
                title,
                slug,
                content,
                published: false, // Default to draft
            })

            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("Article created")
                router.push("/dashboard/articles")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/articles">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">New Article</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                // Auto-generate slug
                                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""))
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Content</Label>
                    <ArticleEditor onChange={setContent} />
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Create Article"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
