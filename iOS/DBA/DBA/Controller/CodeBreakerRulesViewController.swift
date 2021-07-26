//
//  CodeBreakerRulesViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 26/07/2021.
//

import UIKit

class CodeBreakerRulesViewController: UIViewController {

    
    @IBOutlet var tap: UITapGestureRecognizer!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    @IBAction func tapper(_ sender: Any) {
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
