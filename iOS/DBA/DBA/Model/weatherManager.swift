//
//  weatherManager.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 30/06/2021.
//

import Foundation
import CoreLocation

struct WeatherManager {
    
    let incompleteURL = "https://api.openweathermap.org/data/2.5/weather?appid=81de919a7c086b64adbfd79a2a5e683f&units=metric"
    
    func getLocalWeather(lat: CLLocationDegrees, lon: CLLocationDegrees) {
        let weatherURL = "\(incompleteURL)&lat=\(lat)&lon=\(lon)"
        getWeather(weatherURL: weatherURL)
    }
    
    
    func getWeather(weatherURL: String) {
        //Create URL
        //Create URL Session
        //Give the session a task
        //start the task
    }
    
}
