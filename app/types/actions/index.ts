import { shieldPanelActions } from './shieldsPanelActions'
import { tabActions } from './tabActions'
import { webNavigationActions } from './webNavigationActions'
import { windowActions } from './windowActions'
// import { contextMenuActions } from './contextMenuActions'

export type Actions =
  shieldPanelActions |
  tabActions |
  webNavigationActions |
  windowActions
  // contextMenuActions
