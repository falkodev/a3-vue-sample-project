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

  const vueFolder = 'vue-app/'
  const manifest = await fetch(`/${vueFolder}manifest.json`).then((response) =>
    response.json(),
  )

  for (const prop of Object.keys(manifest)) {
    for (const cssFile of manifest[prop].css) {
      const css = document.createElement('link')
      css.setAttribute('rel', 'stylesheet')
      css.setAttribute('type', 'text/css')
      css.setAttribute('href', vueFolder + cssFile)
      document.head.appendChild(css)
    }

    for (const importFile of manifest[prop].imports) {
      const link = document.createElement('link')
      link.setAttribute('rel', 'modulepreload')
      link.setAttribute('type', 'text/css')
      link.setAttribute('href', vueFolder + manifest[importFile].file)
      document.head.appendChild(link)
    }

    const jsFile = document.createElement('script')
    jsFile.setAttribute('src', vueFolder + manifest[prop].file)
    jsFile.setAttribute('type', 'module')
    jsFile.setAttribute('crossOrigin', 'anonymous')
    document.head.appendChild(jsFile)
  }
}
