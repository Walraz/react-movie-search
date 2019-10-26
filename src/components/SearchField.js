import React, {useEffect} from 'react';
import { get } from '../api/search.api'
import debounce from 'lodash.debounce'
import fadeInTop from '../effects/fadeInTop'

function SearchField(props) {
  const onSearch = debounce(async ({target}) => {
    try {
      const { data } = await get(target.value)
      props.onSearch(data.results)
    } catch(error) {
      props.onSearch([])
    }
  },300)

  const { placeholder = ''} = props
  const attrs = { placeholder }

  useEffect(() => fadeInTop('[data-search-field]'))

  return (
    <div data-search-field className="transition-all translate-y-n1 opacity-0 flex flex-col shadow-lg fixed inset-x w-full z-10">
      <div className="container mx-auto">
      <input
        {...attrs} 
        autoFocus
        className="text-4xl font-medium px-6 py-4 w-full focus:outline-none"
        onChange={(e) => {
          e.persist()
         onSearch(e)
        }} />
        </div>
    </div>
  );
}

export default SearchField;
