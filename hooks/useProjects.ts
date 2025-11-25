import useSWR from 'swr'

// Define Project type based on DB schema
export type ProjectRecord = {
    id: string
    title: string
    slug: string
    category: string
    year: string
    image_url: string
    size?: string
    client?: string
    description?: string
    services?: string[]
    images?: string[]
    published: boolean
    created_at: string
    updated_at: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useProjects() {
    const { data, error, isLoading, mutate } = useSWR<ProjectRecord[]>(
        '/api/projects',
        fetcher
    )

    return {
        projects: data,
        isLoading,
        isError: error,
        mutate,
    }
}
