import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import configureStore from 'redux-mock-store'
import { NavBar, dispatchToProps } from 'browser/components/NavBar'

chai.should()
chai.use(chaiEnzyme())

describe('<NavBar />', () => {
  const onClick = sinon.spy()
  const wrapper = shallow(<NavBar toggleSidebar={onClick} />)

  it('has `.NavBar` and <header>', () => {
    assert(wrapper.hasClass('NavBar'))
    expect(wrapper.type()).to.eq('header')
  })

  it('inherits classNames properly', () => {
    const className = 'test'
    wrapper.setProps({className})
    expect(wrapper.hasClass(className)).to.equal(true);
  })

  describe('<AppBar />', () => {
    it('exists', () => {
      expect(wrapper).to.have.descendants('AppBar')
    })

    it('has title', () => {
      const title = wrapper.find('AppBar').prop('title')
      expect(title.props.children).to.eq('MooD')
      expect(title.props.style).to.be.a('object')
      expect(title.type.displayName).to.eq('Link')
      expect(title.props.className).to.eq('NavBar__home-link')
    })

    it('has iconElementRight', () => {
      const iconElementRight = wrapper.find('AppBar').props().iconElementRight
      expect(iconElementRight.props.style).to.be.a('object')
      expect(iconElementRight.type.displayName).to.eq('Connect(LoginLogoutButton)')
    })

    it('simulates click', () => {
      const appBarProps = wrapper.find('AppBar').props()
      // invoke function directly because it's impossibe to
      // simulate child property click in shallow rendering
      appBarProps.onLeftIconButtonTouchTap()
      assert(onClick.calledOnce, 'called function')
    })

    describe('if user logged in', () => {
      const username = 'britney'
      const wrapper = shallow(<NavBar username={username} />)
      const link = wrapper.find('AppBar').props().iconElementRight
      const avatar = link.props.children
      it('has <Link>', () => {
        expect(link.props.to).to.eq('/users/' + username)
      })
      it('has <Avatar>', () => {
        expect(avatar.props.className).to.eq('NavBar__avatar')
        expect(avatar.props.src).to.eq(`https://api.adorable.io/avatars/100/${username}.png`)
      })
    })

  })

  it('has children', () => {
    const wrapper = shallow(<NavBar><section /></NavBar>)
    expect(wrapper).to.have.descendants('section')
  })

  it('dispatches actions', () => {
      const store = configureStore()()
      const functions = dispatchToProps(store.dispatch)
      const toggleSidebar = sinon.spy(functions.toggleSidebar)
      toggleSidebar()
      assert(toggleSidebar.calledOnce, 'called toggleSidebar()')
  })

});