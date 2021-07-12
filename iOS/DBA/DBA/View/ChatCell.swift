//
//  ChatCell.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 12/07/2021.
//

import UIKit

class ChatCell: UITableViewCell {

    @IBOutlet weak var chatBubble: UIView!
    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var rightSpeechBubble: UIImageView!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        chatBubble.layer.cornerRadius = chatBubble.frame.size.height / 5
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
