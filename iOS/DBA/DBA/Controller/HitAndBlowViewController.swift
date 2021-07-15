//
//  HitAndBlowViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 14/07/2021.
//

import UIKit

class HitAndBlowViewController: UIViewController {

    @IBOutlet weak var UC1: UIButton!
    @IBOutlet weak var UC2: UIButton!
    @IBOutlet weak var UC3: UIButton!
    @IBOutlet weak var UC4: UIButton!
    
    
    
    
    let colors: [UIColor] = [.systemPurple, .systemGreen, .systemBlue, .systemPink, .systemGray, .systemRed]
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        
        circleise(UC1)
        circleise(UC2)
        circleise(UC3)
        circleise(UC4)
        
        
        // Do any additional setup after loading the view.
    }
    

    @IBAction func dismissPressed (_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }
    
    
    
    func circleise (_ name: UIButton) {
        name.layer.cornerRadius = 0.5 * name.bounds.size.width
        name.layer.borderWidth = 3
        name.layer.borderColor = UIColor.black.cgColor
        name.backgroundColor = colors[name.tag]
    }
    
    @IBAction func userButtonPressed(_ sender: UIButton) {
        
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
