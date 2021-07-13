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
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        logOut()
        
        
        
        // Do any additional setup after loading the view.
        
        
    }
    
    @IBAction func signUpPressed(_ sender: UIButton) {
        
        
        if let email = emailTextField.text, let password = passwordTextField.text, let password2 = secondPasswordTextField.text {
            if email != "" && password != "" && password2 != "" {
                if password == password2 {
                    
                    Auth.auth().createUser(withEmail: email, password: password) { AuthResult, error in
                        if let e = error{
                            print(e.localizedDescription)
                        } else {
                            print("success")
                            self.performSegue(withIdentifier: K.signedUp, sender: self)
                        }
                    }
                } else {
                    print("Passwords don't match")
                }
            } else {
                print("Use all text fields")
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
