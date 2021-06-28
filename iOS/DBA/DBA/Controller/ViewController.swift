//
//  ViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 25/06/2021.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func ProUserLoginPressed(_ sender: UIButton) {
        
        performSegue(withIdentifier: "ProUserLogin", sender: self)
        
    }
    
    @IBAction func toMap(_ sender: UIButton) {
        
        performSegue(withIdentifier: "Map", sender: self)
        
    }
    
}

