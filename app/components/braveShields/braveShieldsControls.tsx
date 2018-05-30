/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { Grid, Column, SwitchButton, BrowserSelect, ContentToggle } from 'brave-ui'
import * as shieldActions from '../../types/actions/shieldsPanelActions'
import { BlockOptions, BlockFPOptions, BlockCookiesOptions } from '../../types/other/blockTypes'
import { getMessage } from '../../background/api/localeAPI'
import { NoScriptInfo } from '../../types/other/noScriptInfo'
import NoScript from '../noScript/noScript'

export interface Props {
  controlsOpen: boolean
  braveShields: BlockOptions
  httpUpgradableResources: BlockOptions
  ads: BlockOptions
  trackers: BlockOptions
  javascript: BlockOptions
  fingerprinting: BlockFPOptions
  cookies: BlockCookiesOptions
  blockAdsTrackers: shieldActions.BlockAdsTrackers
  controlsToggled: shieldActions.ControlsToggled
  httpsEverywhereToggled: shieldActions.HttpsEverywhereToggled
  javascriptToggled: shieldActions.JavascriptToggled
  blockFingerprinting: shieldActions.BlockFingerprinting
  blockCookies: shieldActions.BlockCookies
  noScriptInfo: NoScriptInfo
  allowScriptOriginsOnce: shieldActions.AllowScriptOriginsOnce
  changeNoScriptSettings: shieldActions.ChangeNoScriptSettings

  test: BlockOptions
  testToggled: shieldActions.TestToggled
}

export default class BraveShieldsControls extends React.Component<Props, Object> {
  constructor (props: Props) {
    super(props)
    this.onChangeAdControl = this.onChangeAdControl.bind(this)
    this.onToggleControls = this.onToggleControls.bind(this)
    this.onToggleHTTPSEverywhere = this.onToggleHTTPSEverywhere.bind(this)
    this.onToggleJavaScript = this.onToggleJavaScript.bind(this)
    this.onChangeFingerprintingProtection = this.onChangeFingerprintingProtection.bind(this)
    this.onChangeCookiesProtection = this.onChangeCookiesProtection.bind(this)
    this.onAllowScriptOriginsOnce = this.onAllowScriptOriginsOnce.bind(this)
    this.onChangeNoScriptSettings = this.onChangeNoScriptSettings.bind(this)
    this.onToggleTest = this.onToggleTest.bind(this)
  }

  onToggleTest () {
    this.props.testToggled()
  }

  onChangeAdControl (e: HTMLSelectElement) {
    this.props.blockAdsTrackers(e.target.value)
  }

  onToggleControls () {
    this.props.controlsToggled(!this.props.controlsOpen)
  }

  onToggleHTTPSEverywhere () {
    this.props.httpsEverywhereToggled()
  }

  onToggleJavaScript () {
    this.props.javascriptToggled()
  }

  onChangeFingerprintingProtection (e: HTMLSelectElement) {
    this.props.blockFingerprinting(e.target.value)
  }

  onChangeCookiesProtection (e: HTMLSelectElement) {
    this.props.blockCookies(e.target.value)
  }

  onAllowScriptOriginsOnce (origins: string[]) {
    this.props.allowScriptOriginsOnce(origins)
  }

  onChangeNoScriptSettings (origin: string) {
    this.props.changeNoScriptSettings(origin)
  }

  render () {
    const { braveShields, ads, trackers, controlsOpen, httpUpgradableResources, javascript, fingerprinting, cookies, noScriptInfo, test } = this.props
    return (
      <Grid
        id='braveShieldsControls'
        background='#eee'
        padding='10px 10px 0'
        gap='10px 5px'
      >
        <Column>
          <ContentToggle
            withSeparator={true}
            open={controlsOpen}
            summary={getMessage('shieldsControlsAdvancedControls')}
            onClick={this.onToggleControls}
          >
            <BrowserSelect
              disabled={braveShields === 'block'}
              titleName={getMessage('shieldsControlsAdControl')}
              value={braveShields !== 'block' && ads !== 'allow' && trackers !== 'allow' ? 'allow' : 'block'}
              onChange={this.onChangeAdControl}
            >
              {/* TODO needs "show brave ads" */}
              <option value='allow'>{getMessage('shieldsControlsAdControlOptionBlockAds')}</option>
              <option value='block'>{getMessage('shieldsControlsAdControlOptionAllowAdsTracking')}</option>
            </BrowserSelect>

            <BrowserSelect
              disabled={braveShields === 'block'}
              titleName={getMessage('shieldsControlsCookieControl')}
              value={braveShields !== 'block' ? cookies : 'allow'}
              onChange={this.onChangeCookiesProtection}
            >
              <option value='block_third_party'>{getMessage('shieldsControlsCookieOptionBlock3p')}</option>
              <option value='block'>{getMessage('shieldsControlsCookieOptionBlockAll')}</option>
              <option value='allow'>{getMessage('shieldsControlsCookieOptionAllowAll')}</option>
            </BrowserSelect>

            <BrowserSelect
              disabled={braveShields === 'block'}
              titleName={getMessage('shieldsControlsFingerprintingProtection')}
              value={braveShields !== 'block' ? fingerprinting : 'allow'}
              onChange={this.onChangeFingerprintingProtection}
            >
              <option value='block_third_party'>{getMessage('shieldsControlsFingerprintingOptionBlock3p')}</option>
              <option value='block'>{getMessage('shieldsControlsFingerprintingOptionBlockAll')}</option>
              <option value='allow'>{getMessage('shieldsControlsFingerprintingOptionAllowAll')}</option>
            </BrowserSelect>
            <Grid
              gap='10px 5px'
              padding='5px 0'
            >
              <Column>
                {/* TODO @cezaraugusto */}
                <SwitchButton
                  id='httpsEverywhere'
                  disabled={braveShields === 'block'}
                  rightText={getMessage('shieldsControlsHttpsEverywhereSwitch')}
                  checked={braveShields !== 'block' && httpUpgradableResources !== 'allow'}
                  onChange={this.onToggleHTTPSEverywhere}
                />
              </Column>
              <Column>
                {/* TODO @cezaraugusto */}
                <SwitchButton
                  id='blockScripts'
                  disabled={braveShields === 'block'}
                  rightText={getMessage('shieldsControlsBlockScriptsSwitch')}
                  checked={braveShields !== 'block' && javascript !== 'allow'}
                  onChange={this.onToggleJavaScript}
                />
              </Column>
              <Column>
                <SwitchButton
                  id='test'
                  disabled={braveShields === 'block'}
                  rightText={`testToggle: ${this.props.test}`}
                  checked={braveShields !== 'block' && test !== 'allow'}
                  onChange={this.onToggleTest}
                />
              </Column>
              <Column>
                {/* TODO @cezaraugusto */}
                <SwitchButton
                  id='blockPhishingMalware'
                  checked={false}
                  disabled={braveShields === 'block'}
                  rightText={getMessage('shieldsControlsBlockPhishingMalwareSwitch')}
                />
              </Column>
            </Grid>
              <NoScript
                blocked={javascript !== 'allow'}
                noScriptInfo={noScriptInfo}
                onSubmit={this.onAllowScriptOriginsOnce}
                onChangeNoScriptSettings={this.onChangeNoScriptSettings}
              />
          </ContentToggle>
        </Column>
      </Grid>
    )
  }
}
