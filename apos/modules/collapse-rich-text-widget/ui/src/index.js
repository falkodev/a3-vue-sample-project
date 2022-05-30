export default () => {
  apos.util.widgetPlayers.customRichText = {
    selector: '[data-collapse-rich-text]',
    player: (el) => {
      const MAX_LENGTH = 120
      const richText = el.querySelector('[data-rich-text-content]')
      const showMore = el.querySelector('[data-show-more]')
      const showLess = el.querySelector('[data-show-less]')
      const fullText = richText.textContent

      if (richText.textContent.length > MAX_LENGTH) {
        displayTruncatedText()
      }

      showMore.addEventListener('click', displayFullText)
      showLess.addEventListener('click', displayTruncatedText)

      function displayFullText() {
        richText.textContent = fullText
        showMore.style.display = 'none'
        showLess.style.display = 'inline-block'
      }

      function displayTruncatedText() {
        richText.textContent = richText.textContent.slice(0, MAX_LENGTH)
        showMore.style.display = 'inline-block'
        showLess.style.display = 'none'
      }
    },
  }
}
