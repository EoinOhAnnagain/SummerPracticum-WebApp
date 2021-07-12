//
//  Constants.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 06/07/2021.
//

struct K {
    
    
    // Login In and Sign Up segue identifers
    
    static let signedUp = "SignToMain"
    static let loggedIn = "LoginToMain"
    static let guest = "GuestToMain"
    
    
    // Main page segue identifers
    
    static let weatherSegue = "toWeather"
    static let mapSegue = "Map"
    
    static let toChat = "MainToChat"
    static let toBook = "MainToBook"
    static let toUs = "MainToUs"
    
    
    struct chat {
        static let chatCellID = "chatCell"
        static let chatNib = "ChatCell"
        
        struct FStore {
            static let collectionName = "messages"
            static let senderField = "sender"
            static let textField = "body"
            static let dateField = "date"
        }
        
    }
    
    
}
