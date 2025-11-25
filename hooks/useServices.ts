import useSWR from 'swr'

export type ServiceRecord = {
    id: string
    slug: string
    title: string
    description: string
    capabilities: string[]
    icon?: string
    created_at: string
    updated_at: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useServices() {
    const { data, error, isLoading, mutate } = useSWR<ServiceRecord[]>(
        '/api/services',
        fetcher
    )

    return {
        services: data,
        isLoading,
        isError: error,
        mutate,
    }
}
