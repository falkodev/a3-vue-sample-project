export default () => {

  let titleArray

  if (document.querySelectorAll('.t-home__title')) {
    titleArray = document.querySelectorAll('.t-home__title')

    titleArray.forEach(title => {

      let tooLong = title.innerText.split(' ').some(word => {
        return word.length > 9
      })

      if (tooLong) {
        title.style.fontSize = "10px"
      }
    })
  }
}