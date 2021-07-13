//
//  SignUpViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 08/07/2021.
//

import UIKit
import Firebase
import IQKeyboardManagerSwift

class SignUpViewController: UIViewController {
    
    
    
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var secondPasswordTextField: UITextField!
    
    @IBOutlet weak var loader: UIActivityIndicatorView!
    @IBOutlet weak var loaderText: UILabel!
    
    @IBOutlet weak var infoLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        logOut()
        
        
        
        // Do any additional setup after loading the view.
        
        
    }
    
    @IBAction func signUpPressed(_ sender: UIButton) {
        
        
        if let email = emailTextField.text, let password = passwordTextField.text, let password2 = secondPasswordTextField.text {
            if email != "" && password != "" && password2 != "" {
                if password == password2 {
                    
                    self.infoLabel.text = "Signing up new user"
                    Auth.auth().createUser(withEmail: email, password: password) { AuthResult, error in
                        if let e = error{
                            print(e.localizedDescription)
                            self.infoLabel.text = e.localizedDescription
                            
                        } else {
                            self.infoLabel.text = "👍🏻"
                            self.performSegue(withIdentifier: K.signedUp, sender: self)
                        }
                    }
                } else {
                    self.infoLabel.text = "Passwords do not match"
                    self.passwordTextField.text = ""
                    self.secondPasswordTextField.text = ""
                }
            } else {
                self.infoLabel.text = "Incomplete fields"
                self.passwordTextField.text = ""
                self.secondPasswordTextField.text = ""
            }
        }
    }
    
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == K.signedUp {
            let destinationVC = segue.destination as! ViewController
                destinationVC.userEmailString = self.emailTextField.text
        }
    }
    
    
    @IBAction func dismissPressed(_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }
    
    
    
    
    func logOut() {
        do {
            try Auth.auth().signOut()
        } catch {
            print("ERROR")
        }
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
