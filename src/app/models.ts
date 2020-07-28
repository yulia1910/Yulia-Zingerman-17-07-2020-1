export interface City {
    "Version": number,
    "Key": string,
    "Type": string,
    "Rank": number,
    "LocalizedName": string,
    "Country": Country,
    "AdministrativeArea": Country
}

interface Country {
    "ID": string,
    "LocalizedName": string
}

export interface DailyForecasts {
    "Headline": Headline,
    "DailyForecasts": DailyForecast[]
}

export interface Headline{
    "EffectiveDate": string,
    "EffectiveEpochDate": number,
    "Severity": number,
    "Text": string,
    "Category": string,
    "EndDate": string,
    "EndEpochDate": string,
    "MobileLink": string,
    "Link": string
}

export interface DailyForecast {
        "Date": string,
        "EpochDate": number,
        "Temperature": TemperatureMinMax,
        "Day": Details,
        "Night": Details,
        "Sources": string[],
        "MobileLink": string,
        "Link": string
}
export interface TemperatureMinMax
{
    "Minimum": Temperature,
    "Maximum": Temperature
}

export interface Temperature {
    "Value": number,
    "Unit": string,
    "UnitType": number
}
export interface Details {
    "Icon": number,
    "IconPhrase": string,
    "HasPrecipitation": boolean
}

export interface ShortForecast {
    "iconUrl": string,
    "day": string,
    "dayLong": string,
    "minTemp": string,
    "maxTemp": string,
    "unit": string,
    "description": string,
    "selected": boolean
}

export interface Favorite {
    "key": string,
    "cityName": string
}

export interface LocationS {
    "key": string;
    "name": string;
    "favorite": boolean;
}

export interface favoriteLocation {
    "key": string,
    "cityName": string,
    "temp": string,
    "description": string
}

export interface CurrentCondition {
    "LocalObservationDateTime": string,
    "EpochTime": number,
    "WeatherText": string,
    "WeatherIcon": number,
    "HasPrecipitation": boolean,
    "PrecipitationType": string,
    "IsDayTime": boolean,
    "Temperature": MetricImperial,
    "MobileLink": string,
    "Link": string
    }


    interface MetricImperial {
     "Metric": Temperature,
     "Imperial": Temperature
    }
