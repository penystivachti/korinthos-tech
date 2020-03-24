const PLATFORM_SIZES = { PHONE: 360, TABLET: 960 }


window.addEventListener('DOMContentLoaded', function platformHandler() {
  onResize()
  window.addEventListener('resize', onResize)
  const platformName = detectPlatform()
  if (platformName) document.body.classList.add(platformName)
})


function isPhone() { return document.body.clientWidth <= PLATFORM_SIZES.PHONE }
function isTablet() { return document.body.clientWidth > PLATFORM_SIZES.PHONE && document.body.clientWidth <= PLATFORM_SIZES.TABLET }
function isLarge() { return document.body.clientWidth > PLATFORM_SIZES.TABLET }


function onResize() {
  window.requestAnimationFrame(() => {
    const synClasses = {
      'syn-phone': isPhone(),
      'syn-tablet': isTablet(),
      'syn-small': isPhone() || isTablet(),
      'syn-large': isLarge()
    }
    for (let c in synClasses) {
      synClasses[c] ? document.body.classList.add(c) : document.body.classList.remove(c)
    }
  })
}


function detectPlatform() {
  const isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
  if (isIE) return 'syn-ie'
  const iOS = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.appVersion && (navigator.appVersion.indexOf('iPad') !== -1 || navigator.appVersion.indexOf('iPhone') !== -1)
  if (iOS) return 'syn-ios'
  return ''
}