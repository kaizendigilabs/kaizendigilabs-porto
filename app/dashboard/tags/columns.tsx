'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { deleteTag } from './actions';

export type Tag = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
};

export const columns: ColumnDef<Tag>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
        cell: ({ row }) => (
            <code className="text-xs bg-zinc-100 px-2 py-1 rounded">
                {row.getValue('slug')}
            </code>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const description = row.getValue('description') as string | null;
            return (
                <div className="text-sm text-muted-foreground max-w-md truncate">
                    {description || '—'}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const tag = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/tags/${tag.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={async () => {
                                if (confirm('Are you sure you want to delete this tag?')) {
                                    await deleteTag(tag.id);
                                }
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
