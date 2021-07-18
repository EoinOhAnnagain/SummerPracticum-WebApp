//
//  BookViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 12/07/2021.
//

import UIKit

class BookViewController: UIViewController {

    @IBOutlet weak var bookPicker: UIPickerView!
    @IBOutlet weak var bookText: UITextView!
    @IBOutlet weak var choiceLabel: UILabel!
    
    var bookName: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //bookText.text =
        
        //bookPicker.dataSource = self
        //bookPicker.delegate = self

        // Do any additional setup after loading the view.
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

