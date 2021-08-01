//
//  ContactUsViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 29/07/2021.
//

import UIKit
import IQKeyboardManagerSwift

class ContactUsViewController: UIViewController {

    @IBOutlet weak var firstLabel: UILabel!
    @IBOutlet weak var secondLabel: UILabel!
    
    @IBOutlet weak var firstPicker: UIPickerView!
    @IBOutlet weak var secondPicker: UIPickerView!
    
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var issueTextField: UITextField!
    
    @IBOutlet weak var sendButton: UIButton!
    
    @IBOutlet weak var bookStopButton: UIBarButtonItem!
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        if SpeechService.shared.renderStopButton() {
            bookStopButton.image = UIImage(systemName: "play.slash")
        } else {
            bookStopButton.image = nil
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        roundButton(sendButton)
        
        emailTextField.delegate = self
        issueTextField.delegate = self
        
        // Do any additional setup after loading the view.
    }
    
    @IBAction func bookStopButtonPressed(_ sender: UIBarButtonItem) {
        SpeechService.shared.stopSpeeching()
        navigationItem.setRightBarButton(nil, animated: true)
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

//MARK: - Rounding

extension ContactUsViewController {
    
    func roundButton(_ name: UIButton) {
        name.layer.cornerRadius = 0.4 * name.bounds.size.height
    }
}


// MARK: - Manage Return Key

extension ContactUsViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        return view.endEditing(true)
    }
}
