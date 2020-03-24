window.addEventListener('DOMContentLoaded', function() {
  hamburger()
})


// HAMBURGER MENU
function hamburger() {
  const nav = document.querySelector('.syn-hamburger')
  if (!nav) return
  let selected
  if (!document.querySelector('.syn-hamburger > ul')) { console.error('syn-hamburger must have a UL child'); return }
  const navToggle = document.createElement('button')
  navToggle.textContent = '☰'
  navToggle.addEventListener('click', function() { nav.classList.toggle('syn-hamburger-open') })
  nav.insertBefore(navToggle, nav.children.item(0))
  document.querySelectorAll('li > a').forEach(function(a) { a.addEventListener('click', function() { nav.classList.remove('syn-hamburger-open'); markActive() }) })
  const styleEl = document.createElement('style')
  styleEl.textContent = styles()
  document.head.appendChild(styleEl)
  markActive()
  function markActive() {
    setTimeout(() => {
      const pathname = location.hash || location.pathname
      if (selected) selected.parentNode.classList.remove('active')
      selected = nav.querySelector('a[href*="' + pathname + '"]')
      if (selected) selected.parentNode.classList.add('active')
    })
  }
}

function styles() {
  return `
  .syn-hamburger1 ul { padding: 0; }
  .syn-small .syn-hamburger > ul { list-style: none; margin: 0; position: fixed; width: 100%; text-align: left; left: 0; height: 100%; background: rgba(255, 255, 255, .85); }
  .syn-hamburger ul > li li { display: block; white-space: nowrap; }
  .syn-large .syn-hamburger > button { display: none; }
  .syn-small .syn-hamburger > button { background: transparent; border: solid 1px #888; font-size: 1.3rem; }
  .syn-large .syn-hamburger > ul > li { display: inline-block; position: relative; }
  .syn-small .syn-hamburger > ul > li { display: block; margin: 1rem 0; }
  .syn-small .syn-hamburger:not(.syn-hamburger-open) > ul { display: none; }
  .syn-large .syn-hamburger > ul > li > ul { position: absolute; display: none; }
  .syn-large .syn-hamburger > ul > li:hover > ul { display: block; }
  `
}