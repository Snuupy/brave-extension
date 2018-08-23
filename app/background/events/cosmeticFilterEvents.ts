import cosmeticFilterActions from '../actions/cosmeticFilterActions'

let rule = {
  host: '',
  selector: ''
}
let debug = true

// parent menu
chrome.contextMenus.create({
  title: 'Brave',
  id: 'brave',
  contexts: ['all']
})
// block ad child menu
chrome.contextMenus.create({
  title: 'Block element via selector',
  id: 'addBlockElement',
  parentId: 'brave',
  contexts: ['all']
})
chrome.contextMenus.create({
  title: 'Clear CSS rules for this site',
  id: 'resetSiteFilterSettings',
  parentId: 'brave',
  contexts: ['all']
})
chrome.contextMenus.create({
  title: 'Clear CSS rules for all sites',
  id: 'resetAllFilterSettings',
  parentId: 'brave',
  contexts: ['all']
})
if (debug === true) {
  chrome.contextMenus.create({
    title: 'Log storage',
    id: 'logStorage',
    parentId: 'brave',
    contexts: ['all']
  })
}

// contextMenu listener - when triggered, grab latest selector
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  switch (info.menuItemId) {
    case 'addBlockElement':
      {
        rule.selector = window.prompt('CSS selector to block: ', `${rule.selector}`) || ''
        if (rule.selector.length === 0) {
          return
        }
        chrome.tabs.insertCSS({
          code: `${rule.selector} {display: none;}`
        })
        cosmeticFilterActions.siteCosmeticFilterAdded(rule.host, rule.selector)
        break
      }
    case 'resetSiteFilterSettings':
      {
        cosmeticFilterActions.siteCosmeticFilterRemoved(rule.host)
        break
      }
    case 'resetAllFilterSettings':
      {
        cosmeticFilterActions.allCosmeticFiltersRemoved()
        break
      }
    case 'logStorage':
      {
        cosmeticFilterActions.siteLoggedStorage()
        break
      }
    default: {
      console.warn('[cosmeticFilterEvents] invalid context menu option: ${info.menuItemId}')
    }
  }
})

// listens to content script events
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.actionType) {
    case 'contextMenuOpened': // updates rule
      {
        rule.host = msg.baseURI
        rule.selector = msg.selector
        sendResponse(rule)
        break
      }
    case 'applyDOMCosmeticFilter':
      {
        // console.log(`mutation - actionType: ${msg.actionType}`)
        cosmeticFilterActions.siteDOMCosmeticFilterApplied(msg.url)
        break
      }
    // case 'checkWhitelisted':
    //   {
    //     return
    //   }
    default: {
      console.warn(`[cosmeticFilterEvents] invalid content script event: ${msg.actionType}`)
    }
  }

})
