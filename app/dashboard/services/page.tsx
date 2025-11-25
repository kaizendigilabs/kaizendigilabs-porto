'use client'

import { DataTable } from '@/components/data-table'
import { columns } from './columns'
import { useServices } from '@/hooks/useServices'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
    const { services, isLoading } = useServices()

    return (
        <DataTable
            columns={columns}
            data={services || []}
            searchKey="title"
            isLoading={isLoading}
            title="Services"
            description="Manage your service offerings and capabilities."
            createButton={
                <Button asChild>
                    <Link href="/dashboard/services/new">
                        <Plus className="mr-2 h-4 w-4" /> New Service
                    </Link>
                </Button>
            }
        />
    )
}
