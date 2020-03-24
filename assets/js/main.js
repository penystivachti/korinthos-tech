import './syn-platform.js'
import './syn-hamburger.js'
import { attachAll } from './syn-gallery.js'


let menuLinks

document.addEventListener('DOMContentLoaded', main)

function main() {
  menuLinks = [ ...document.querySelectorAll('nav ul > li > a') ]
  updateMenuUI(location.pathname)
  attachAll()
}


function updateMenuUI(pathname) {
  menuLinks.forEach(link => {
    if (link.pathname === pathname) 
      link.classList.add('active')
    else
      link.classList.remove('active')
  })
}
