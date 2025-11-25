'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { deleteFAQ, toggleFAQPublished } from './actions';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export type FAQ = {
    id: string;
    question: string;
    answer: string;
    published: boolean;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<FAQ>[] = [
    {
        accessorKey: 'question',
        header: 'Question',
        cell: ({ row }) => {
            return <div className="font-medium max-w-[300px] truncate" title={row.getValue('question')}>{row.getValue('question')}</div>;
        },
    },
    {
        accessorKey: 'answer',
        header: 'Answer',
        cell: ({ row }) => {
            return <div className="text-muted-foreground max-w-[400px] truncate" title={row.getValue('answer')}>{row.getValue('answer')}</div>;
        },
    },
    {
        accessorKey: 'published',
        header: 'Published',
        cell: ({ row }) => {
            const faq = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

            return (
                <Switch
                    checked={faq.published}
                    onCheckedChange={async (checked) => {
                        try {
                            await toggleFAQPublished(faq.id, checked);
                            toast.success(`FAQ ${checked ? 'published' : 'unpublished'}`);
                            router.refresh();
                        } catch (error) {
                            toast.error('Failed to update status');
                            console.error(error);
                        }
                    }}
                />
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const faq = row.original;

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
                            <Link href={`/dashboard/faq/${faq.id}`} className="flex items-center cursor-pointer">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={async () => {
                                if (confirm('Are you sure you want to delete this FAQ?')) {
                                    try {
                                        await deleteFAQ(faq.id);
                                        toast.success('FAQ deleted');
                                    } catch (error) {
                                        toast.error('Failed to delete FAQ');
                                        console.error(error);
                                    }
                                }
                            }}
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
