/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as types from '../constants/cosmeticFilterTypes'

interface SiteCosmeticFilterAddedReturn {
  type: types.SITE_COSMETIC_FILTER_ADDED,
  hostname: string,
  cssfilter: string
}

export interface SiteCosmeticFilterAdded {
  (hostname: string, cssfilter: string): SiteCosmeticFilterAddedReturn
}

interface SiteCosmeticFilterRemovedReturn {
  type: types.SITE_COSMETIC_FILTER_REMOVED,
  hostname: string
}

export interface SiteCosmeticFilterRemoved {
  (hostname: string): SiteCosmeticFilterRemovedReturn
}

interface AllCosmeticFiltersRemovedReturn {
  type: types.ALL_COSMETIC_FILTERS_REMOVED
}

export interface AllCosmeticFiltersRemoved {
  (): AllCosmeticFiltersRemovedReturn
}

interface SiteCSSCosmeticFilterAppliedReturn {
  type: types.SITE_CSS_COSMETIC_FILTER_APPLIED,
  hostname: string
}

export interface SiteCSSCosmeticFilterApplied {
  (hostname: string): SiteCSSCosmeticFilterAppliedReturn
}

interface SiteDOMCosmeticFilterAppliedReturn {
  type: types.SITE_DOM_COSMETIC_FILTER_APPLIED,
  hostname: string
}

export interface SiteDOMCosmeticFilterApplied {
  (hostname: string): SiteDOMCosmeticFilterAppliedReturn
}

interface SiteLoggedStorageReturn {
  type: types.SITE_LOGGED_STORAGE
}

export interface SiteLoggedStorage {
  (): SiteLoggedStorageReturn
}

export type cosmeticFilterActions =
  SiteCosmeticFilterRemovedReturn |
  SiteCosmeticFilterAddedReturn |
  AllCosmeticFiltersRemovedReturn |
  SiteCSSCosmeticFilterAppliedReturn |
  SiteDOMCosmeticFilterAppliedReturn |
  SiteLoggedStorageReturn
