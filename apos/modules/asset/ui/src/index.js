export default async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('apos.mode ====> ', apos.mode)
      if (apos.mode === 'production') {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log(
              `Service Worker registered! Scope: ${registration.scope}`,
            )
          })
          .catch((err) => {
            console.log(`Service Worker registration failed: ${err}`)
          })
      }
    })
  }

  const vueFolder = 'vue/'
  const manifest = await fetch(`/${vueFolder}manifest.json`).then((response) =>
    response.json(),
  )

  const jsFile = document.createElement('script')
  jsFile.setAttribute('src', vueFolder + manifest['src/main.js'].file)
  jsFile.setAttribute('type', 'module')
  document.body.appendChild(jsFile)

  const cssFile = document.createElement('link')
  cssFile.setAttribute('rel', 'stylesheet')
  cssFile.setAttribute('type', 'text/css')
  cssFile.setAttribute('href', vueFolder + manifest['src/main.js'].css[0])
  document.head.appendChild(cssFile)
}
