import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { City, CurrentCondition } from '../models';
import { api } from '../globle'

@Injectable()
export class WeatherService {
 
  constructor( private http: HttpService ) { }

  getLocations( keyWord ) {
    const queryString = new HttpParams().set('apikey', api.apiKey)
    .set('q', keyWord )
    .set('language', 'en-us');
    return this.http.get<City[]> ( api.location, queryString);
  }

  getForeCast( cityKey ) {
    const queryString = new HttpParams().set('apikey', api.apiKey);
    return this.http.get( `${api.forecast}${cityKey}`, queryString);
    
  }

  getCurrentCondition( cityKey ) {
    const queryString = new HttpParams().set('apikey', api.apiKey);
    return this.http.get<CurrentCondition[]>( `${api.currentCondition}${cityKey}`, queryString);
  }


  /*  getLocations ( keyWord ) {
    return [
      {
        "Version": 1,
        "Key": "215854",
        "Type": "City",
        "Rank": 31,
        "LocalizedName": "Tel Aviv",
        "Country": {
          "ID": "IL",
          "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
          "ID": "TA",
          "LocalizedName": "Tel Aviv"
        }
      },
      {
        "Version": 1,
        "Key": "3431644",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Telanaipura",
        "Country": {
          "ID": "ID",
          "LocalizedName": "Indonesia"
        },
        "AdministrativeArea": {
          "ID": "JA",
          "LocalizedName": "Jambi"
        }
      },
      {
        "Version": 1,
        "Key": "300558",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Telok Blangah New Town",
        "Country": {
          "ID": "SG",
          "LocalizedName": "Singapore"
        },
        "AdministrativeArea": {
          "ID": "05",
          "LocalizedName": "South West"
        }
      },
      {
        "Version": 1,
        "Key": "325876",
        "Type": "City",
        "Rank": 51,
        "LocalizedName": "Telford",
        "Country": {
          "ID": "GB",
          "LocalizedName": "United Kingdom"
        },
        "AdministrativeArea": {
          "ID": "TFW",
          "LocalizedName": "Telford and Wrekin"
        }
      },
      {
        "Version": 1,
        "Key": "169072",
        "Type": "City",
        "Rank": 51,
        "LocalizedName": "Telavi",
        "Country": {
          "ID": "GE",
          "LocalizedName": "Georgia"
        },
        "AdministrativeArea": {
          "ID": "KA",
          "LocalizedName": "Kakheti"
        }
      },
      {
        "Version": 1,
        "Key": "230611",
        "Type": "City",
        "Rank": 51,
        "LocalizedName": "Telsiai",
        "Country": {
          "ID": "LT",
          "LocalizedName": "Lithuania"
        },
        "AdministrativeArea": {
          "ID": "TE",
          "LocalizedName": "Telšiai"
        }
      },
      {
        "Version": 1,
        "Key": "2723742",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Telégrafo",
        "Country": {
          "ID": "BR",
          "LocalizedName": "Brazil"
        },
        "AdministrativeArea": {
          "ID": "PA",
          "LocalizedName": "Pará"
        }
      },
      {
        "Version": 1,
        "Key": "186933",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Tela",
        "Country": {
          "ID": "HN",
          "LocalizedName": "Honduras"
        },
        "AdministrativeArea": {
          "ID": "AT",
          "LocalizedName": "Atlántida"
        }
      },
      {
        "Version": 1,
        "Key": "3453754",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Telaga Asih",
        "Country": {
          "ID": "ID",
          "LocalizedName": "Indonesia"
        },
        "AdministrativeArea": {
          "ID": "JB",
          "LocalizedName": "West Java"
        }
      },
      {
        "Version": 1,
        "Key": "3453755",
        "Type": "City",
        "Rank": 55,
        "LocalizedName": "Telagamurni",
        "Country": {
          "ID": "ID",
          "LocalizedName": "Indonesia"
        },
        "AdministrativeArea": {
          "ID": "JB",
          "LocalizedName": "West Java"
        }
      }
    ];
  }

  getForeCast( cityKey ) {
    return {
      "Headline": {
        "EffectiveDate": "2020-07-18T08:00:00+03:00",
        "EffectiveEpochDate": 1595048400,
        "Severity": 4,
        "Text": "Pleasant this weekend",
        "Category": "mild",
        "EndDate": null,
        "EndEpochDate": null,
        "MobileLink": "http://m.accuweather.com/en/gr/athens/182536/extended-weather-forecast/182536?lang=en-us",
        "Link": "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?lang=en-us"
      },
      "DailyForecasts": [
        {
          "Date": "2020-07-17T07:00:00+03:00",
          "EpochDate": 1594958400,
          "Temperature": {
            "Minimum": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 87,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 1,
            "IconPhrase": "Sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 33,
            "IconPhrase": "Clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=1&lang=en-us",
          "Link": "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=1&lang=en-us"
        },
        {
          "Date": "2020-07-18T07:00:00+03:00",
          "EpochDate": 1595044800,
          "Temperature": {
            "Minimum": {
              "Value": 70,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 88,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 1,
            "IconPhrase": "Sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 33,
            "IconPhrase": "Clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=2&lang=en-us",
          "Link": "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=2&lang=en-us"
        },
        {
          "Date": "2020-07-19T07:00:00+03:00",
          "EpochDate": 1595131200,
          "Temperature": {
            "Minimum": {
              "Value": 69,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 88,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 33,
            "IconPhrase": "Clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=3&lang=en-us",
          "Link": "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=3&lang=en-us"
        },
        {
          "Date": "2020-07-20T07:00:00+03:00",
          "EpochDate": 1595217600,
          "Temperature": {
            "Minimum": {
              "Value": 71,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 89,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 33,
            "IconPhrase": "Clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=4&lang=en-us",
          "Link": "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=4&lang=en-us"
        },
        {
          "Date": "2020-07-21T07:00:00+03:00",
          "EpochDate": 1595304000,
          "Temperature": {
            "Minimum": {
              "Value": 75,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 91,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 1,
            "IconPhrase": "Sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 33,
            "IconPhrase": "Clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=5&lang=en-us",
          "Link": "http://www.accuweather.com/en/gr/athens/182536/daily-weather-forecast/182536?day=5&lang=en-us"
        }
      ]
    };
  }  */
}
