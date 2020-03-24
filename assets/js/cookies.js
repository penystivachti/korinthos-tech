window.addEventListener('DOMContentLoaded', function() {
  showMessage()
})

function showMessage() {
  const cookiesAppect = !!localStorage.getItem('cookies_accept')
  const div = document.querySelector('#cookies')
  const btn = div.querySelector('button')
  if (!cookiesAppect) div.style.display = 'block'
  btn.addEventListener('click', evt => {
    localStorage.setItem('cookies_accept', 'true')
    div.style.display = 'none'
  })
}