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
import { deleteTeamMember, toggleTeamMemberPublished } from './actions';
import { OptimizedImage } from '@/components/shared/optimized-image';

export type TeamMember = {
    id: string; // Mapped from user_id for DataTable
    user_id: string;
    full_name: string | null;
    job_title: string | null;
    bio: string | null;
    avatar: string | null;
    social_links: Record<string, string> | null;
    display_order: number | null;
    status: 'active' | 'inactive' | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<TeamMember>[] = [
    {
        accessorKey: 'avatar',
        header: 'Photo',
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-200">
                    <OptimizedImage
                        src={member.avatar || '/images/placeholder.svg'}
                        alt={member.full_name || 'User'}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: 'full_name',
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
            const member = row.original;
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{member.full_name}</span>
                    <span className="text-sm text-muted-foreground">{member.job_title}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'bio',
        header: 'Bio',
        cell: ({ row }) => {
            const bio = row.getValue('bio') as string | null;
            return (
                <div className="max-w-md truncate text-sm text-muted-foreground">
                    {bio || '-'}
                </div>
            );
        },
    },
    {
        accessorKey: 'display_order',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Order
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            return (
                <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                    {status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const member = row.original;

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
                            <Link href={`/dashboard/team/${member.user_id}`}>
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async () => {
                                await toggleTeamMemberPublished(member.user_id, member.status === 'active' ? 'inactive' : 'active');
                            }}
                        >
                            {member.status === 'active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={async () => {
                                if (confirm('Are you sure you want to delete this team member?')) {
                                    await deleteTeamMember(member.user_id);
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
