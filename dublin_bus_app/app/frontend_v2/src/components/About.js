import React from 'react';
import { useState } from 'react';
import Even from '../assets/evenProfessional.png';
import Eugene from '../assets/eugeneProfessional.png';
import Hank from '../assets/hankProfessional.png';
import Eoin from '../assets/eoinProfessional.png';


const About = () => {
    const [showEven, setShowEven] = useState(false);
    const [showEugene, setShowEugene] = useState(false);
    const [showHank, setShowHank] = useState(false);
    const [showEoin, setShowEoin] = useState(false);
    
    return (
        <div className="container">
            <div className="about">
            <img src={Even} alt="Even" onClick={() => setShowEven(!showEven)}/>
            <h1>Junzheng Liu</h1>
            {showEven && (<div className="bio">
Even is a back-end engineer specializing in data analysis. In this project, he is mainly responsible for machine learning to predict travel time, database construction, implementation of travel price calculation functions and the establishment of docker images.
He used to work in China Airlines for market data processing and analysis.
He used to develop a complete automatic lesson scheduling system at the Yantai branch of New Oriental Education Technology Group.
He often says that he has processed more data than the salt he has eaten himself.</div>)}
            <img src={Eugene} alt="Eugene" onClick={() => setShowEugene(!showEugene)}/>
            <h1>Eugene Egan</h1>
            {showEugene && (<div className="bio">Eugene brought the Dublin Bus data to life, in the form of bespoke APIs used across both iOS and Web apps, as well as designing and constructing the Web App's map and journey interfaces. He also unified the cross-platform chat function on the Web end. Eugene was Scrum Master of this Agile team, ensuring team coordination so that milestones were met.
            <br/>
Eugene is a former musician, turned former paralegal, now Computer Science student in UCD. Music being a young man's game, and Law being a waste of a good life, who knew that ultimate happiness would come in the form of agonizing over JSON parsing for hours on end.</div>)}
            <img src={Hank} alt="Hank" onClick={() => setShowHank(!showHank)}/>
            <h1>MinHang-Ta</h1>
            {showHank && (<div className="bio">Hank was an experienced firmware engineer in Taiwan, during those years of work he has became an expert to print Hello world in any kinds of programming language. 
                <br/>In this project, Hank was responsible for setting up the backend development environment, such as creating Docker file and initiating the Django setting. Also, he built up a user authentication system by Django and React, to deal with the sign-in and sign-up process from backend to frontend.</div>)}
            <img src={Eoin} alt="Eoin" onClick={() => setShowEoin(!showEoin)}/>
            <h1>Eoin o'hAnnagain</h1>
            {showEoin && (<div className="bio">Throughout the practicum Eoin was responsible for the iOS development learning swift and Xcode from scratch to do so. As part of this he also took lead of the project UI styles as well initiating the cross platform chat function. Additionally, as the teams maintenance lead, Eoin was responsible for maintaining the teams GitHub repository, establishing the teams best practices, and resolving conflicts. 
                <br/>
Prior to undertaking the Computer Science conversion masters at UCD, Eoin was a Music and Religious Education teacher, having studied at Mater Dei/DCU. He is also an associate of the Royal Irish Academy of Music and has been teaching piano since 2008 and has performed organ at the National Concert Hall.</div>)}
        </div>
        </div>
    )
}

export default About
