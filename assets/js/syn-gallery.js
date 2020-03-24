/* 
updated: 2020-03-10

usage:
<syn-gallery buttons>
  <img src="..." class="active">
  <img src="...">
</syn-gallery>

api:
  buttons(boolean): show previous and next arrow buttons
*/


export function attachAll() {
  const galleries = document.querySelectorAll('syn-gallery')
  if (galleries.length) {
    createStyleElement()
    galleries.forEach(attachGallery)
  }
}


function createStyleElement() {
  const styleElement = document.createElement('style')
  styleElement.setAttribute('id', 'syn-gallery-styles')
  styleElement.innerHTML = styles()
  document.head.insertBefore(styleElement, document.head.children[0])
}


export function attachGallery(gallery) {
  const imgs = gallery.querySelectorAll('img')
  if (!imgs.length) return

  const outletWrapper = document.createElement('div')
  outletWrapper.classList.add('syn-gallery-outlet-wrapper')
  outletWrapper.addEventListener('click', evt => {
    const buttonClicked = !!evt.target.closest('.syn-gallery-button')
    if (!buttonClicked) {
      outletWrapper.classList.toggle('modal')
    } 
  })
  const outlet = document.createElement('img')
  outlet.classList.add('syn-gallery-outlet')
  gallery.parentElement.insertBefore(outletWrapper, gallery)
  outletWrapper.appendChild(outlet)
  const hasButtons = gallery.getAttribute('buttons') != null
  gallery.state = {
    outlet, outletWrapper, activeImg: null, imgs, hasButtons
  }
  showImage(gallery, imgs[0])
  gallery.addEventListener('click', evt => {
    if (evt.target.tagName !== 'IMG') return
    showImage(gallery, evt.target)
  })
  if (hasButtons) {
    showButtons(gallery)      
  }
}


function showImage(gallery, imgEl) {
  gallery.state.outlet.src = imgEl.src
  if (gallery.state.activeImg) gallery.state.activeImg.classList.remove('active')
  gallery.state.activeImg = imgEl
  imgEl.classList.add('active')
  imgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}


function findByOffset(offset, imgs) {
  const imgsArr = Array.from(imgs)
  const idxCurrent = imgsArr.findIndex(o => o.classList.contains('active')) || 0
  let idxNew = idxCurrent + offset
  if (idxNew < 0) idxNew = imgsArr.length - 1
  if (idxNew > imgsArr.length - 1) idxNew = 0
  const imgNew = imgsArr[idxNew]
  return imgNew
}


function styles() {
  return `
    /* syn-gallery injected styles */
    syn-gallery { display: block; }
    .syn-gallery-outlet-wrapper { position: relative; background: rgba(0, 0, 0, .98); }
    .syn-gallery-outlet-wrapper.modal { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1; }
    .syn-gallery-outlet { display: block; cursor: zoom-in; }
    .syn-gallery-outlet-wrapper.modal .syn-gallery-outlet { position: absolute; margin: auto; top: 0; right: 0; bottom: 0; left: 0; cursor: zoom-out; }
    syn-gallery img { filter: grayscale(100%); padding: .5rem; transition: .5s; cursor: pointer; }
    syn-gallery img.active { filter: none; }
    syn-gallery img:hover { filter: grayscale(0); transform: scale(1.1); }
    .syn-gallery-button { position: absolute; top: 0; height: 100%; border: none; outline: none; background: rgba(0,0,0,.3); color: white; }
    .syn-gallery-button:hover { cursor: pointer; }
    .syn-gallery-button svg { height: 48px; width: 48px; pointer-events: none; }
    #syn-gallery-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; 
      background: rgba(0, 0, 0, .85) no-repeat center; background-size: contain;  z-index: 10000; }
  `
}

function showButtons(gallery) {
  const btnLeft = document.createElement('button')
  btnLeft.classList.add('syn-gallery-button')
  btnLeft.innerHTML = getImage('arrow left')
  Object.assign(btnLeft.style, { left: 0 })
  btnLeft.addEventListener('click', evt => {
    const selectedImg = findByOffset(-1, gallery.state.imgs)
    showImage(gallery, selectedImg, gallery.state.imgs)
  })
  const btnRight = document.createElement('button')
  btnRight.classList.add('syn-gallery-button')
  btnRight.innerHTML = getImage('arrow right')
  Object.assign(btnRight.style, { right: 0 })
  btnRight.addEventListener('click', evt => {
    const selectedImg = findByOffset(1, gallery.state.imgs)
    showImage(gallery, selectedImg, gallery.state.imgs)
  })
  gallery.state.outletWrapper.appendChild(btnLeft)
  gallery.state.outletWrapper.appendChild(btnRight)
}

function getImage(name) {
  switch (name) {
    case 'arrow left':
      return `<?xml version="1.0" encoding="utf-8"?><svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" fill="#fff"/></svg>`
    case 'arrow right':
      return `<?xml version="1.0" encoding="utf-8"?><svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" fill="#fff"/></svg>`
    default:
      return ''
  }
}