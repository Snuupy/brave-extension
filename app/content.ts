const unique = require('unique-selector').default

// should import action types here for typescript checking

function getCurrentURL () {
  return window.location.hostname
}

let pageIsWhitelisted = false
// chrome.runtime.sendMessage({
//   actionType: 'checkWhitelisted'
// }, () => {
//   // return res.whitelisted
//   return false
// })

// if (!pageIsWhitelisted) {
let targetNode = document.documentElement
let config = { attributes: true, childList: true, subtree: true }
let minInterval = 200 // milliseconds
let observer = new MutationObserver(mutationHandler)
observer.observe(targetNode, config)

document.addEventListener('contextmenu', (event) => {
  let selector = unique(event.target) // this has to be done here, events can't be passed through the messaging API
  let baseURI = getCurrentURL()
  chrome.runtime.sendMessage({
    actionType: 'contextMenuOpened',
    selector: selector,
    baseURI: baseURI
  })
}, true)
// mutationRecord.removedNodes
function mutationHandler (mutationRecords: any) {
  console.log(`number of mutations observed: ${mutationRecords.length}`)
  debounce(handler(), minInterval)
  function handler () {
    for (let mutationRecord of mutationRecords) {
      if (mutationRecord.addedNodes.length > 0 || mutationRecord.type === 'attributes') {
        chrome.runtime.sendMessage({
          actionType: 'applyFilter',
          url: getCurrentURL()
        })
      }
      console.log(mutationRecord)
    }

  }
}

function debounce (fn: any, bufferInterval: number, ...args: any[]) {
  let timeout: number
  return (...args2: any[]) => {
    clearTimeout(timeout)
    let a = args
    if (args2.constructor === Array) {
      a = a.concat(args2)
    }
    timeout = setTimeout(fn.apply.bind(fn, this, a), bufferInterval)
  }
}
