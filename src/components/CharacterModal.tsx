import { Character } from '../types/marvel'

interface ModalProps {
    character: Character
    onClose: () => void
}

function CharacterModal({ character, onClose }: ModalProps) {

    if (!character) return null;

    return (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50" onClick={onClose}>

            <div className='bg-[url(public/images/backgroundapp.jpg)] bg-cover bg-center rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6'onClick={(e)=>e.stopPropagation()}>

                <div>

                    <div className='flex justify-end'>
                        <button onClick={onClose} className='text-white hover:text-red-600 text-2xl'>
                            X
                        </button>
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold text-white text-center'>
                            {character.name}
                        </h2>
                    </div>

                </div>

                <div className='mb-4 mt-4'>
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} className='w-full h-60 object-contain' />
                </div>

                <p className="mb-4 text-white text-center">
                    {character.description || 'Descrição não disponível.'}
                </p>

                <div className='border border-white mb-4 p-2'>
                    <h3 className="font-bold text-3xl text-white mb-4">Info</h3>
                    <div className="list-disc pl-6 text-left">
                        <p className='text-white'>Comics Avaliable: {character.comics.available}</p>
                        <p className='text-white'>Series Avaliable: {character.series.available}</p>
                        <p className='text-white'>Stories Avaliable: {character.stories.available}</p>
                        {character.urls && character.urls[2]?.url?(
                            <p className='text-white'>Comics Links: <a href={character.urls[2].url} target='blank' className='underline'>See Comics</a></p>   
                        ):(
                            <p>Comics Links: Link Unavaliable</p>
                        )}
                        
                    </div>
                </div>

                <div className='border border-white mb-4 p-2'>
                    <h3 className="font-bold text-3xl text-white mb-4">Top Comics</h3>
                    <div className="list-disc pl-6 text-left text-white">
                        {character.series.items.slice(0, 5).map((comic) => (
                            <li key={comic.name} className="text-white">{comic.name}</li>
                        ))}
                    </div>
                </div>

                <div className='border border-white mb-4 p-2'>
                    <h3 className="font-bold text-3xl text-white mb-4">Top Events</h3>
                    {character.events.items.length > 0 ?
                    <div className="list-disc pl-6 text-left">
                        {character.events.items.map((comic) => (
                            <li key={comic.name} className="text-white">{comic.name}</li>
                        ))}
                    </div> : <p>No events</p>}
                    
                </div>

                <div className='border border-white mb-4 p-2'>
                    <h3 className="font-bold text-3xl text-white mb-4">Top Series</h3>
                    <div className="list-disc pl-6 text-left">
                        {character.series.items.slice(0, 5).map((comic) => (
                            <li key={comic.name} className="text-white">{comic.name}</li>
                        ))}
                    </div>
                </div>

                <div className='border border-white mb-4 p-2'>
                    <h3 className="font-bold text-3xl text-white mb-4">Top Stories</h3>
                    <div className="list-disc pl-6 text-left">
                        {character.stories.items.slice(0, 5).map((comic) => (
                            <li key={comic.name} className="text-white">{comic.name}</li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterModal