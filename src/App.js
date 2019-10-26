import React, { useState } from 'react';
import SearchField from './components/SearchField'
import Attribution from './components/Attribution'
import MovieItem from './components/MovieItem'

function App() { 
  const [ items, setItems ] = useState([])


  return (
    <div className="antialiased w-screen h-screen flex flex-col overflow-x-hidden">

      <SearchField placeholder="Search movie..." onSearch={setItems} />

      <div className="container mx-auto p-4 flex flex-col h-full pt-32">
        <div className="flex flex-wrap justify-center">
        { items.map(item => <MovieItem key={item.id} item={item} />) }
        </div>

        <footer className="mt-auto">
          <Attribution/>
        </footer>
      </div>

    </div>
  );
}

export default App;
