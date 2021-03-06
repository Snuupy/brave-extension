/* global describe, it */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import 'mocha'
import * as React from 'react'
import * as sinon from 'sinon'
import * as assert from 'assert'
import BraveShieldsFooter from '../../../../app/components/braveShields/braveShieldsFooter'
import * as tabsAPI from '../../../../app/background/api/tabsAPI'
import { shallow } from 'enzyme'

describe('BraveShieldsFooter component', () => {
  const tabId = 123123
  const baseComponent = () => <BraveShieldsFooter tabId={tabId} />

  it('renders the component', () => {
    const wrapper = shallow(baseComponent())
    const assertion = wrapper.find('#braveShieldsFooter').length === 1
    assert.equal(assertion, true)
  })

  describe('when reload is clicked', () => {
    before(function () {
      this.spy = sinon.spy(chrome.tabs, 'reload')
      tabsAPI.reloadTab(tabId, true)
    })

    after(function () {
      this.spy.restore()
    })

    it('calls chrome.tab.reload', function () {
      assert(this.spy.calledOnce)
      assert.deepEqual(this.spy.getCall(0).args[0], tabId)
    })
  })

  describe('when edit default settings is clicked', () => {
    before(function () {
      this.spy = sinon.spy(chrome.tabs, 'create')
      this.url = 'https://clifton-is-a-mercedes-benz-ambassador.com'
      tabsAPI.createTab({ url: this.url })
    })

    after(function () {
      this.spy.restore()
    })

    it('calls chrome.tab.create', function () {
      assert(this.spy.calledOnce)
      assert.deepEqual(this.spy.getCall(0).args[0], {
        url: this.url
      })
    })
  })
})
