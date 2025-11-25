"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ArticleEditor from "@/components/editor"
import { updateArticle } from "../actions"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useArticles } from "@/hooks/useArticles"

export default function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter()
    const { slug: paramSlug } = use(params)
    const { articles } = useArticles()
    const [article, setArticle] = useState<any>(null)
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState<any>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (articles) {
            const found = articles.find((a) => a.slug === paramSlug)
            if (found) {
                setArticle(found)
                setTitle(found.title)
                setSlug(found.slug)
                setContent(found.content)
            }
        }
    }, [articles, paramSlug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await updateArticle(paramSlug, {
                title,
                slug,
                content,
            })

            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("Article updated")
                router.push("/dashboard/articles")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!article && !articles) return <div>Loading...</div>
    if (!article && articles) return <div>Article not found</div>

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/articles">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Edit Article</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                    <ArticleEditor initialValue={content} onChange={setContent} />
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Update Article"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
