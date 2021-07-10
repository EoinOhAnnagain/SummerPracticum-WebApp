//
//  SignUpViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 08/07/2021.
//

import UIKit
import Firebase

class SignUpViewController: UIViewController, UITextFieldDelegate {
    
    
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var secondPasswordTextField: UITextField!
    
    let signUp = ManagerUsers()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        emailTextField.delegate = self
        passwordTextField.delegate = self
        secondPasswordTextField.delegate = self
        
        // Do any additional setup after loading the view.
        let tap:UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        self.view.addGestureRecognizer(tap)
    }
    
    @IBAction func signUpPressed(_ sender: UIButton) {
        
        if let email = emailTextField.text, let password = passwordTextField.text, let password2 = secondPasswordTextField.text {
            if email != "" && password != "" && password2 != "" {
                if password == password2 {
                    signUp.userRegister(email, password)
                } else {
                    print("Passwords don't match")
                    dismiss(animated: true, completion: nil)
                    dismiss(animated: true, completion: nil)
                }
            } else {
                print("Use all text fields")
            }
        }
    }
    
    @IBAction func dismissPressed(_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }
    
    func hideKeyboard() {
        emailTextField.resignFirstResponder()
        passwordTextField.resignFirstResponder()
        secondPasswordTextField.resignFirstResponder()
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        print("Return pressed")
        hideKeyboard()
        return true
    }
    
    @objc func dismissKeyboard() {
        self.view.endEditing(true)
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
