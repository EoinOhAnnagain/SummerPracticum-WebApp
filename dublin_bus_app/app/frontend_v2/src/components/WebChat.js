import React from 'react';
import { useState, useEffect ,useContext, useRef} from 'react';
import Button from './Button'
import Select from 'react-select';
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import './WebChat.css'
import { getDate } from 'date-fns';


const WebChat = ({user = null, db = null, routeData}) => {
    // Variables to store the messages from firebase, and user message
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    // Default 'route' for the chat is general 'messages' chat
    const [route, setRoute] = useState('messages');
    // Default email is guest
    const [email, setEmail] = useState("guest1@web.com")
    // Ref used to manage scroll location for chat
    const scrollDivEndRef = useRef()
    
    console.log("User in webchat is", user)

    
    // Check if user login firebase account.
    const {currentUser}  = useContext(AuthContext);

    //Store the user's email
    const userEmail = localStorage.getItem('email');
    // Bus and direction combine to create the database key used for each individual route
    const [bus, setBus] = useState(null);
    const [direction, setDirection] = useState(null);
    // Boolean value for info display
    const [infoVisible, setInfoVisible] = useState(false);

    
    // Options used in our selectors, routes taken from the result of an earlier fetch request, directions are simply 'inbound' and 'outbound'
    const busOptions = routeData.map(route => {
        return {value: route.route_short_name, 
                label: route.route_short_name}
    })

    const directionOptions = [
        {value: "In", label: "Inbound"}, {value: "Out", label: "Outbound"}
    ]

    // Bus selector function
    const changeBus = (selected) => {
        setBus(selected.value);
        console.log(bus, "is new bus");
    };

    // Direction selector function
    const changeDirection = (selected) => {
        setDirection(selected.value);
        console.log(direction, "is new direction");
    };

    // Combines the previous two values to create the request to join the new chatroom
    const setChat = () => {
        console.log(bus+direction);
        const date = Date.now();
        const timestamp = Math.floor(date/1000);
        console.log(timestamp, "should be unix");
        console.log(date, "should be unix miliseconds?");
        if (bus == null && direction == null){
            alert("Please select a bus route and direction")
        } else if (bus==null){
            alert("Please select a bus route")
        } else if (direction==null){
            alert("Please select a direction")
        } else {
            setRoute(bus+direction);
            changeChat(bus, direction);
        }
    }

    // Allows user to re-route back to general chat after navigating away
    const backToGeneral = () => {
        setRoute("messages");
        changeChat("messages", "");
    }

    //Fetches default general chat messages
    useEffect(() => {
        if (db){
            const unsubscribe = db
            .collection('messages')
            .orderBy('date')
            .limit(100)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                //update State
                setMessages(data);
            })
            //Detatch listener
        return unsubscribe;
        } 
    }, [db]);

    // Manager function to allow user to select different chat
    const changeChat = (bus, direction) => {
        if (db){
            const unsubscribe = db
            .collection(bus+direction)
            .orderBy('date')
            .limit(100)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                //update State
                console.log(data, "is data in changeChat function");
                if (!data.length){
                    setMessages([{id: "error", body: "No messages to show yet", date: 1627819200}])
                } else{
                    setMessages(data);
                }
            })
            //Detatch listener
        return unsubscribe;
        }
    }

    // Stores the string value of what the user has typed
    const handleOnChange = e => {
        setNewMessage(e.target.value);
    };

    // Used for profanity filter - prototype only, there are many swear words to block, so little time
    const profanities = ["fuck", "shit", "bitch", "bastard"];

    // Function called when user clicks 'send'
    const handleOnSubmit = e => {
        e.preventDefault();
        for (let i in profanities){
            if (newMessage.toLowerCase().includes(profanities[i])){
                alert("Your message may contain profanity. Please re-word and try again.")
                return
            }
        }
        const date = Date.now();
        const timestamp = Math.floor(date/1000);
        if (db){
            db.collection(route).add({
                body: newMessage,
                date: timestamp, // date object- time since 1970
                sender: userEmail
            })
            setNewMessage('')
        }
    }

    // Function to scroll to most recent messages on page render
    useEffect(() => {
        updateScroll()
      }, [messages]);

    const updateScroll = () => {
        scrollDivEndRef.current?.scrollIntoView({behavior:"smooth"})
    }

    // Function used for displaying message date, shown to users on hover
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;

    const getDate = (unixSeconds) => {
        let date = new Date(unixSeconds*1000);
        let h = date.getHours();
        let m = date.getMinutes();
        let d = date.getDate();
        let M = date.getMonth() + 1;
        if (todayDate == d && todayMonth == M){
            return `${h}:${m<10? "0"+m :m}`
        }else {
            return `${h}:${m<10? "0"+m :m} ${d}/${M}`
        }
    }

    // These are the email addresses that will currently appear in 'Dublin Bus Admin' styling on the chat
    const admins = ["eoin.ohannagain@ucdconnect.ie", "eugene.egan1@ucdconnect.ie", "ming-han.ta@ucdconnect.ie", "junzheng.liu@ucdconnect.ie", "eoin1711@gmail.com"]

    const checkAdmins = (userEmail) => {
        for (let i in admins){
            console.log(userEmail, admins[i])
            if (admins[i] == userEmail){
                return true
            }
        }
        return false
    }

    // Redirects user if not logged in - this is a subscriber only perk!
    if(! currentUser){
        alert("You must login to access Chat");
        return <Redirect to="/login" />;

    }

    return (
        <div>
            <h2 style={{color:"white"}}>Select your Route and Direction</h2>
            <Select options={busOptions} onChange={changeBus}/>
            <Select options={directionOptions} onChange={changeDirection}/>
            <Button text="Chat" onClick={setChat}/> 
            {route!="messages" && <Button text="General Chat" onClick={backToGeneral}/>}
            <div className="msgs">
                {messages.map(message => (
                    <div key={message.id}>
                        <div key={message.id} className={`msg ${message.sender == userEmail ? 'sent' : checkAdmins(message.sender) ? 'admin' : 'received'}`}>
                            <div className="messageBody">
                                <p>{message.body}</p>
                                <div>{getDate(message.date)}</div>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={scrollDivEndRef}/>
            </div>
            <div className="newMsgSubmission">
                <form onSubmit={handleOnSubmit}>
                    <input
                    style={{ width: '73%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder= "Chat with other bus users..."
                    />
                    <button className="btn"
                    style={{ position: "absolute", right: "0", width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}}
                    type="submit" disabled={!newMessage}>
                        Send
                    </button>
                </form>
            </div>
            <div className="infoButton">
                <button className="btn" onClick={()=>setInfoVisible(!infoVisible)} title="Chat Info">{infoVisible ? "Hide Chat Info" : "Show Chat Info"}</button>
            </div>
        {infoVisible && (<div className="toggleContainer">
            <p>We want to connect you to other Dublin Bus users around the city</p>
            <p>Every bus route has a chatroom for both inbound and outbound routes, found using our selectors above</p>
            <p>Get travel updates, ask for help, and connect!</p>
            <div className="handyInfo">
                <div className="msg received">Other users appear in chat like this</div>
                <div className="msg admin">Dublin Bus administrators appear like this</div>
            </div>
        </div>)}
        </div>
    )
}

export default WebChat
