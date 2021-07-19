//
//  BookViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 12/07/2021.
//

import UIKit

class BookViewController: UIViewController {

    @IBOutlet weak var bookText: UITextView!
    
    
    var bookTitle: String?
    var chapterNumber: Int?
    var fileName: String?
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setFileName()
        readChapter()
        
        
        
        
        
        //bookPicker.dataSource = self
        //bookPicker.delegate = self

        // Do any additional setup after loading the view.
    }
    
    
    func setFileName() {
        fileName = bookTitle!+String(chapterNumber!)
    }
    
    func readChapter() {
        let fileURLProject = Bundle.main.path(forResource: "Books/\(bookTitle!)/\(fileName!)", ofType: "txt")
        var readStringProject = ""
        do {
            readStringProject = try String(contentsOfFile: fileURLProject!, encoding: String.Encoding.utf8)
        } catch let error as NSError {
            print("Failed to read fom project")
            print(error)
        }
        //bookText.text =  String(readStringProject.filter { !"\n".contains($0) })
        bookText.text = readStringProject
        
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

