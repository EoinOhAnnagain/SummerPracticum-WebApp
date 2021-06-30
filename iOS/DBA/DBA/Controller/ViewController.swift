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
    @IBOutlet weak var currentTemp: UILabel!
    @IBOutlet weak var degreesC: UILabel!
    
    let locationManager = CLLocationManager()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.requestLocation()
        
        
    }

    
    
    
    
    
    
    
    @IBAction func ProUserLoginPressed(_ sender: UIButton) {
        
        performSegue(withIdentifier: "ProUserLogin", sender: self)
        
    }
    
    @IBAction func toMap(_ sender: UIButton) {
        
        performSegue(withIdentifier: "Map", sender: self)
        
    }
    
}



//MARK: - CLLocationManagerDelegate

extension ViewController: CLLocationManagerDelegate {
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        print("Got location")
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("There was an error \n\(error)")
    }
}

