//
//  SignUpViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 08/07/2021.
//

import UIKit
import Firebase

class SignUpViewController: UIViewController {

    
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var secondPasswordTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func signUpPressed(_ sender: UIButton) {
        
        if let email = emailTextField.text, let password = passwordTextField.text, let password2 = secondPasswordTextField.text {
            if password == password2 {
                Auth.auth().createUser(withEmail: email, password: password) { AuthResult, error in
                    if let e = error{
                        print(e.localizedDescription)
                    } else {
                        print("success")
                    }
                }
            } else {
                print("Passwords don't match")
            }
            
        }
        
        
        
    }
    
    @IBAction func dismissPressed(_ sender: UIButton) {
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
