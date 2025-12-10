'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { deleteTestimonial, toggleTestimonialPublished } from './actions';

export type Testimonial = {
    id: string;
    name: string;
    role: string | null;
    company: string | null;
    content: string;

    published: boolean | null;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<Testimonial>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const testimonial = row.original;
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{testimonial.name}</span>
                    <span className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'content',
        header: 'Testimonial',
        cell: ({ row }) => {
            const content = row.getValue('content') as string;
            return (
                <div className="max-w-md truncate text-sm text-muted-foreground">
                    {content}
                </div>
            );
        },
    },

    {
        accessorKey: 'published',
        header: 'Status',
        cell: ({ row }) => {
            const published = row.getValue('published') as boolean;
            return (
                <Badge variant={published ? 'default' : 'secondary'}>
                    {published ? 'Published' : 'Draft'}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const testimonial = row.original;

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
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/testimonials/${testimonial.id}`}>
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async () => {
                                await toggleTestimonialPublished(testimonial.id, !testimonial.published);
                            }}
                        >
                            {testimonial.published ? 'Unpublish' : 'Publish'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={async () => {
                                if (confirm('Are you sure you want to delete this testimonial?')) {
                                    await deleteTestimonial(testimonial.id);
                                }
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
