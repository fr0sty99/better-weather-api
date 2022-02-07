const { gql } = require("apollo-server");

const typeDefs = gql`
  type Coordinates {
    lon: Float
    lat: Float
  }

  type Weather {
    id: ID
    main: String
    description: String
    icon: String
  }

  type ForecastFeelsLike {
    morn: Float
    day: Float
    eve: Float
    night: Float
  }

  type ForecastTemp {
    morn: Float
    day: Float
    eve: Float
    night: Float
    min: Float
    max: Float
  }

  type Current {
    dt: Int
    sunrise: Int
    sunset: Int
    temp: Float
    feelsLike: Float
    pressure: Int
    humidity: Int
    dewPoint: Float
    uvi: Float
    clouds: Int
    visibility: Int
    windSpeed: Float
    windDeg: Int
    rain: Float
    snow: Float
    weather: Weather
  }

  type Minutely {
    dt: Int
    precipitation: Float
  }

  type Hourly {
    dt: Int
    temp: Float
    feelsLike: Float
    pressure: Int
    humidity: Int
    dewPoint: Float
    uvi: Float
    clouds: Int
    visibility: Int
    windSpeed: Float
    windGust: Float
    windDeg: Int
    pop: Float
    rain: Float
    snow: Float
    weather: Weather
  }

  type Daily {
    dt: Int
    sunrise: Int
    sunset: Int
    moonrise: Int
    moonset: Int
    temp: ForecastTemp
    feelsLike: ForecastFeelsLike
    pressure: Int
    humidity: Int
    dewPoint: Float
    uvi: Float
    clouds: Int
    visibility: Int
    windSpeed: Float
    windGust: Float
    windDeg: Int
    pop: Float
    rain: Float
    snow: Float
    weather: Weather
  }

  type Alerts {
    senderName: String
    event: String
    start: Int
    end: Int
    description: String
    tags: String
  }

  type OneCallWeather {
    id: ID
    lat: Float
    lon: Float
    timezone: String
    timezoneOffset: Int
    current: Current
    minutely: [Minutely]
    hourly: [Hourly]
    daily: [Daily]
    alerts: [Alerts]
  }

  input ExcludeConfig {
    current: Boolean
    minutely: Boolean
    hourly: Boolean
    daily: Boolean
    alerts: Boolean
  }

  input InputConfig {
    exclude: ExcludeConfig
    units: Unit
    lang: Language
  }

  type Query {
    getWeatherByCoord(lat: Float!, lon: Float!, config: InputConfig): OneCallWeather
  }

  enum Unit {tar
    metric
    imperial
    kelvin
  }

  enum Language {
    af
    al
    ar
    az
    bg
    ca
    cz
    da
    de
    el
    en
    eu
    fa
    fi
    fr
    gl
    he
    hi
    hr
    hu
    id
    it
    ja
    kr
    la
    lt
    mk
    no
    nl
    pl
    pt
    pt_br
    ro
    ru
    sv
    se
    sk
    sl
    sp
    es
    sr
    th
    tr
    ua
    uk
    vi
    zh_cn
    zh_tw
    zu
  }
`;

module.exports = {
  typeDefs,
};