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

document.addEventListener('contextmenu', (event) => {
  let selector = unique(event.target) // this has to be done here, events can't be passed through the messaging API
  let baseURI = getCurrentURL()
  chrome.runtime.sendMessage({
    actionType: 'contextMenuOpened',
    selector: selector,
    baseURI: baseURI
  })
}, true)

if (!pageIsWhitelisted) {
  let targetNode = document.documentElement
  let config = { attributes: true, childList: true, subtree: true }
  let observer = new MutationObserver(debounce(mutationHandler, 1000 / 60))
  observer.observe(targetNode, config)
}

// // mutationRecord.removedNodes
function mutationHandler (mutationRecords: any) {
  // test
  // console.log('mutation observed')
  // if any mutation record added has a node that was added, or if any attributes were modified, run the filter list on the page
  let applyFilter = false
  for (let mutationRecord of mutationRecords) {
    if (mutationRecord.addedNodes.length > 0 || mutationRecord.type === 'attributes') {
      applyFilter = true
    }
  }
  if (applyFilter === true) {
    console.log('mutation observed: checking to apply filter...')
    chrome.runtime.sendMessage({
      actionType: 'applyDOMCosmeticFilter',
      url: getCurrentURL()
    })
  }
}

function debounce (fn: Function, bufferInterval: number, ...args: any[]) {
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
