import { fetchCharacters} from './services/marvel'
import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Character } from './types/marvel'
import CharacterModal from './components/CharacterModal'
import LoadingSpinner from './components/Spinner'

function App() {
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [suggestions, setSuggestions] = useState<Character[]>([])


  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true)
        const { results, total } = await fetchCharacters(
          currentPage,
          20,
          appliedSearchQuery,
        )
        setTotalPages(Math.ceil(total / 20))
        setCharacters(results)
        setError(null)
      } catch (err) {
        setError('Unable to load characters. Try again.')
      } finally {
        setLoading(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (autocompleteRef.current && !autocompleteRef.current.contains(target)) {
        setSuggestions([])
      }
    }

    loadCharacters()
    window.addEventListener('click', handleClickOutside)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [currentPage, appliedSearchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    setAppliedSearchQuery(searchQuery)
  }

  const handleSeeAll = () => {
    setSearchQuery('')
    setAppliedSearchQuery('')
    setCurrentPage(1)
  }

  const fetchSuggestion = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([])
      return
    }

    try {
      const { results } = await fetchCharacters(1, 5, query)
      setSuggestions(results)
    } catch (err) {
      console.log('error fetching suggestions', err)
      setSuggestions([])
    }
  }

  return (
    <div className='w-full bg-[url(public/images/bg-red.jpg)] bg-contain text-white text-center overflow-hidden'>
      <h1 onClick={handleSeeAll} className='lg:w-[43%] m-auto cursor-pointer font-bold text-3xl md:text-4xl lg:text-6xl mb-9 pt-9'>
        Marvel Character Data
      </h1>

      <form onSubmit={handleSearch} className='mb-9 px-4 md:flex md:justify-center lg:flex lg:justify-center'>
        <div className="autocomplete-container" ref={autocompleteRef}>
          <div className='flex w-full'>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                fetchSuggestion(e.target.value)
              }}
              placeholder='Find character'
              className='w-3xl px-4 py-2 rounded-bl-lg rounded-tl-lg border border-white focus:ring-1 focus:ring-white-500 focus:border-transparent outline-0 lg'
            />
            <button
              type="submit"
              className="border border-white px-6 py-2 bg-red-800 cursor-pointer text-white rounded-tr-lg rounded-br-lg hover:bg-red-950 transition-colors "
            >
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="max-w-md mx-auto bg-white text-red-800 shadow-lg mt-1">
              {suggestions.map((character) => (
                <li
                  key={character.id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer border-b border-red-800"
                  onClick={() => {
                    setSearchQuery(character.name)
                    setSuggestions([])
                  }}
                >
                  {character.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      <div onClick={handleSeeAll} className='flex justify-start mb-5'>
        <button className='border border-white px-6 py-2 bg-red-800 cursor-pointer text-white rounded hover:bg-red-950 transition-colors m-auto md:m-10 lg:m-10'>
          Reset All
        </button>
      </div>

      {loading && <p className="text-center text-white text-xl"><LoadingSpinner /></p>}

      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      {!loading && !error && characters.length === 0 && (
        <p className="text-center text-white text-xl">
          No results found "{searchQuery}"
        </p>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10'>
        {characters.map((character) => (
          <div key={character.id} className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow hover:scale-105 hover:transition-transform'>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className='w-full h-64 object-contain rounded-t-lg'
            />
            <div className='mt-4'>
              <h2 className='text-xl font-bold text-gray-800'>{character.name}</h2>
              <button
                className='mt-2 border border-white px-6 py-2 bg-red-800 cursor-pointer text-white rounded hover:bg-red-950 transition-colors'
                onClick={() => setSelectedCharacter(character)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className='mt-2 border border-white px-6 py-2 bg-red-800 cursor-pointer text-white rounded hover:bg-red-950 transition-colors'
        >
          Back
        </button>

        <span className="px-4 py-2 text-white">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === totalPages}
          className='mt-2 border border-white px-6 py-2 bg-red-800 cursor-pointer text-white rounded hover:bg-red-950 transition-colors'
        >
          Next
        </button>
      </div>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  )
}

export default App