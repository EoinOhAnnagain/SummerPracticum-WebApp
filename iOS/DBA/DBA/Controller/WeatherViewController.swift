//
//  WeatherViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 30/06/2021.
//

import UIKit


class WeatherViewController: UIViewController {

    
    @IBOutlet weak var windArrow: UIImageView!
    
    var temp: String?
    var weather: WeatherModel?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        // Arrow direction to update (360)
        windArrow.transform = CGAffineTransform(rotationAngle: 360*(.pi/180))
        
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

}
