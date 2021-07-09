//
//  ViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 25/06/2021.
//

import UIKit
import CoreLocation
import Foundation
import Firebase

class ViewController: UIViewController {

    @IBOutlet weak var weatherIcon: UIImageView!
    @IBOutlet weak var tempDisplay: UILabel!
    @IBOutlet weak var degreesText: UILabel!
    @IBOutlet weak var locationText: UILabel!
    @IBOutlet weak var weatherWidgetButton: UIButton!
    
    @IBOutlet weak var chatButton: UIButton!
    @IBOutlet weak var bookButton: UIButton!
    
    @IBOutlet weak var weatherLoader: UIActivityIndicatorView!
    
    var userEmailString: String?
    
    var weatherManager = WeatherManager()
    var weatherModel: WeatherModel?
    let locationManager = CLLocationManager()
    var managerUsers = ManagerUsers()
    
    var weatherTimer: Timer?
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.requestLocation()
        
        startWeatherTimer()
        
        isUserLoggedIn()
        
        managerUsers.delegate = self
        weatherManager.delegate = self
        
    }

    
    
    
  
    

    
    @IBAction func toMap(_ sender: UIButton) {
        
        performSegue(withIdentifier: K.mapSegue, sender: self)
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == K.weatherSegue {
            let destinationVC = segue.destination as! WeatherViewController
            destinationVC.weather = weatherModel
        }
    }
    
    
    
    @IBAction func chatButtonPressed(_ sender: UIButton) {
        performSegue(withIdentifier: K.chatSegue, sender: self)
    }
    
    @IBAction func bookButtonPressed(_ sender: UIButton) {
        
        isUserLoggedIn()
        
    }
    
    @IBAction func contactAboutUs(_ sender: Any) {
        print("button pressed")
        do {
            try Auth.auth().signOut()
        } catch {
            print("ERROR")
        }
        print(Auth.auth().currentUser?.email)
    }
    
    
    
    
}



//MARK: - Location Management

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
        print("Error in location manager")
        print(error)
        print()
    }
}


//MARK: - Weather Management

extension ViewController: WeatherManagerDelegate {
    
    func didUpdateWeather(_ weatherManager: WeatherManager, weather: WeatherModel) {
        
        DispatchQueue.main.async {
            self.tempDisplay.text = weather.stringTemperature
            self.weatherIcon.image = UIImage(systemName: weather.conditionName)
            self.locationText.text = weather.cityName
            self.displayWeather()
            self.weatherModel = weather
        }
    }
    
    func didFailWithError(error: Error) {
        print("Error in weather manager")
        print(error)
        print()
    }
    
    func displayWeather() {
        
        self.weatherLoader.stopAnimating()
        self.weatherWidgetButton.alpha = 1
        
        UIView.animate(withDuration: 1.5) {
            self.tempDisplay.alpha = 1
            self.weatherIcon.alpha = 1
            self.degreesText.alpha = 1
            self.locationText.alpha = 1
            
        }
    }
    
    func startWeatherTimer() {
        weatherTimer?.invalidate()
        weatherTimer = Timer.scheduledTimer(withTimeInterval: 60.0, repeats: true, block: { weatherTimer in
            self.locationManager.requestLocation()
        })
        
    }
    
    
    @IBAction func weatherWidgetButton(_ sender: UIButton) {
        
        performSegue(withIdentifier: K.weatherSegue, sender: self)
        
    }
    
}


//MARK: - User Management

extension ViewController: ManagerUsersDelegate {
    
    func setUserLogin(_ userEmail: String) {
        userEmailString = userEmail
        isUserLoggedIn()
    }
    
    func isUserLoggedIn() {
        print(userEmailString)
        userEmailString = Auth.auth().currentUser?.email
        print(userEmailString)
        if userEmailString != nil {
            print("User Logged In")
            chatButton.backgroundColor = UIColor(named: "Interface")
            bookButton.backgroundColor = UIColor(named: "Interface")
        } else {
            print("User Logged Out")
            chatButton.backgroundColor = .systemGray3
            bookButton.backgroundColor = .systemGray3
        }
    }
    
    
    @IBAction func ProUserLoginPressed(_ sender: UIButton) {
        
        performSegue(withIdentifier: K.loginSegue, sender: self)
        
    }
    
    
}
