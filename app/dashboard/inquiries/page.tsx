'use client'

import * as React from 'react'
import { DataTable } from '@/components/data-table'
import { useInquiries, InquiryRecord } from '@/hooks/useInquiries'
import { columns } from './columns'
import { InquiryDetailsDialog } from './_components/inquiry-details-dialog'
import { updateInquiryStatus } from './actions'

export default function InquiriesPage() {
    const { inquiries, isLoading } = useInquiries()
    const [selectedInquiry, setSelectedInquiry] = React.useState<InquiryRecord | null>(null)
    const [detailsOpen, setDetailsOpen] = React.useState(false)

    // Expose open handler to window for columns to access
    React.useEffect(() => {
        (window as any).openInquiryDetails = (inquiry: InquiryRecord) => {
            setSelectedInquiry(inquiry)
            setDetailsOpen(true)
        }
        return () => {
            delete (window as any).openInquiryDetails
        }
    }, [])

    // Custom row click handler for inquiries
    const handleRowClick = async (inquiry: InquiryRecord) => {
        // Open details
        setSelectedInquiry(inquiry)
        setDetailsOpen(true)

        // Mark as read if new
        if (inquiry.status === 'new') {
            await updateInquiryStatus(inquiry.id, 'read')
        }
    }

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
