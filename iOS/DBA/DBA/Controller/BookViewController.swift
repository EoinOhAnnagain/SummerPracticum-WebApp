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
    
    var bookNames = ["Pride and Prejudice", "A Tale of Two Cities", "Alice's Adventures in Wonderland", "Frankenstein; Or, The Modern Prometheus", "Moby Dick", "The Adventures of Sherlock Holmes", "The Picture of Dorian Gray", "The Tale of Two Cities", "The Great Gatsby", "Ulysses", "Dracula"]
    
    var dorianChapters = ["Introduction", "Preface", "Chapter I", "Chapter II", "Chapter III", "Chapter IV", "Chapter V", "Chapter VI", "Chapter VII", "Chapter VIII", "Chapter IX", "Chapter X", "Chapter XI", "Chapter XII", "Chapter XIII", "Chapter XIV", "Chapter XV", "Chapter XVI", "Chapter XVII", "Chapter XVIII", "Chapter XIX", "Chapter XX"]
    
    var aliceChapters = ["Introduction", "Chapter I", "Chapter II", "Chapter III", "Chapter IV", "Chapter V", "Chapter VI", "Chapter VII", "Chapter VIII", "Chapter IX", "Chapter X", "Chapter XI", "Chapter XII"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //bookText.text =
        
        bookPicker.dataSource = self
        bookPicker.delegate = self

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

extension BookViewController: UIPickerViewDataSource {
    
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 2
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        bookNames.sort()
        
        if component == 0 {
            return bookNames.count
        } else {
            let selected = pickerView.selectedRow(inComponent: 0)
            switch selected {
            case 1:
                return aliceChapters.count
            default:
                return dorianChapters.count
            }
        }
    }
    
}

extension BookViewController: UIPickerViewDelegate {
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        
        if component == 0 {
            return bookNames[row]
        } else {
            let selected = pickerView.selectedRow(inComponent: 0)
            switch selected {
            case 1:
                return aliceChapters[row]
            default:
                return dorianChapters[row]
            }
        }
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        pickerView.reloadComponent(1)
        
        let bookNumber = pickerView.selectedRow(inComponent: 0)
        let bookChoice = bookNames[bookNumber]
        let chapterNumber = pickerView.selectedRow(inComponent: 1)
        var chapterChoice: String?
        
        switch chapterNumber {
        case 1:
            chapterChoice = aliceChapters[chapterNumber]
        default:
            chapterChoice = dorianChapters[chapterNumber]
        }
        
        choiceLabel.text = "\(bookChoice)\n\(chapterChoice!)"
        
        if bookNumber == 1 && chapterNumber == 1 {
            
            let fileURLProject = Bundle.main.path(forResource: "Alice1", ofType: "txt")
            var readStringProject = ""
            do {
                readStringProject = try String(contentsOfFile: fileURLProject!, encoding: String.Encoding.utf8)
            } catch let error as NSError {
                print("Failed to read fom project")
                print(error)
            }
            bookText.text = readStringProject
            
            
            
        } else if bookNumber == 8 && chapterNumber == 6 {
            
            let fileURLProject = Bundle.main.path(forResource: "Dorian5", ofType: "txt")
            var readStringProject = ""
            do {
                readStringProject = try String(contentsOfFile: fileURLProject!, encoding: String.Encoding.utf8)
            } catch let error as NSError {
                print("Failed to read fom project")
                print(error)
            }
            bookText.text = readStringProject
            
        } else if bookNumber == 8 && chapterNumber == 1 {
            
            let fileURLProject = Bundle.main.path(forResource: "DorianPre", ofType: "txt")
            var readStringProject = ""
            do {
                readStringProject = try String(contentsOfFile: fileURLProject!, encoding: String.Encoding.utf8)
            } catch let error as NSError {
                print("Failed to read fom project")
                print(error)
            }
            bookText.text = readStringProject
            
        } else if bookNumber == 1 && chapterNumber == 0 {
        
        
            let fileURLProject = Bundle.main.path(forResource: "Alice0", ofType: "txt")
            var readStringProject = ""
            do {
                readStringProject = try String(contentsOfFile: fileURLProject!, encoding: String.Encoding.utf8)
            } catch let error as NSError {
                print("Failed to read fom project")
                print(error)
            }
            bookText.text = readStringProject
            
        
        
        
        
        
        
    } else {
            bookText.text = "\n\nContent to be added"
        }
        
    }
    

    
    
    
    
    
    
    
}



