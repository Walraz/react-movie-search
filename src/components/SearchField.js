import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { get } from '../api/search.api'
import fadeInTop from '../effects/fadeInTop'

const noResultAction = (props) => {
  props.onSearch({
    type: 'ERROR',
    error: 'No results...'
  })
}

function SearchField(props) {
  const [ searchValue, setSearchValue ] = useState('')

  const [searchHandler] = useDebouncedCallback(() => {
    if(!searchValue.length) {
      return noResultAction(props)
    }
    props.onSearch({
      type: 'SEARCHING',
    })
    get(searchValue).then(({data}) => {
      const payload = data.results
      if(!payload.length) {
        return noResultAction(props)
      }
      props.onSearch({
        type: 'SUCCESS',
        payload
      })
    }).catch((error) => {
      props.onSearch({
        type: 'ERROR',
        error: error.message
      })
    })
  }, 300)

  const onClear = () => {
    setSearchValue('')
    props.onClear()
  }

  const { placeholder = ''} = props
  const attrs = { placeholder }

  useEffect(() => fadeInTop('[data-search-field]'), [])

  return (
    <div data-search-field className="transition-all h-12 md:h-24 translate-y-n1 opacity-0 flex flex-col shadow-lg fixed top-0 inset-x w-full z-10 bg-white">
      <div className="container mx-auto flex items-center h-full">
      <input
        {...attrs} 
        autoFocus
        className="rounded-none text-base md:text-4xl px-6 h-full w-full focus:outline-none"
        value={ searchValue }
        onChange={ searchHandler }
        onInput={({target}) => setSearchValue(target.value)} />
        { searchValue.length > 0 && <button className="mr-4 text-sm md:text-lg font-bold text-gray-700 w-10 h-10 rounded-full focus:outline-none focus:bg-gray-200 items-center justify-center flex" onClick={onClear}>&#x2715;</button> }
        </div>
    </div>
  );
}

export default SearchField;
