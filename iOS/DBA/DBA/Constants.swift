//
//  Constants.swift
//  DBA
//
//  Created by Eoin Ó'hAnnagáin on 06/07/2021.
//

struct K {
    
    static let color = "Interface"
    
    // Login In and Sign Up segue identifers
    
    static let signedUp = "SignToMain"
    static let loggedIn = "LoginToMain"
    static let guest = "GuestToMain"
    
    
    // Main page segue identifers
    
    static let weatherSegue = "toWeather"
    static let mapSegue = "Map"
    static let toSignUp = "MainToSignUp"
    
    static let toChat = "MainToChat"
    static let toBook = "MainToBookCollection"
    static let toUs = "MainToUs"
    static let toGame = "MainToGame"
    
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
    
    static let bookChosen = "bookChosen"
    static let bookCell = "BookCollectionViewCell"
    static let bookTitles = ["Alice", "Baskervilles", "Christmas", "Cities", "Darkness", "Dorian", "Dracula", "Expectations", "Finn", "Frankenstein", "Oliver", "Oz", "Pride", "Scarlet", "Stranger", "Treasure", "Ulysses", "Wild", "Women", "Worlds"]
    static let bookParts = ["Alice": 14, "Baskervilles": 17, "Christmas": 7, "Cities": 47, "Darkness": 5, "Dorian": 23, "Dracula": 29, "Expectations": 61, "Finn": 45, "Frankenstein": 30, "Oliver": 57, "Oz": 26, "Pride": 63, "Scarlet": 16, "Stranger": 3, "Treasure": 8, "Ulysses": 20, "Wild": 9, "Women": 49, "Worlds": 4]
    
    
    static let bookChapterNames = [
        "Alice": ["Introduction", " Chapter I - Down the Rabbit-Hole", "Chapter II - The Pool of Tears", "Chapter III - A Caucus-Race and a Long Tale", "Chapter IV - The Rabbit Sends in a Little Bill", "Chapter V - Advice from a Caterpillar", "Chapter VI - Pig and Pepper", "Chapter VII - A Mad Tea-Party", "Chapter VIII - The Queen’s Croquet-Ground", "Chapter IX - The Mock Turtle’s Story", "Chapter X - The Lobster Quadrille", "Chapter XI - Who Stole the Tarts?", "Chapter XII - Alice’s Evidence", "PG Disclosure"],
        
        "BaskerVilles": ["Introduction","Chapter 1 - Mr. Sherlock Holmes", "Chapter 2 - The Curse of the Baskervilles", "Chapter 3 - The Problem", "Chapter 4 - Sir Henry Baskerville", "Chapter 5 - Three Broken Threads", "Chapter 6 - Baskerville Hall", "Chapter 7 - The Stapletons of Merripit House", "Chapter 8 - First Report of Dr. Watson", "Chapter 9 - The Light upon the Moor [Second Report of Dr. Watson]", "Chapter 10 - Extract from the Diary of Dr. Watson", "Chapter 11 - The Man on the Tor", "Chapter 12 - Death on the Moor", "Chapter 13 - Fixing the Nets", "Chapter 14 - The Hound of the Baskervilles", "Chapter 15 - A Retrospection", "PG Disclosure"],
        
        "Christmas": ["Introduction", "Stave I: Marley's Ghost", "Stave II: The First of the Three Spirits", "Stave III: The Second of the Three Spirits", "Stave IV: The Last of the Spirits", "Stave V: The End of It", "PG Disclosure"],
        
        "Cities": ["Introduction", "Book I - Chapter I - The Period", "Book I - Chapter II - The Mail", "Book I - Chapter III - The Night Shadows", "Book I - Chapter IV - The Preparation", "Book I - Chapter V - The Wine-shop", "Book I - Chapter VI - The Shoemaker", "Book II - Chapter I - Five Years Later", "Book II - Chapter II - A Sight", "Book II - Chapter III - A Disappointment", "Book II - Chapter IV - Congratulatory", "Book II - Chapter V - The Jackal", "Book II - Chapter VI - Hundreds of People", "Book II - Chapter VII - Monseigneur in Town", "Book II - Chapter VIII - Monseigneur in the Country", "Book II - Chapter IX - The Gorgon’s Head", "Book II - Chapter X - Two Promises", "Book II - Chapter XI - A Companion Picture", "Book II - Chapter XII - The Fellow of Delicacy", "Book II - Chapter XIII - The Fellow of no Delicacy", "Book II - Chapter XIV - The Honest Tradesman", "Book II - Chapter XV - Knitting", "Book II - Chapter XVI - Still Knitting", "Book II - Chapter XVII - One Night", "Book II - Chapter XVIII - Nine Days", "Book II - Chapter XIX - An Opinion", "Book II - Chapter XX - A Plea", "Book II - Chapter XXI - Echoing Footsteps", "Book II - Chapter XXII - The Sea Still Rises", "Book II - Chapter XXIII - Fire Rises", "Book II - Chapter XXIV - Drawn to the Loadstone Rock", "Book III - Chapter I - In Secret", "Book III - Chapter II - The Grindstone", "Book III - Chapter III - The Shadow", "Book III - Chapter IV - Calm in Storm", "Book III - Chapter V - The Wood-sawyer", "Book III - Chapter VI - Triumph", "Book III - Chapter VII - A Knock at the Door", "Book III - Chapter VIII - A Hand at Cards", "Book III - Chapter IX - The Game Made", "Book III - Chapter X - The Substance of the Shadow", "Book III - Chapter XI - Dusk", "Book III - Chapter XII - Darkness", "Book III - Chapter XIII - Fifty-two", "Book III - Chapter XIV - The Knitting Done", "Book III - Chapter XV - The Footsteps Die Out For Ever", "PG Disclosure"],
        
        "Darkness": ["Introduction", "I", "II", "III", "PG Disclosure"],
        
        "Dorian": ["Introduction", "The Preface", "Chapter I", "Chapter II", "Chapter III", "Chapter IV", "Chapter V", "Chapter VI", "Chapter VII", "Chapter VIII", "Chapter IX", "Chapter X", "Chapter XI", "Chapter XII", "Chapter XIII", "Chapter XIV", "Chapter XV", "Chapter XVI", "Chapter XVII", "Chapter XVIII", "Chapter XIX", "Chapter XX", "PG Disclosure"],
        
        "Dracula": ["Introduction", "Chapter I. Jonathan Harker’s Journal", "Chapter II. Jonathan Harker’s Journal", "Chapter", "Chapter IV. Jonathan Harker’s Journal", "Chapter V. Letters—Lucy and Mina", "Chapter VI. Mina Murray’s Journal", "Chapter VII. Cutting from “The Dailygraph,” 8 August", "Chapter VIII. Mina Murray’s Journal", "Chapter IX. Mina Murray’s Journal", "Chapter X. Mina Murray’s Journal", "Chapter XI. Lucy Westenra’s Diary", "Chapter XII. Dr. Seward’s Diary", "Chapter XIII. Dr. Seward’s Diary", "Chapter XIV. Mina Harker’s Journal", "Chapter XV. Dr. Seward’s Diary", "Chapter XVI. Dr. Seward’s Diary", "Chapter XVII. Dr. Seward’s Diary", "Chapter XVIII. Dr. Seward’s Diary", "Chapter XIX. Jonathan Harker’s Journal", "Chapter XX. Jonathan Harker’s Journal", "Chapter XXI. Dr. Seward’s Diary", "Chapter XXII. Jonathan Harker’s Journal", "Chapter XXIII. Dr. Seward’s Diary", "Chapter XXIV. Dr. Seward’s Phonograph Diary, spoken by Van Helsing", "Chapter XXV. Dr. Seward’s Diary", "Chapter XXVI. Dr. Seward’s Diary", "Chapter XXVII. Mina Harker’s Journal", "PG Disclosure"],
        
        "Expectations": ["Introduction", "Chapter I", "Chapter II", "Chapter III", "Chapter IV", "Chapter V", "Chapter VI", "Chapter VII", "Chapter VIII", "Chapter IX", "Chapter X", "Chapter XI", "Chapter XII", "Chapter XIII", "Chapter XIV", "Chapter XV", "Chapter XVI", "Chapter XVII", "Chapter XVIII", "Chapter XIX", "Chapter XX", "Chapter XXI", "Chapter XXII", "Chapter XXIII", "Chapter XXIV", "Chapter XXV", "Chapter XXVI", "Chapter XXVII", "Chapter XXVIII", "Chapter XXIX", "Chapter XXX", "Chapter XXXI", "Chapter XXXII", "Chapter XXXIII", "Chapter XXXIV", "Chapter XXXV", "Chapter XXXVI", "Chapter XXXVII", "Chapter XXXVIII", "Chapter XXXIX", "Chapter XL", "Chapter XLI", "Chapter XLII", "Chapter XLIII", "Chapter XLIV", "Chapter XLV", "Chapter XLVI", "Chapter XLVII", "Chapter XLVIII", "Chapter XLIX", "Chapter L", "Chapter LI", "Chapter LII", "Chapter LIII", "Chapter LIV", "Chapter LV", "Chapter LVI", "Chapter LVII", "Chapter LVIII", "Chapter LIX", "PG Disclosure"],
        
        "Finn": ["Introduction", "Chapter I", "Chapter II", "Chapter III", "Chapter IV", "Chapter V", "Chapter VI", "Chapter VII", "Chapter VIII", "Chapter IX", "Chapter X", "Chapter XI", "Chapter XII", "Chapter XIII", "Chapter XIV", "Chapter XV", "Chapter XVI", "Chapter XVII", "Chapter XVIII", "Chapter XIX", "Chapter XX", "Chapter XXI", "Chapter XXII", "Chapter XXIII", "Chapter XXIV", "Chapter XXV", "Chapter XXVI", "Chapter XXVII", "Chapter XXVIII", "Chapter XXIX", "Chapter XXX", "Chapter XXXI", "Chapter XXXII", "Chapter XXXIII", "Chapter XXXIV", "Chapter XXXV", "Chapter XXXVI", "Chapter XXXVII", "Chapter XXXVIII", "Chapter XXXIX", "Chapter XL", "Chapter XLI", "Chapter XLII", "Chapter The Last", "PG Disclosure"],
        
        "Frankenstein": ["Introduction", "Letter 1", "Letter 2", "Letter 3", "Letter 4", "Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11", "Chapter 12", "Chapter 13", "Chapter 14", "Chapter 15", "Chapter 16", "Chapter 17", "Chapter 18", "Chapter 19", "Chapter 20", "Chapter 21", "Chapter 22", "Chapter 23", "Chapter 24", "PG Disclosure"],
        
        "Oliver": ["Introduction", "Chapter I", "Chapter II", "Chapter III", "Chapter IV", "Chapter V", "Chapter VI", "Chapter VII", "Chapter VIII", "Chapter IX", "Chapter X", "Chapter XI", "Chapter XII", "Chapter XIII", "Chapter XIV", "Chapter XV", "Chapter XVI", "Chapter XVII", "Chapter XVIII", "Chapter XIX", "Chapter XX", "Chapter XXI", "Chapter XXII", "Chapter XXIII", "Chapter XXIV", "Chapter XXV", "Chapter XXVI", "Chapter XXVII", "Chapter XXVIII", "Chapter XXIX", "Chapter XXX", "Chapter XXXI", "Chapter XXXII", "Chapter XXXIII", "Chapter XXXIV", "Chapter XXXV", "Chapter XXXVI", "Chapter XXXVII", "Chapter XXXVIII", "Chapter XXXIX", "Chapter XL", "Chapter XLI", "Chapter XLII", "Chapter The Last", "PG Disclosure"],
        
        "Oz": ["Introduction", "Chapter I - The Cyclone", "Chapter II - The Council with the Munchkins", "Chapter III - How Dorothy Saved the Scarecrow", "Chapter IV - The Road Through the Forest", "Chapter V - The Rescue of the Tin Woodman", "Chapter VI - The Cowardly Lion", "Chapter VII - The Journey to the Great Oz", "Chapter VIII - The Deadly Poppy Field", "Chapter IX - The Queen of the Field Mice", "Chapter X - The Guardian of the Gates", "Chapter XI - The Emerald City of Oz", "Chapter XII - The Search for the Wicked Witch", "Chapter XIII - The Rescue", "Chapter XIV - The Winged Monkeys", "Chapter XV - The Discovery of Oz, the Terrible", "Chapter XVI - The Magic Art of the Great Humbug", "Chapter XVII - How the Balloon Was Launched", "Chapter XVIII - Away to the South", "Chapter XIX - Attacked by the Fighting Trees", "Chapter XX - The Dainty China Country", "Chapter XXI - The Lion Becomes the King of Beasts", "Chapter XXII - The Country of the Quadlings", "Chapter XXIII - Glinda The Good Witch Grants Dorothy’s Wish", "Chapter XXIV - Home Again", "PG Disclosure"],
        
        "Pride": ["Introduction", "Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11", "Chapter 12", "Chapter 13", "Chapter 14", "Chapter 15", "Chapter 16", "Chapter 17", "Chapter 18", "Chapter 19", "Chapter 20", "Chapter 21", "Chapter 22", "Chapter 23", "Chapter 24", "Chapter 25", "Chapter 26", "Chapter 27", "Chapter 28", "Chapter 29", "Chapter 30", "Chapter 31", "Chapter 32", "Chapter 33", "Chapter 34", "Chapter 35", "Chapter 36", "Chapter 37", "Chapter 38", "Chapter 39", "Chapter 40", "Chapter 41", "Chapter 42", "Chapter 43", "Chapter 44", "Chapter 45", "Chapter 46", "Chapter 47", "Chapter 48", "Chapter 49", "Chapter 50", "Chapter 51", "Chapter 52", "Chapter 53", "Chapter 54", "Chapter 55", "Chapter 56", "Chapter 57", "Chapter 58", "Chapter 59", "Chapter 60", "Chapter 61", "PG Disclosure"],
        
        "Scarlet": ["Introduction", "Part I - Chapter I", "Part I - Chapter II", "Part I - Chapter III", "Part I - Chapter IV", "Part I - Chapter V", "Part I - Chapter VI", "Part I - Chapter VII", "Part II - Chapter I", "Part II - Chapter II", "Part II - Chapter III", "Part II - Chapter IV", "Part II - Chapter V", "Part II - Chapter VI", "Part II - Chapter VII", "PG Disclosure"],
        
        "Stranger": ["Introduction", "The Stranger - Full Story", "PG Disclosure"],
        
        "Treasure": ["Introduction", "Part I - The Old Buccaneer", "Part II - The Sea Cook", "Part III - My Shore Adventure", "Part IV - The Stockade", "Part V - My Sea Adventure", "Part VI - Captain Silver", "PG Disclosure"],
        
        "Ulysses": ["Introduction", "[ 1 ]", "[ 2 ]", "[ 3 ]", "[ 4 ]", "[ 5 ]", "[ 6 ]", "[ 7 ]", "[ 8 ]", "[ 9 ]", "[ 10 ]", "[ 11 ]", "[ 12 ]", "[ 13 ]", "[ 14 ]", "[ 15 ]", "[ 16 ]", "[ 17 ]", "[ 18 ]", "PG Disclosure"],
        
        "Wild": ["Introduction", "Chapter I - Into the Primitive", "Chapter II - The Law of Club and Fang", "Chapter III - The Dominant Primordial Beast", "Chapter IV - Who Has Won to Mastership", "Chapter V - The Toil of Trace", "Chapter VI - For the Love of a Man", "Chapter VII - The Sounding of the Call", "PG Disclosure"],
        
        "Women": ["Introduction", "ONE - PLAYING PILGRIMS", "TWO - A MERRY CHRISTMAS", "THREE - THE LAURENCE BOY", "FOUR - BURDENS", "FIVE - BEING NEIGHBORLY", "SIX - BETH FINDS THE PALACE BEAUTIFUL", "SEVEN - AMY'S VALLEY OF HUMILIATION", "EIGHT - JO MEETS APOLLYON", "NINE - MEG GOES TO VANITY FAIR", "TEN - THE P.C. AND P.O.", "ELEVEN - EXPERIMENTS", "TWELVE - CAMP LAURENCE", "THIRTEEN - CASTLES IN THE AIR", "FOURTEEN - SECRETS", "FIFTEEN - A TELEGRAM", "SIXTEEN - LETTERS", "SEVENTEEN - LITTLE FAITHFUL", "EIGHTEEN - DARK DAYS", "NINETEEN - AMY'S WILL", "TWENTY - CONFIDENTIAL", "TWENTY-ONE - LAURIE MAKES MISCHIEF, AND JO MAKES PEACE", "TWENTY-TWO - PLEASANT MEADOWS", "TWENTY-THREE - AUNT MARCH SETTLES THE QUESTION", "PG Disclosure"],
        
        "Worlds": ["Introduction", "Book I - Chapter I - THE EVE OF THE WAR", "Book I - Chapter II - THE FALLING STAR", "Book I - Chapter III - ON HORSELL COMMON", "Book I - Chapter IV - THE CYLINDER OPENS", "Book I - Chapter V - THE HEAT-RAY", "Book I - Chapter VI - THE HEAT-RAY IN THE CHOBHAM ROAD", "Book I - Chapter VII - HOW I REACHED HOME", "Book I - Chapter VIII - FRIDAY NIGHT", "Book I - Chapter IX - THE FIGHTING BEGINS", "Book I - Chapter X - IN THE STORM", "Book I - Chapter XI - AT THE WINDOW", "Book I - Chapter XII - WHAT I SAW OF THE DESTRUCTION OF WEYBRIDGE AND SHEPPERTON", "Book I - Chapter XIII - HOW I FELL IN WITH THE CURATE", "Book I - Chapter XIV - IN LONDON", "Book I - Chapter XV - WHAT HAD HAPPENED IN SURREY", "Book I - Chapter XVI - THE EXODUS FROM LONDON", "Book I - Chapter XVII - THE “THUNDER CHILD”", "Book II - Chapter I - UNDER FOOT", "Book II - Chapter  II - WHAT WE SAW FROM THE RUINED HOUSE", "Book II - Chapter III - THE DAYS OF IMPRISONMENT", "Book II - Chapter IV - THE DEATH OF THE CURATE", "Book II - Chapter V - THE STILLNESS", "Book II - Chapter VI - THE WORK OF FIFTEEN DAYS", "Book II - Chapter VII - THE MAN ON PUTNEY HILL", "Book II - Chapter VIII - DEAD LONDON", "Book II - Chapter IX - WRECKAGE", "Book II - Chapter X - THE EPILOGUE", "PG Disclosure"]
    ]
}








