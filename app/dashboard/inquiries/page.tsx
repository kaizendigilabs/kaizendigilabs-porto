'use client'

import * as React from 'react'
import { DataTable } from '@/components/data-table'
import { useInquiries, InquiryRecord } from '@/hooks/useInquiries'
import { columns } from './columns'
import { InquiryDetailsDialog } from './_components/inquiry-details-dialog'

export default function InquiriesPage() {
    const { inquiries, isLoading } = useInquiries()
    const [selectedInquiry, setSelectedInquiry] = React.useState<InquiryRecord | null>(null)
    const [detailsOpen, setDetailsOpen] = React.useState(false)

    // Expose open handler to window for columns to access
    React.useEffect(() => {
        window.openInquiryDetails = (inquiry: InquiryRecord) => {
            setSelectedInquiry(inquiry)
            setDetailsOpen(true)
        }
        return () => {
            delete window.openInquiryDetails
        }
    }, [])

    return (
        <>
            <DataTable
                columns={columns}
                data={inquiries || []}
                searchKey="name"
                isLoading={isLoading}
                title="Inquiries"
                description="Manage customer inquiries and contact requests."
            />
            <InquiryDetailsDialog
                inquiry={selectedInquiry}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />
        </>
    )
}
