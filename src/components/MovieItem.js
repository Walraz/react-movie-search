import React, {useEffect} from 'react'
import fadeInTop from '../effects/fadeInTop'

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieItem(props) {
  const { poster_path, title, release_date, id } = props.item
  const imagePath = IMG_BASE_URL + poster_path

  useEffect(() => fadeInTop(`[data-movie-item="${id}"]`), [id])

  return (
    <div className="w-1/2 md:w-64 p-2">
    <div data-movie-item={id} className="transition-all opacity-0 translate-y-n1 w-full flex flex-col rounded shadow bg-white relative overflow-hidden">
      <div className="w-full">
        {
          poster_path && <img className="object-fit" src={imagePath} alt={title} />
        }
        
      </div>
      <div className="flex-shrink-0 flex flex-col p-4">
        <p className="text-xs font-medium text-gray-600">{ release_date }</p>
        <h1 className="break-words text-lg truncate font-bold">{ title }</h1>
      </div>
    </div>
    </div>
  )
}

export default MovieItem