/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// import actions from '../actions/webNavigationActions'
// import actions from '../actions/contextMenuActions'
// chrome.webNavigation.onBeforeNavigate.addListener(function ({ tabId, url, frameId }: chrome.webNavigation.WebNavigationParentedCallbackDetails) {
//   const isMainFrame: boolean = frameId === 0
//   actions.onBeforeNavigate(tabId, url, isMainFrame)
// })

// let blockAd = () => {
//   console.log('blockAd() called');
// }

// let reportPage = () => {
//   console.log('reportPage() called')
// }

// // chrome.contextMenus.create takes 2 parameters, an object defining properties of the context menu, and a callback function.

// chrome.contextMenus.create({
//   title: 'Brave',
//   id: 'brave',
//   contexts:['all']
// }, () => {
//   console.log('Brave parent menu created')
// });

// // define sub context menus

// chrome.contextMenus.create({
//   title: 'Block custom ad',
//   parentId: 'brave',
//   contexts:['all'],
//   onclick: blockAd
// }, () => {
//   console.log('block custom ad sub-context menu created')
// });

// chrome.contextMenus.create({
//   title: 'Report broken page',
//   parentId: 'brave',
//   contexts:['all'],
//   onclick: reportPage
// }, () => {
//   console.log('report broken page sub-context menu created')
// });





// chrome.contextMenus.create({
//   title: ': %s', 
//   contexts:['all'], 
//   onclick: getword,
// });

// chrome.contextMenus.create({
//     title: 'Block Ad',
//     contexts: ['all'],
//     id: 'Brave'
// })

// chrome.contextMenus.create({
//   title: 'Brave',
//   contexts: ['all'],
//   onclick: function (info, tab) {
//     console.log('CSS selector here')
//     // chrome.tabs.sendRequest(
//     //   tab.id,
//     //   { callFunction: 'displaySidebar', info: info },
//     //   function (response) {
//     //     console.log(response.toString())
//     //   }
//     // )
//   }
// }, () => {
//   console.log('Brave context menu created')
// })

