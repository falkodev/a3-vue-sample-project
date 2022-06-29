export default () => {
  let element, style, favoriteIcon, gotoLink, latitude, longitude

  if (document.querySelector('.t-icon__color')) {
    element = document.querySelector('.t-icon__color')
    style = getComputedStyle(element)
  }

  if (document.querySelector('[data-icon-favorite]')) {
    favoriteIcon = document.querySelector('[data-icon-favorite]')
  }

  if (element && favoriteIcon) {
    const svg = document.querySelector('[data-icon-favorite] .t-icon__image')

    favoriteIcon.addEventListener('click', () => {
      const fill = svg.style.fill

      svg.style.fill = fill === 'black' ? style.color : 'black'
    })
  }

  if (document.querySelector('#gotoLink')) {
    gotoLink = document.querySelector('#gotoLink')
    latitude = document.querySelector('.t-icon__hidden--latitude').innerText
    longitude = document.querySelector('.t-icon__hidden--longitude').innerText

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        gotoLink.setAttribute(
          'href',
          `https://www.google.com/maps/dir/?api=1&origin=${position.coords.latitude},${position.coords.longitude}&destination=${latitude},${longitude}`,
        )
      })
    } else {
      gotoLink.setAttribute(
        'href',
        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      )
    }
  }
}
