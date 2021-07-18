//
//  ChosenBookViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 17/07/2021.
//

import UIKit

class ChosenBookViewController: UIViewController {

    @IBOutlet weak var bookCover: UIImageView!
    @IBOutlet weak var chaptersPicker: UIPickerView!
    
    @IBOutlet var tap: UITapGestureRecognizer!
    
    var bookTitle: String?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        
        chaptersPicker.delegate = self
        chaptersPicker.dataSource = self
        
        
        
        
        bookCover.image = UIImage(named: bookTitle!)
        // Do any additional setup after loading the view.
    }
    
    @IBAction func tapper(_ sender: Any) {
        print("tapped")
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

extension ChosenBookViewController: UIPickerViewDataSource {
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return K.bookParts[bookTitle!]!
    }
    
    
}

extension ChosenBookViewController: UIPickerViewDelegate {
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        print(row)
        if row == 0 {
            return "Introduction"
        } else if row == pickerView.numberOfRows(inComponent: 0)-1 {
            return "PG Post"
        } else {
            
            switch bookTitle! {
            
            case "Worlds":
                if row == 1 {
                    return "Book \(row) - The Coming of the Martians"
                } else if row == 2 {
                    return "Book \(row) - The Earth Under the Martians"
                } else {
                    return "You should not see this text - Please report"
                }
            
            case "Treasure":
                var rowText = "Part \(row) - "
                switch row {
                case 1:
                    rowText.append("The Old Buccaneer")
                case 2:
                    rowText.append("The Sea Cook")
                case 3:
                    rowText.append("My Shore Adventure")
                case 4:
                    rowText.append("The Stockade")
                case 5:
                    rowText.append("My Sea Adventure")
                case 6:
                    rowText.append("Captain Silver")
                default:
                    return "You should not see this text - Please report"
                }
                return rowText
                
            case "Frankenstein":
                if 1...4 ~= row {
                    return "Letter \(row)"
                } else {
                    return "Chapter \(row-4)"
                }
                
            case "Stranger":
                return "Full Story"
                
            case "Dorian":
                if row == 1 {
                    return "The Preface"
                } else {
                    return "Chapter \(row-1)"
                }
                
            case "Darkness":
                if row == 1 {
                    return "I"
                } else if row == 2 {
                    return "II"
                } else {
                    return "III"
                }
                
            case "Christmas":
                var rowText = "Stave \(row) - "
                switch row {
                case 1:
                    rowText.append("Marley's Ghost")
                case 2:
                    rowText.append("The First of the Three Spirits")
                case 3:
                    rowText.append("The Second of the Three Spirits")
                case 4:
                    rowText.append("The Last of the Spirits")
                case 5:
                    rowText.append("The End of It")
                default:
                    return "You should not see this text - Please report"
                }
                return rowText
            
            default:
                return "Chapter \(row)"
            }
        }
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        let choice = pickerView.selectedRow(inComponent: 0)
        print(choice)
    }
    
}
