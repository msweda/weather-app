import { createShallow } from '@material-ui/core/test-utils'
import * as React from 'react'
import BasicPage from '../BasicPage'

describe('<BasicPage />', () => {
  let shallow
  let wrapper

  beforeEach(() => {
    shallow = createShallow({ untilSelector: BasicPage })
    wrapper = shallow(<BasicPage />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render wrapped content', () => {
    const mockContent = <p>Test Page</p>
    wrapper = shallow(<BasicPage>{mockContent}</BasicPage>)
    expect(wrapper.contains(mockContent)).toBeTruthy()
  })
})
