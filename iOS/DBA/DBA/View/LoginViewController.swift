//
//  LoginViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 28/06/2021.
//

import UIKit
import Firebase
import IQKeyboardManagerSwift

class LoginViewController: UIViewController, UISearchTextFieldDelegate {
    
    
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var infoLabel: UILabel!
    
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.isNavigationBarHidden = true
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        navigationController?.isNavigationBarHidden = false
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        logOut()
        
        
        // Do any additional setup after loading the view.
        
    }
    
    @IBAction func guestPressed(_ sender: UIButton) {
        performSegue(withIdentifier: K.guest, sender: self)
    }
    
    
    @IBAction func loginPressed(_ sender: UIButton) {
        
        if let email = emailTextField.text, let password = passwordTextField.text {
            if email != "" && password != "" {
                
                Auth.auth().signIn(withEmail: email, password: password) { authResult, error in
                    if let e = error {
                        self.infoLabel.text = e.localizedDescription
                    } else {
                        self.infoLabel.text = "👍🏻"
                        self.performSegue(withIdentifier: K.loggedIn, sender: self)
                    }
                }
            } else {
                self.infoLabel.text = "Missing field"
            }
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == K.loggedIn {
            let destinationVC = segue.destination as! ViewController
            destinationVC.userEmailString = emailTextField.text
            navigationItem.backBarButtonItem = UIBarButtonItem(title: "Log Out", style: .plain, target: nil, action: nil)
        } else if segue.identifier == K.guest {
            let destinationVC = segue.destination as! ViewController
            navigationItem.backBarButtonItem = UIBarButtonItem(title: "Log In", style: .plain, target: nil, action: nil)
            DispatchQueue.main.async {
                destinationVC.userEmailString = nil
            }
        }
    }
    
    @IBAction func signUpPressed(_ sender: UIButton) {
        performSegue(withIdentifier: "LoginToSignUp", sender: self)
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
