import {
  copyright as expectedCopyright,
  email as expectedEmail,
  emailLink as expectedEmailLink,
  instagramLink as expectedInstagramLink,
  linkedInLink as expectedLinkedInLink,
  location as expectedLocation,
  phoneNumber as expectedPhoneNumber,
} from '@/common/strings'
import { createShallow } from '@material-ui/core/test-utils'
import Typography from '@material-ui/core/Typography'
import { advanceTo, clear } from 'jest-date-mock'
import * as React from 'react'
import { SocialIcon } from 'react-social-icons'
import Footer from '../Footer'

describe('<Footer />', () => {
  let shallow
  let wrapper

  beforeEach(() => {
    shallow = createShallow({ untilSelector: Footer })
    wrapper = shallow(<Footer />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should display my phone number', () => {
    const phoneNumber = wrapper
      .find(Typography)
      .at(0)
      .children()
      .text()
    expect(phoneNumber).toEqual(expectedPhoneNumber)
  })

  it('should display my email', () => {
    const email = wrapper
      .find(Typography)
      .at(1)
      .children()
      .text()
    expect(email).toEqual(expectedEmail)
  })

  it('should display my location', () => {
    const location = wrapper
      .find(Typography)
      .at(2)
      .children()
      .text()
    expect(location).toEqual(expectedLocation)
  })

  it('should display a copyright for the current year', () => {
    const mockDate2018 = new Date(2018)
    advanceTo(mockDate2018)
    wrapper = shallow(<Footer />)
    const copyright2018 = wrapper
      .find(Typography)
      .at(3)
      .children()
      .text()
    expect(copyright2018).toEqual(expectedCopyright(mockDate2018))

    const mockDate2020 = new Date(2020)
    advanceTo(mockDate2020)
    wrapper = shallow(<Footer />)
    const copyright2020 = wrapper
      .find(Typography)
      .at(3)
      .children()
      .text()
    expect(copyright2020).toEqual(expectedCopyright(mockDate2020))

    clear()
  })

  it('should display an icon with an email link', () => {
    const socialIconEmail = wrapper.find(SocialIcon).at(0)
    expect(socialIconEmail.props().url).toEqual(expectedEmailLink)
  })

  it('should display an icon with a linkedIn link', () => {
    const socialIconEmail = wrapper.find(SocialIcon).at(1)
    expect(socialIconEmail.props().url).toEqual(expectedLinkedInLink)
  })

  it('should display an icon with an instagram link', () => {
    const socialIconEmail = wrapper.find(SocialIcon).at(2)
    expect(socialIconEmail.props().url).toEqual(expectedInstagramLink)
  })
})
