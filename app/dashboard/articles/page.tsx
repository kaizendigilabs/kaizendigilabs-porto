'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import { useArticles } from '@/hooks/useArticles'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function ArticlesPage() {
    const { articles, isLoading } = useArticles()

    return (
        <DataTable
            columns={columns}
            data={articles || []}
            searchKey="title"
            isLoading={isLoading}
            title="Articles"
            description="Manage your blog articles and content."
            createButton={
                <Button asChild>
                    <Link href="/dashboard/articles/new">
                        <Plus className="mr-2 h-4 w-4" /> New Article
                    </Link>
                </Button>
            }
        />
    )
}
