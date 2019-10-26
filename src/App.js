import React, { useReducer, useEffect } from 'react';
import { get } from './api/popular.api'
import SearchField from './components/SearchField'
import Attribution from './components/Attribution'
import MovieItem from './components/MovieItem'

function App() { 
  const initialState = {
    loading: false,
    items: [],
    error: null
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'SEARCHING':
        return {
          ...state,
          loading: true,
          error: null
        }
      case 'ERROR':
        return {
          ...state,
          loading: false,
          items: [],
          error: action.error
        }
      case 'SUCCESS':
        return {
          ...state,
          error: null,
          items: action.payload,
          loading: false
        }
      default:
        return {
          ...state
        }
    }
  }

  const [ state, dispatch ] = useReducer(reducer, initialState)
  

  function getPopular() {
    get().then(({data}) => {
      dispatch({
        type: 'SUCCESS',
        payload: data.results
      })
    }).catch((error) => {
      dispatch({
        type: 'ERROR',
        error: error.message
      })
    })
  }

  useEffect(getPopular, [])
  const { items, loading, error } = state

  return (
    <div className="antialiased w-screen h-screen flex flex-col overflow-x-hidden font-sans">

      <SearchField placeholder="Search movie..." onSearch={dispatch} onClear={getPopular} />

      <div className="container mx-auto p-4 flex flex-col h-full pt-32">
        <div className="flex flex-wrap justify-center">
        { 
          loading ?
          <div className="text-lg text-gray-500">Searching...</div> :
          !loading && error ?
          <div className="text-lg text-gray-500 flex flex-col justify-content">
            { error }
            <button className="underline font-bold text-green-500" onClick={getPopular}>Back to popular</button>
          </div> :
          !loading && !items.length ?
          <div className="text-lg text-gray-500">Find for a movie!</div> :
          items.map(item => <MovieItem key={item.id} item={item} />)
        }
        </div>

        <footer className="mt-auto">
          <Attribution/>
        </footer>
      </div>

    </div>
  );
}

export default App;
