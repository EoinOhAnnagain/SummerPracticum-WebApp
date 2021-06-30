//
//  ViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 25/06/2021.
//

import UIKit
import CoreLocation

class ViewController: UIViewController {

    @IBOutlet weak var weatherIcon: UIImageView!
    @IBOutlet weak var tempDisplay: UILabel!
    @IBOutlet weak var degreesText: UILabel!
    @IBOutlet weak var locationText: UILabel!
    
    @IBOutlet weak var weatherLoader: UIActivityIndicatorView!
    
    var weatherManager = WeatherManager()
    let locationManager = CLLocationManager()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.requestLocation()
        
        weatherManager.delegate = self
        
    }

    
    
    
    
    @IBAction func weatherWidgetButton(_ sender: UIButton) {
        
        performSegue(withIdentifier: "toWeather", sender: self)
        
    }
    
    
    
    @IBAction func ProUserLoginPressed(_ sender: UIButton) {
        
        performSegue(withIdentifier: "ProUserLogin", sender: self)
        
    }
    
    @IBAction func toMap(_ sender: UIButton) {
        
        performSegue(withIdentifier: "Map", sender: self)
        
    }
    
    func displayWeather() {
        
        self.weatherLoader.stopAnimating()
        
        UIView.animate(withDuration: 1.5) {
            self.tempDisplay.alpha = 1
            self.weatherIcon.alpha = 1
            self.degreesText.alpha = 1
            self.locationText.alpha = 1
        }
        
        
    }
    
    
    
}



//MARK: - CLLocationManagerDelegate

extension ViewController: CLLocationManagerDelegate {
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        
        if let location = locations.last {
            locationManager.stopUpdatingLocation()
            let lat = location.coordinate.latitude
            let lon = location.coordinate.longitude
            weatherManager.getLocalWeather(lat: lat, lon: lon)
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Error")
    }
}


//MARK: - WeatherManagerDelegate

extension ViewController: WeatherManagherDelegate {
    
    func didUpdateWeather(_ weatherManager: WeatherManager, weather: WeatherModel) {
        
        DispatchQueue.main.async {
            self.tempDisplay.text = weather.temperatureString
            self.weatherIcon.image = UIImage(systemName: weather.conditionName)
            self.locationText.text = weather.cityName
            self.displayWeather()
        }
    }
    
    func didFailWithError(error: Error) {
        print("Error")
    }
}
