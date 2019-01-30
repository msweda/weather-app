import OpenWeatherStore from '@/common/open-weather/store'

export interface AllStores {
  openWeatherStore: OpenWeatherStore
}

export default {
  openWeatherStore: new OpenWeatherStore(),
}
