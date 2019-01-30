import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { createShallow } from '@material-ui/core/test-utils'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import Filter5Icon from '@material-ui/icons/Filter5'
import MenuIcon from '@material-ui/icons/Menu'
import * as React from 'react'
import MobileMenu from '../MobileMenu'

describe('<MobileMenu />', () => {
  let shallow
  let wrapper

  beforeEach(() => {
    shallow = createShallow({ untilSelector: MobileMenu })
    wrapper = shallow(<MobileMenu />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render <MenuIcon /> inside an <IconButton />', () => {
    const iconButton = wrapper.find(IconButton)
    expect(iconButton.exists()).toBeTruthy()
    expect(
      iconButton
        .children()
        .find(MenuIcon)
        .exists()
    ).toBeTruthy()
  })

  it('should render a <List /> of mobile menu items inside a <Drawer />', () => {
    const drawer = wrapper.find(Drawer)
    expect(drawer.exists()).toBeTruthy()
    expect(
      drawer
        .children()
        .find(List)
        .exists()
    ).toBeTruthy()
  })

  it('should render a <ListItemIcon /> and a <ListItemText /> for the weather page', () => {
    const listItemIcon = wrapper.find(ListItemIcon).at(0)
    expect(listItemIcon.exists()).toBeTruthy()
    const icon = listItemIcon.children().find(AcUnitIcon)
    expect(icon.exists()).toBeTruthy()
    const text = wrapper
      .find(ListItemText)
      .at(0)
      .props().secondary
    expect(text).toEqual('Weather')
  })

  it('should render a <ListItemIcon /> and a <ListItemText /> for the forecast page', () => {
    const listItemIcon = wrapper.find(ListItemIcon).at(1)
    expect(listItemIcon.exists()).toBeTruthy()
    const icon = listItemIcon.children().find(Filter5Icon)
    expect(icon.exists()).toBeTruthy()
    const text = wrapper
      .find(ListItemText)
      .at(1)
      .props().secondary
    expect(text).toEqual('Forecast')
  })
})
