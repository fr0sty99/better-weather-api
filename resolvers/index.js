const axios = require("axios");
const { UserInputError } = require("apollo-server");
const ONECALL_API = `https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.KEY}`;
const ONECALL_API_TIMEMACHINE = `https://api.openweathermap.org/data/2.5/onecall/timemachine?appid=${process.env.KEY}`;

const resolvers = {

    Query: {
        getWeatherByCoord: async (obj, args, context, info) => {
            // lat, lon is required | exclude, units and lang are optional
            const { lat, lon, config } = args;
            let url = `${ONECALL_API}`;
            console.log("test");

            // Add other fields if possible
            if (config) {
                if (lat) url = url + `&lat=${lat}`;
                if (lon) url = url + `&lon=${lon}`;
                if (config.units) url = url + `&units=${config.units}`;
                if (config.lang) url = url + `&lang=${config.lang}`;
                url = url + '"'

                console.log(url);
            }


            try {
                const { data } = await axios.get(url);
                var current = {};
                if (data.current) {

                    current = {
                        dt: data.current.dt,
                        sunrise: data.current.sunrise,
                        sunset: data.current.sunset,
                        temp: data.current.temp,
                        feelsLike: data.current.feels_like,
                        pressure: data.current.pressure,
                        humidity: data.current.humidity,
                        dewPoint: data.current.dew_point,
                        uvi: data.current.uvi,
                        clouds: data.current.clouds,
                        visibility: data.current.visibility,
                        windSpeed: data.current.wind_speed,
                        windDeg: data.current.wind_deg,
                        rain: data.current.rain,
                        snow: data.current.snow,
                        weather: {
                            id: data.current.weather[0].id,
                            main: data.current.weather[0].main,
                            description: data.current.weather[0].description,
                            icon: data.current.weather[0].icon,
                        }
                    }
                }

                var minutely = [{}];
                if (data.minutely) {
                    minutely = data.minutely.map((minute) => {
                        return {
                            dt: minute.dt,
                            precipitation: minute.precipitation,
                        }
                    });
                }

                var hourly = [{}];
                if (data.hourly) {
                    hourly = data.hourly.map((hour) => {
                        return {
                            dt: hour.dt,
                            temp: hour.temp,
                            feelsLike: hour.feels_like,
                            pressure: hour.pressure,
                            humidity: hour.humidity,
                            dewPoint: hour.dew_point,
                            uvi: hour.uvi,
                            clouds: hour.clouds,
                            visibility: hour.visibility,
                            windSpeed: hour.wind_speed,
                            windDeg: hour.wind_deg,
                            windGust: hour.wind_gust,
                            pop: hour.pop,
                            rain: hour.rain,
                            snow: hour.snow,
                            weather: {
                                id: hour.weather[0].id,
                                main: hour.weather[0].main,
                                description: hour.weather[0].description,
                                icon: hour.weather[0].icon
                            }
                        }
                    });
                }

                var daily = [{}];
                if (data.daily) {
                    daily = data.daily.map((day) => {

                        return {
                            dt: day.dt,
                            sunrise: day.sunrise,
                            sunset: day.sunset,
                            moonrise: day.sunset,
                            moonset: day.sunset,
                            moonPhase: day.moon_phase,
                            temp: {
                                day: day.temp.day,
                                min: day.temp.min,
                                max: day.temp.max,
                                night: day.temp.night,
                                eve: day.temp.eve,
                                morn: day.temp.morn,
                            },
                            feelsLike: {
                                day: day.feels_like.day,
                                night: day.feels_like.night,
                                eve: day.feels_like.eve,
                                morn: day.feels_like.morn,
                            },
                            pressure: day.pressure,
                            humidity: day.humidity,
                            dewPoint: day.dew_point,
                            windSpeed: day.wind_speed,
                            windDeg: day.wind_deg,
                            windGust: day.wind_gust,
                            rain: day.rain,
                            snow: day.snow,
                            weather: {
                                id: day.weather[0].id,
                                main: day.weather[0].main,
                                description: day.weather[0].description,
                                icon: day.weather[0].icon
                            },
                            clouds: day.clouds,
                            pop: day.pop,
                            uvi: day.uvi,
                        }
                    });
                }

                return {
                    id: 1,
                    lat: data.lat,
                    lon: data.lon,
                    timezone: data.timezone,
                    timezoneOffset: data.timezone_offset,
                    current: current,
                    minutely: minutely,
                    hourly: hourly,
                    daily: daily,
                };
            } catch (e) {
                console.log(e);
                return null;
            }
        },

        getTodaysMinMaxTempByCoord: async (obj, args, context, info) => {
            const { lat, lon, units, timezoneOffset } = args;
            let url = `${ONECALL_API_TIMEMACHINE}`;
            if (!lat || !lon) {
                return { error: "Oops. Something went wrong.. Define lat & lon in query" }
            }

            // set query timestamp to start of today
            var time = new Date();
            time.setHours(0, 0, 0, 0);

            // Add other fields if possible
            if (lat) url = url + `&lat=${lat}`;
            if (lon) url = url + `&lon=${lon}`;
            if (units) url = url + `&units=${units}`;

            const hourInMillis = 60 * 60 * 1000;
            url = url + `&dt=${(time.getTime() + hourInMillis) / 1000}`;

            try {
                const { data } = await axios.get(url);

                var lowest = Number.POSITIVE_INFINITY;
                var highest = Number.NEGATIVE_INFINITY;
                var tmp;
                for (var i = data.hourly.length - 1; i >= 0; i--) {
                    tmp = data.hourly[i].temp;
                    if (tmp < lowest) lowest = tmp;
                    if (tmp > highest) highest = tmp;
                }

                return {
                    min: lowest,
                    max: highest
                };
            } catch (e) {

            }
        }
    }
};

module.exports = {
    resolvers,
};
