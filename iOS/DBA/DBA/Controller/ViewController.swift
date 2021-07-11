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
    var userManager = UserManager()
    
    var weatherTimer: Timer?
    
    @IBOutlet weak var titleLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        title()
        
        weatherManager.delegate = self
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.requestLocation()
        
        startWeatherTimer()
        
        isUserLoggedIn()
        
        
        
    }
    
    
    
    func title() {
        titleLabel.text = ""
        var i = 1
        let titleText = "D B A"
        for letter in titleText {
            Timer.scheduledTimer(withTimeInterval: TimeInterval(i)*0.5, repeats: false) { (timer) in
                self.titleLabel.text?.append(letter)
            }
            i += 1
        }
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
        if userEmailString == nil {
            print("You must be logged in")
        } else {
            performSegue(withIdentifier: K.chatSegue, sender: self)
        }
    }
    
    @IBAction func bookButtonPressed(_ sender: UIButton) {
        if userEmailString == nil {
            print("You must be logged in")
        } else {
            print("Book button pressed")
            //performSegue(withIdentifier: K.chatSegue, sender: self)
        }
    }
    
    @IBAction func contactAboutUs(_ sender: Any) {
        print("Fuck off")
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

extension ViewController {
    
    func isUserLoggedIn() {
        if userEmailString != nil {
            chatButton.backgroundColor = UIColor(named: "Interface")
            bookButton.backgroundColor = UIColor(named: "Interface")
        } else {
            chatButton.backgroundColor = .systemGray3
            bookButton.backgroundColor = .systemGray3
        }
    }
    
    
    @IBAction func logOutPressed(_ sender: UIButton) {
        do {
            try Auth.auth().signOut()
            userEmailString = nil
            self.view.window!.rootViewController?.dismiss(animated: true, completion: nil)
        } catch {
            print("ERROR")
        }
    }
}
