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
import { InquiryRecord } from "@/hooks/useInquiries"
import { deleteInquiry, updateInquiryStatus } from "./actions"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

// Extend Window interface for inquiry details
declare global {
    interface Window {
        openInquiryDetails?: (inquiry: InquiryRecord) => void;
    }
}

export const columns: ColumnDef<InquiryRecord>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name & Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            const email = row.original.email;
            const isUnread = row.original.status === "new";
            return (
                <div className="flex flex-col cursor-pointer hover:opacity-80" onClick={() => window.openInquiryDetails?.(row.original)}>
                    <span className={cn("text-foreground", isUnread ? "font-bold" : "font-medium")}>{name}</span>
                    <span className={cn("text-xs", isUnread ? "font-bold text-foreground" : "text-muted-foreground")}>{email}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => {
            const company = row.getValue("company") as string;
            const isUnread = row.original.status === "new";
            return (
                <div
                    className={cn("cursor-pointer hover:opacity-80", isUnread ? "font-bold text-foreground" : "")}
                    onClick={() => window.openInquiryDetails?.(row.original)}
                >
                    {company || "-"}
                </div>
            );
        }
    },
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => {
            const subject = row.getValue("subject") as string;
            const isUnread = row.original.status === "new";
            return (
                <div
                    className={cn("cursor-pointer truncate max-w-[150px]", isUnread ? "font-bold text-foreground" : "")}
                    onClick={() => window.openInquiryDetails?.(row.original)}
                >
                    {subject}
                </div>
            );
        }
    },
    {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => {
            const message = row.getValue("message") as string;
            const isUnread = row.original.status === "new";
            return (
                <div
                    className={cn("cursor-pointer hover:opacity-80 truncate max-w-[200px]", isUnread ? "font-bold text-foreground" : "text-muted-foreground")}
                    onClick={() => window.openInquiryDetails?.(row.original)}
                >
                    {message}
                </div>
            );
        }
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            const isUnread = row.original.status === "new";
            return (
                <div className={cn("text-sm", isUnread ? "font-bold text-foreground" : "text-muted-foreground")}>
                    {new Date(row.getValue("created_at")).toLocaleDateString()}
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const inquiry = row.original
            const openDetails = () => window.openInquiryDetails?.(inquiry);

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
                        <DropdownMenuItem onClick={openDetails}>
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(inquiry.email)}
                        >
                            Copy Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={async () => {
                                const result = await updateInquiryStatus(inquiry.id, "read")
                                if (result?.error) toast.error(result.error)
                                else toast.success("Marked as read")
                            }}
                        >
                            Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async () => {
                                const result = await updateInquiryStatus(inquiry.id, "archived")
                                if (result?.error) toast.error(result.error)
                                else toast.success("Archived")
                            }}
                        >
                            Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-brand focus:text-brand"
                            onClick={async () => {
                                const result = await deleteInquiry(inquiry.id)
                                if (result?.error) {
                                    toast.error(result.error)
                                } else {
                                    toast.success("Inquiry deleted")
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
