import { appHeading as expectedAppHeading } from '@/common/strings'
import { createShallow } from '@material-ui/core/test-utils'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import Header from '../index'
import MobileMenu from '../MobileMenu'

describe('<Header />', () => {
  let shallow
  let wrapper

  beforeEach(() => {
    shallow = createShallow({ untilSelector: Header })
    wrapper = shallow(<Header />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the app heading', () => {
    const appHeading = wrapper
      .find(Typography)
      .children()
      .text()
    expect(appHeading).toEqual(expectedAppHeading)
  })

  it('should render <MobileMenu />', () => {
    expect(wrapper.find(MobileMenu).exists()).toBeTruthy()
  })
})
