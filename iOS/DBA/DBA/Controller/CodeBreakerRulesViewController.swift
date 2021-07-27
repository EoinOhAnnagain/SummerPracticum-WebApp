//
//  CodeBreakerRulesViewController.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 26/07/2021.
//

import UIKit

class CodeBreakerRulesViewController: UIViewController {

    @IBOutlet weak var titleImage: UIImageView!
    
    
    
    @IBOutlet var tap: UITapGestureRecognizer!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        
        animateTitle()
        

      
    }
    

    @IBAction func tapper(_ sender: Any) {
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

    
    



//MARK: - Title Animation
    
    func animateTitle() {
        titleImage.image = UIImage(named: "CodeBreaker-23")
        titleImage.animationImages = animateImage(for: "CodeBreaker-")
        titleImage.animationDuration = 19
        titleImage.startAnimating()
    }
    
    func animateImage(for name: String) -> [UIImage] {
        
        var i = 1
        var images = [UIImage]()
        
        while let image = UIImage(named: "\(name)\(i)") {
            images.append(image)
            i += 1
            if i == 30 {
                for _ in 0...115 {
                    images.append(UIImage(named: "CodeBreaker-30")!)
                }
            }
        }
        
        for _ in 0...120 {
            images.append(UIImage(named: "CodeBreaker-1")!)
        }
        
        return images
    }
}
