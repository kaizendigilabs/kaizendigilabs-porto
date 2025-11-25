'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import { useProjects } from '@/hooks/useProjects'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function ProjectsPage() {
    const { projects, isLoading } = useProjects()

    return (
        <DataTable
            columns={columns}
            data={projects || []}
            searchKey="title"
            isLoading={isLoading}
            title="Projects"
            description="Manage your portfolio projects and case studies."
            createButton={
                <Button asChild>
                    <Link href="/dashboard/projects/new">
                        <Plus className="mr-2 h-4 w-4" /> New Project
                    </Link>
                </Button>
            }
        />
    )
}
