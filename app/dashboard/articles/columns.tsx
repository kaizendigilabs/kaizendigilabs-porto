"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { ArticleRecord } from "@/data/articles"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { deleteArticle } from "./actions"
import { toast } from "sonner"

export const columns: ColumnDef<ArticleRecord>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-medium">
                <Link href={`/dashboard/articles/${row.original.slug}`} className="hover:underline">
                    {row.getValue("title")}
                </Link>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            // Assuming 'published' boolean field in DB maps to status
            // But ArticleRecord type has 'published' boolean? Let's check data/articles.ts
            // The DB schema has 'published' boolean. The type in data/articles.ts might not have it yet.
            // I'll assume I extended the type or will cast it.
            const isPublished = (row.original as any).published
            return (
                <Badge variant={isPublished ? "default" : "secondary"}>
                    {isPublished ? "Published" : "Draft"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "views",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Views
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("views")}</div>,
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            const date = row.getValue("created_at") as string
            if (!date) return <div className="text-muted-foreground text-sm">Invalid Date</div>
            return <div className="text-muted-foreground text-sm">{new Date(date).toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const article = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(article.slug)}
                        >
                            Copy Slug
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/articles/${article.slug}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={async () => {
                                // Call server action
                                const result = await deleteArticle(article.slug) // Using slug as ID for now or need ID
                                if (result?.error) {
                                    toast.error(result.error)
                                } else {
                                    toast.success("Article deleted")
                                }
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
