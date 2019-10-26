import React from 'react'
import Logo from '../assets/images/powered-by-rectangle-green.svg'

function Attribution() {
 return (
  <div className="flex md:flex-col items-center p-4 pt-16">
    <img src={Logo} alt="Powered by The Movie DB" className="h-12 mr-2 md:mb-2 md:mr-0" />
    <p className="text-xs font-medium text-gray-600">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
  </div>
 )}

export default Attribution