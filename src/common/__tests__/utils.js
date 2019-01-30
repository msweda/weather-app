import { getCurrentPosition, isGeolocationAvailable } from '../utils'

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
}

describe('common utils', () => {
  describe('isGeolocationAvailable', () => {
    let isGeolocationDefined

    beforeEach(() => {
      isGeolocationDefined = global.navigator.geolocation !== undefined
    })

    it('returns true when navigator.geolocation exists', () => {
      if (!isGeolocationDefined) {
        global.navigator.geolocation = mockGeolocation
      }
      expect(isGeolocationAvailable()).toBeTruthy()
      if (!isGeolocationDefined) {
        delete global.navigator.geolocation
      }
    })

    it('return false when navigator.geolocation does not exist', () => {
      let _geolocation
      if (isGeolocationDefined) {
        _geolocation = global.navigator.geolocation
        delete global.navigator.geolocation
      }
      expect(isGeolocationAvailable()).toBeFalsy()
      if (isGeolocationDefined) {
        global.navigator.geolocation = _geolocation
      }
    })
  })

  describe('getCurrentPosition', () => {
    let _geolocation

    beforeEach(() => {
      _geolocation = global.navigator.geolocation
    })

    afterEach(() => {
      global.navigator.geolocation = _geolocation
    })

    it('rejects when geolocation is not defined', () => {
      if (global.navigator.geolocation !== undefined) {
        delete global.navigator.geolocation
      }
      expect.assertions(1)
      return expect(getCurrentPosition()).rejects.toThrowErrorMatchingSnapshot()
    })

    it('resolves with position when geolocation.getCurrentPosition succeeds', () => {
      const mockPosition = {
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      }
      mockGeolocation.getCurrentPosition.mockImplementationOnce(success =>
        success(mockPosition)
      )
      global.navigator.geolocation = mockGeolocation
      expect.assertions(1)
      return expect(getCurrentPosition()).resolves.toEqual(mockPosition)
    })

    it('rejects when geolocation.getCurrentPosition fails', () => {
      const mockError = new Error()
      mockGeolocation.getCurrentPosition.mockImplementationOnce((_, failure) =>
        failure(mockError)
      )
      global.navigator.geolocation = mockGeolocation
      expect.assertions(1)
      return expect(getCurrentPosition()).rejects.toEqual(mockError)
    })
  })
})
