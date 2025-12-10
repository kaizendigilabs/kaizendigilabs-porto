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
import { ProjectRecord } from "@/hooks/useProjects"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { deleteProject } from "./actions"
import { toast } from "sonner"

export const columns: ColumnDef<ProjectRecord>[] = [
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
                <Link href={`/dashboard/projects/${row.original.slug}`} className="hover:underline">
                    {row.getValue("title")}
                </Link>
            </div>
        ),
    },
    {
        accessorKey: "client",
        header: "Client",
    },
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => {
            const isPublished = row.getValue("published")
            return (
                <Badge variant={isPublished ? "default" : "secondary"}>
                    {isPublished ? "Published" : "Draft"}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const project = row.original

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
                            onClick={() => navigator.clipboard.writeText(project.slug)}
                        >
                            Copy Slug
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/projects/${project.slug}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-brand focus:text-brand"
                            onClick={async () => {
                                const result = await deleteProject(project.id)
                                if (result?.error) {
                                    toast.error(result.error)
                                } else {
                                    toast.success("Project deleted")
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
