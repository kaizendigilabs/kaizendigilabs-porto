import useSWR from 'swr'
import { ArticleRecord } from '@/data/articles'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useArticles() {
    const { data, error, isLoading, mutate } = useSWR<ArticleRecord[]>(
        '/api/articles',
        fetcher
    )

    return {
        articles: data,
        isLoading,
        isError: error,
        mutate,
    }
}
