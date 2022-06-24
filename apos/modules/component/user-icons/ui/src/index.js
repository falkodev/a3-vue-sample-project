export default () => {

  let favoriteIcon 

  if (document.querySelector('[data-icon-favorite]')) {
    favoriteIcon = document.querySelector('[data-icon-favorite]')
  }

  if (favoriteIcon) {

    const svg = document.querySelector('[data-icon-favorite] .t-icon__image')

    favoriteIcon.addEventListener('click', () => {

      const fill = svg.style.fill

      svg.style.fill = fill === 'white' ? 'orange' : 'white'

    })
  }
}
