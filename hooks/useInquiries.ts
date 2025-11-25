import useSWR from 'swr'

export type InquiryRecord = {
    id: string
    name: string
    email: string
    phone?: string
    company?: string
    subject: string
    message: string
    status: 'new' | 'read' | 'archived'
    created_at: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useInquiries() {
    const { data, error, isLoading, mutate } = useSWR<InquiryRecord[]>(
        '/api/inquiries',
        fetcher
    )

    return {
        inquiries: data,
        isLoading,
        isError: error,
        mutate,
    }
}
