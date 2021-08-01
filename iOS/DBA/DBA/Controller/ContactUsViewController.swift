//
//  ContactUsViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 29/07/2021.
//

import UIKit
import IQKeyboardManagerSwift
import MessageUI

class ContactUsViewController: UIViewController, MFMailComposeViewControllerDelegate {

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
    

    @IBAction func sendButtonPressed(_ sender: UIButton) {
        
        let toRecipients = ["eoin1711@gmail.com", "eoin.ohannagain@ucdconnect.ie"]
        
        let mc: MFMailComposeViewController = MFMailComposeViewController()
        
        mc.mailComposeDelegate = self
        mc.setToRecipients(toRecipients)
        mc.setSubject(emailTextField.text!)
        
        mc.setMessageBody("Email: \(emailTextField.text!) \n\nIssue: \(issueTextField.text!)", isHTML: false)
        
        self.present(mc, animated: true) {
            
        }
        
    }
    
    func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        switch result.rawValue {
        case MFMailComposeResult.cancelled.rawValue:
            print("Cancelled")
        case MFMailComposeResult.failed.rawValue:
            print("Failed")
        case MFMailComposeResult.saved.rawValue:
            print("Saved")
        case MFMailComposeResult.sent.rawValue:
            print("Sent")
        default:
            print("Defaul")
            break
        }
        
        self.dismiss(animated: true, completion: nil)
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
