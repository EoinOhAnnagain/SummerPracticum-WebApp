//
//  WeatherViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 30/06/2021.
//

import UIKit


class WeatherViewController: UIViewController {
    
    
    
    @IBOutlet weak var weatherIcon: UIImageView!
    @IBOutlet weak var weatherIconLoader: UIActivityIndicatorView!
    
    
    
    
    
    var temp: String?
    var weather: WeatherModel?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        // Arrow direction to update (360)
        
        if weather != nil {
            //weatherIcon.image = UIImage(systemName: weather!.conditionName)
            //locationLabel.text = weather!.cityName
            //dateLabel.text = currentDate()
            //timeLabel.text = currentTime()
            //descriptionLabel.text = weather!.description.capitalized
            
            //tempLabel.text = "\(weather!.stringTemperature)ºC"
            //realFeelLabel.text = "\(weather!.stringFeelsLike)ºC"
            //minLabel.text = "\(weather!.stringMin)ºC"
            //maxLabel.text = "\(weather!.stringMax)ºC"
            //humidityLabel.text = "\(weather!.humidity)%"
            
            //visibilityLabel.text = "\(weather!.visibility) m"
            //pressureLabel.text = "\(weather!.pressure) hPa"
            
            //speedLabel.text = "\(weather!.stringWindSpeed) kph"
            //windArrow.transform = CGAffineTransform(rotationAngle: CGFloat((weather!.windDeg))*(.pi/180))
            
            //sunriseLabel.text = "\(weather!.sunriseTime)"
            //sunsetLabel.text = "\(weather!.sunsetTime)"
            
            //makeVisable()
        }
        
        
        
        
        
    }
    
    @IBAction func dismissPressed(_ sender: UIButton) {
        
        print(temp!)
        dismiss(animated: true, completion: nil)
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

    func currentTime() -> String {
        let currentDateTime = Date()
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "HH:mm"
        return dateFormatter.string(from: currentDateTime)
    }
    
    func currentDate() -> String {
        let currentDateTime = Date()
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "dd-MM-yy"
        return dateFormatter.string(from: currentDateTime)
    }
    
    //func makeVisable() {
       // DispatchQueue.main.asyncAfter(deadline: .now() + Double.random(in: 1...5) ) {
       //     self.weatherIconLoader.stopAnimating()
      //      UIView.animate(withDuration: 1.5) {
     //           self.weatherIcon.alpha = 1
     //       }
     //   }
        
//        DispatchQueue.main.asyncAfter(deadline: .now() + Double.random(in: 1...5) ) {
//            self.localLoader.stopAnimating()
//            UIView.animate(withDuration: 1.5) {
//                self.locationLabel.alpha = 1
//                self.dateLabel.alpha = 1
//                self.timeLabel.alpha = 1
//                self.descriptionLabel.alpha = 1
//            }
//        }
//
//        DispatchQueue.main.asyncAfter(deadline: .now() + Double.random(in: 1...5) ) {
//            self.windLoader.stopAnimating()
//            UIView.animate(withDuration: 1.5) {
//                self.windTitle.alpha = 1
//                self.windArrow.alpha = 1
//                self.speedLabel.alpha = 1
//                self.directionLabel.alpha = 1
//            }
//        }
//
//        DispatchQueue.main.asyncAfter(deadline: .now() + Double.random(in: 1...5) ) {
//            self.tempLoader.stopAnimating()
//            UIView.animate(withDuration: 1.5) {
//                self.tempTitle.alpha = 1
//                self.tempLabel.alpha = 1
//                self.realFeelLabel.alpha = 1
//                self.minLabel.alpha = 1
//                self.maxLabel.alpha = 1
//                //self.humidityLabel.alpha = 1
//            }
//        }
//
//        DispatchQueue.main.asyncAfter(deadline: .now() + Double.random(in: 1...5) ) {
//            self.miscLoader.stopAnimating()
//            UIView.animate(withDuration: 1.5) {
//                self.visibilityTitle.alpha = 1
//                self.visibilityLabel.alpha = 1
//                self.pressureTitle.alpha = 1
//                self.pressureLabel.alpha = 1
//            }
//        }
//
//        DispatchQueue.main.asyncAfter(deadline: .now() + Double.random(in: 1...5) ) {
//            self.sunLoader.stopAnimating()
//            UIView.animate(withDuration: 1.5) {
//                self.sunriseIcon.alpha = 1
//                self.sunriseLabel.alpha = 1
//                self.sunsetIcon.alpha = 1
//                self.sunsetLabel.alpha = 1
//            }
//        }
        
        
        
        
        
    //}
}
