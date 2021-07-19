//
//  BookViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 12/07/2021.
//

import UIKit

class BookViewController: UIViewController {

    @IBOutlet weak var bookText: UITextView!
    @IBOutlet weak var choiceLabel: UILabel!
    
    var bookTitle: String?
    var chapterNumber: Int?
    var fileName: String?
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setFileName()
        
        bookText.text = fileName
        
        //bookPicker.dataSource = self
        //bookPicker.delegate = self

        // Do any additional setup after loading the view.
    }
    
    
    func setFileName() {
        fileName = bookTitle!+String(chapterNumber!)
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

