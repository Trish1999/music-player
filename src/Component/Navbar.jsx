import React from 'react'
import "./style.css"

function Navbar() {
  return (
    <div>
          <nav>
              <div className="nav-wrapper deep-orange darken-2">
          <div className="logo">
            <i class="bi bi-file-earmark-music-fill"></i>
                       {""} Music Player
                  </div>
              </div>
          </nav>
    </div>
  )
}

export default Navbar

