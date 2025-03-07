import md5 from 'md5'
import type { MarvelApiResponse } from '../types/marvel'

function generateAuthParams() {
  const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY
  const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY

  const ts = Date.now().toString()
  const hash = md5(ts + privateKey + publicKey)

  return { ts, apikey: publicKey, hash }
}

export async function fetchCharacters(
  page: number,
  pageSize = 20,
  searchQuery = '',
  filterType?: 'comics' | 'series' | 'events',
  filterId?: number | null
) {
  const { ts, apikey, hash } = generateAuthParams()
  const offset = (page - 1) * pageSize
  const url = new URL('https://gateway.marvel.com/v1/public/characters')

  url.searchParams.set('ts', ts)
  url.searchParams.set('apikey', apikey)
  url.searchParams.set('hash', hash)
  url.searchParams.set('limit', pageSize.toString())
  url.searchParams.set('offset', offset.toString())

  if (searchQuery) {
    url.searchParams.set('nameStartsWith', searchQuery)
  }

  if (filterType && filterId !== null && filterId !== undefined) {
    url.searchParams.set(filterType, filterId.toString())
  }

  try {
    const response = await fetch(url.toString())
    if (!response.ok) throw new Error('Failed to fetch characters')
    const data: MarvelApiResponse = await response.json()

    return {
      results: data.data.results,
      total: data.data.total
    }
  } catch (error) {
    console.error('Failed to find characters:', error)
    return { results: [], total: 0 }
  }
}