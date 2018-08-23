/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as types from '../constants/cosmeticFilterTypes'
import * as actions from '../types/actions/cosmeticFilterActions'

export const siteCosmeticFilterAdded: actions.SiteCosmeticFilterAdded = (hostname: string, cssfilter: string) => {
  return {
    type: types.SITE_COSMETIC_FILTER_ADDED,
    hostname,
    cssfilter
  }
}

export const siteCosmeticFilterRemoved: actions.SiteCosmeticFilterRemoved = (hostname: string) => {
  return {
    type: types.SITE_COSMETIC_FILTER_REMOVED,
    hostname
  }
}

export const allCosmeticFiltersRemoved: actions.AllCosmeticFiltersRemoved = () => {
  return {
    type: types.ALL_COSMETIC_FILTERS_REMOVED
  }
}

export const siteCSSCosmeticFilterApplied: actions.SiteCSSCosmeticFilterApplied = (hostname: string) => {
  return {
    type: types.SITE_CSS_COSMETIC_FILTER_APPLIED,
    hostname
  }
}
export const siteDOMCosmeticFilterApplied: actions.SiteDOMCosmeticFilterApplied = (hostname: string) => {
  return {
    type: types.SITE_DOM_COSMETIC_FILTER_APPLIED,
    hostname
  }
}

export const siteLoggedStorage: actions.SiteLoggedStorage = () => {
  return {
    type: types.SITE_LOGGED_STORAGE
  }
}
