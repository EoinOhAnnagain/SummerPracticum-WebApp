//
//  WeatherModel.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 30/06/2021.
//

import Foundation

struct WeatherModel {
    
    let conditionId: Int
    let cityName: String
    let temperature: Double
    
    var temperatureString: String {
        return String(format: "%.1f", temperature)
    }
    
    var conditionName: String {
        switch conditionId {
        case 200...232:
            return "cloud.bolt.rain.fill"
        case 300...321:
            return "cloud.rain.fill"
        case 500...531:
            return "cloud.heavyrain.fill"
        case 600...622:
            return "snowflake"
        case 701...781:
            return "cloud.fog.fill"
        case 800:
            return "sun.max.fill"
        case 801...804:
            return "cloud.fill"
        default:
            return "cloud.fill"
        }

    }
    
    func printAll() {
        print(conditionId)
        print(cityName)
        print(temperature)
    }
    
}

