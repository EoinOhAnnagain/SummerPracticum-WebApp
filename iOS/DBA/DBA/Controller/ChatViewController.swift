//
//  ChatViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 09/07/2021.
//

import UIKit
import Firebase

class ChatViewController: UIViewController {
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var messageTextField: UITextField!
    
    let db = Firestore.firestore()
    
    var messages: [Message] = []
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        loadMessages()
        
        tableView.dataSource = self
        tableView.delegate = self
        
        tableView.register(UINib(nibName: K.chat.chatNib, bundle: nil), forCellReuseIdentifier: K.chat.chatCellID)
        // Do any additional setup after loading the view.
    }
    
    
    func loadMessages() {
        db.collection(K.chat.FStore.collectionName)
            .order(by: K.chat.FStore.dateField)
            .addSnapshotListener { (querySnapshot, error) in
            self.messages = []
            if let e = error {
                print(e.localizedDescription)
            } else {
                if let snapshotDocuments = querySnapshot?.documents {
                    for doc in snapshotDocuments {
                        let data = doc.data()
                        print("here")
                        if let messageSender = data[K.chat.FStore.senderField] as? String, let messageText = data[K.chat.FStore.textField] as? String, let messageDate = data[K.chat.FStore.dateField] {
                            print("here 2")
                            let newMessage = Message(sender: messageSender, body: messageText, date: messageDate as! NSNumber)
                            self.messages.append(newMessage)
                            
                            
                            DispatchQueue.main.async {
                                self.tableView.reloadData()
                            }
                            
                        } else {
                            print("oh no")
                        }
                    }
                }
            }
        }
    }
    
    @IBAction func sendPressed(_ sender: UIButton) {
        
        if let messageText = messageTextField.text, let messageSender = Auth.auth().currentUser?.email {
            if messageText != "" {
                db.collection(K.chat.FStore.collectionName).addDocument(data: [
                    K.chat.FStore.senderField: messageSender,
                    K.chat.FStore.textField: messageText,
                    K.chat.FStore.dateField: Date().timeIntervalSince1970
                ]) { (error) in
                    if let e = error {
                        print(e.localizedDescription)
                    } else {
                        print("saved data")
                        self.messageTextField.text = ""
                    }
                }
            } else {
                print("Message is empty")
            }
        } else {
            print("Fill fields")
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

extension ChatViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return messages.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: K.chat.chatCellID, for: indexPath) as! ChatCell
        cell.label.text = messages[indexPath.row].body
        return cell
    }
}

extension ChatViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("\(indexPath.row) is from \(messages[indexPath.row].sender)")

        let messageDate = messages[indexPath.row].date
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "dd:MM:yyyy HH:mm"
        let readyDate = dateFormatter.string(from: Date(timeIntervalSince1970: TimeInterval(messageDate)))
        

        print("Message sent \(readyDate)")
        
    }
}
