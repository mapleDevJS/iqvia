export interface Clouds {
    all: number;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface Main {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface Sys {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
}

export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface Wind {
    deg: number;
    gust: number;
    speed: number;
}

export interface Location {
    base: string;
    clouds: Clouds;
    cod: string;
    coord: Coord;
    dt: number;
    id: number;
    main: Main;
    name: string;
    sys: Sys;
    timezone: number;
    visibility: number;
    weather: Weather[];
    wind: Wind;
    message?: string;
}

export interface City {
    coord: Coord;
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
}

export interface DetailWeather {
    clouds: Clouds;
    deg: number;
    dt: number;
    feels_like: {
        day: number;
        eve: number;
        morn: number;
        night: number;
    };
    gust: number;
    humidity: number;
    pop: number;
    pressure: number;
    speed: number;
    sunrise: number;
    sunset: number;
    temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
    }
    weather: Weather[];

}

export interface Main {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface Forecast {
    city: City,
    cnt: number,
    cod: string,
    list: DetailWeather[],
    message: number;
};
