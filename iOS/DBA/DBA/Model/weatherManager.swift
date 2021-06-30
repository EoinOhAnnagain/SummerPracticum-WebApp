//
//  weatherManager.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 30/06/2021.
//

import Foundation
import CoreLocation

protocol WeatherManagherDelegate {
    func didUpdateWeather(_ weatherManager: WeatherManager, weather: WeatherModel)
    func didFailWithError(error: Error)
}

struct WeatherManager {
    
    var delegate: WeatherManagherDelegate?
    
    let incompleteURL = "https://api.openweathermap.org/data/2.5/weather?appid=81de919a7c086b64adbfd79a2a5e683f&units=metric"
    
    func getLocalWeather(lat: CLLocationDegrees, lon: CLLocationDegrees) {
        let weatherURL = "\(incompleteURL)&lat=\(lat)&lon=\(lon)"
        getWeather(weatherURL: weatherURL)
    }
    
    
    func getWeather(weatherURL: String) {
        
        //Create URL
        if let url = URL(string: weatherURL) {
            
            //Create URL Session
            let session = URLSession(configuration: .default)
            
            //Give the session a task
            let task = session.dataTask(with: url) {
                data, URLResponse, error in
                if error != nil {
                    delegate?.didFailWithError(error: error!)
                    return
                }
                
                if let safeData = data {
                    if let weather = self.parseJSON(safeData) {
                        self.delegate?.didUpdateWeather(self, weather: weather)
                    }
                }
            }
            
            //start the task
            task.resume()
        }
        
        
        
        
    }
    
    
    
    func parseJSON(_ weatherData: Data) -> WeatherModel? {
        let decoder = JSONDecoder()
        do {
            let decodedData = try decoder.decode(WeatherData.self, from: weatherData)
            let id = decodedData.weather[0].id
            let temp = decodedData.main.temp
            let name = decodedData.name
            
            let weather = WeatherModel(conditionId: id, cityName: name, temperature: temp)
            return weather
            
        } catch {
            delegate?.didFailWithError(error: error)
        }
        
        return nil
    }
}
