import React from 'react'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { MoodPage } from 'browser/pages/MoodPage'
import { translate } from 'browser/containers/Translator'
chai.should()
chai.use(chaiEnzyme())

describe('<MoodPage />', () => {
  // const props = {
  //                 loading: false,
  //                 location: {pathname: 'some'},
  //               }
  // const wrapper = shallow(<MoodPage {...props} />)

  // it('has className and tagName', () => {
  //   expect(wrapper).to.have.className('MoodPage')
  //   expect(wrapper.type().name).to.eq('PageWrapper')
  // });

  // it('has <WelcomeCard>', () => {
  //   expect(wrapper.find('withCookies(WelcomeCard)')).to.have.length(1);
  // });

  // it('has <MoodsInsert>', () => {
  //   // TODO 'ReduxForm' does not seems right
  //   expect(wrapper.find('ReduxForm')).to.have.length(1);
  // });

});