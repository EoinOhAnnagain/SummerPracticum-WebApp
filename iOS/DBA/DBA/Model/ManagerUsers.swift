//
//  UserSignIn.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 09/07/2021.
//

import Firebase
import Foundation

protocol ManagerUsersDelegate {
    func setUserLogin(_ userEmail: String)
}

struct ManagerUsers {
    
    var delegate: ManagerUsersDelegate?
    
    
    
    
    
    func userLogin(_ email: String,_ password: String) {
        
        Auth.auth().signIn(withEmail: email, password: password) { authResult, error in
            if let e = error {
                print(e.localizedDescription)
            } else {
                print("Successful Login")
                self.delegate?.setUserLogin((Auth.auth().currentUser?.email)!)
            }
        }
        
    }
    
    
}
