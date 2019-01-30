import createBrowserHistory from 'history/createBrowserHistory'

export const browserHistory = createBrowserHistory()

export function isGeolocationAvailable(): boolean {
  return 'geolocation' in navigator
}

export function getCurrentPosition() {
  return new Promise<Position>((resolve, reject) => {
    if (!isGeolocationAvailable()) {
      throw new Error('Geolocation is unavailable')
    }
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    )
  })
}
