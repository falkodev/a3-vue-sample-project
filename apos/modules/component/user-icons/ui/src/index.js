export default () => {

  let element, style, favoriteIcon

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

      svg.style.fill = fill === 'white' ? style.color : 'white'

    })
  }
}
