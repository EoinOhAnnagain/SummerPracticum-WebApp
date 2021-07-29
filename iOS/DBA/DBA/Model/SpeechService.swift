//
//  SpeechService.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 28/07/2021.
//

import Foundation
import AVKit

class SpeechService: NSObject {
    
    // Shared instance
    static let shared = SpeechService()
    
    let speechSynthesizer = AVSpeechSynthesizer()
    
    //MARK: - Speech Methods
    
    func startSpeech(_ text: String) {
        
        if let language = NSLinguisticTagger.dominantLanguage(for: text) {
            
            let utterence = AVSpeechUtterance(string: text)
            utterence.voice = AVSpeechSynthesisVoice(language: language)
            
            speechSynthesizer.speak(utterence)
        }
    }
    
    func stopSpeeching() {
        speechSynthesizer.stopSpeaking(at: .immediate)
    }
}
