import React from 'react';
import { useState } from 'react';
import professional1 from '../assets/professional1.png';
import professional2 from '../assets/professional2.png';
import professional3 from '../assets/professional3.png';
import professional4 from '../assets/professional4.png';

const About = () => {
    const [showEven, setShowEven] = useState(false);
    const [showEugene, setShowEugene] = useState(false);
    const [showHank, setShowHank] = useState(false);
    const [showEoin, setShowEoin] = useState(false);
    
    return (
        <div>
            Pictures here:
            <img src={professional1} alt="Even" onClick={() => setShowEven(!showEven)}/>
            {showEven && (<div>Here is Even's Story</div>)}
            <img src={professional2} alt="Eugene" onClick={() => setShowEugene(!showEugene)}/>
            {showEugene && (<div>Here is Eugene's Story</div>)}
            <img src={professional3} alt="Hank" onClick={() => setShowHank(!showHank)}/>
            {showHank && (<div>Here is Hank's Story</div>)}
            <img src={professional4} alt="Eoin" onClick={() => setShowEoin(!showEoin)}/>
            {showEoin && (<div>Here is Eoin's Story</div>)}
        </div>
    )
}

export default About
