import React from 'react';
import { useState, useEffect ,useContext, useRef} from 'react';
import Button from './Button'
import Select from 'react-select';
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import './WebChat.css'


const WebChat = ({user = null, db = null, routeData}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [route, setRoute] = useState('messages');
    const [email, setEmail] = useState("guest1@web.com")
    const scrollDivEndRef = useRef()
    
    console.log("User in webchat is", user)

    // localStorage.getItem('email')
    // Check if user login firebase account.
    const {currentUser}  = useContext(AuthContext);
    // using localStorage.getItem('email') could get login email address.

    if(! currentUser){
        alert("You must login to access Chat");
        return <Redirect to="/login" />;
    }

    const userEmail = localStorage.getItem('email');
    const [bus, setBus] = useState(null);
    const [direction, setDirection] = useState(null);

    const admins = ["eoin.ohannagain@ucdconnect.ie", "eugene.egan1@ucdconnect.ie", "ming-han.ta@ucdconnect.ie", "junzheng.liu@ucdconnect.ie", "eoin1711@gmail.com"]

    const busOptions = routeData.map(route => {
        return {value: route.route_short_name, 
                label: route.route_short_name}
    })

    const directionOptions = [
        {value: "In", label: "Inbound"}, {value: "Out", label: "Outbound"}
    ]


    const changeBus = (selected) => {
        setBus(selected.value);
        console.log(bus, "is new bus");
    };

    const changeDirection = (selected) => {
        setDirection(selected.value);
        console.log(direction, "is new direction");
    };

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

    const backToGeneral = () => {
        setRoute("messages");
        changeChat("messages", "");
    }

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
                    setMessages([{id: "error", body: "No messages to show yet"}])
                } else{
                    setMessages(data);
                }
            })
            //Detatch listener
        return unsubscribe;
        }
    }

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();
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

    useEffect(() => {
        updateScroll()
      }, [messages]);

    const updateScroll = () => {
        scrollDivEndRef.current?.scrollIntoView({behavior:"smooth"})
    }

    //
// fuck bastard bitch wank
    //

    return (
        <div>
            <h2>Select your Route and Direction</h2>
            <Select options={busOptions} onChange={changeBus}/>
            <Select options={directionOptions} onChange={changeDirection}/>
            <Button text="Chat" onClick={setChat}/> 
            {route!="messages" && <Button text="General Chat" onClick={backToGeneral}/>}
            <div className="msgs">
                {messages.map(message => (
                    <div key={message.id}>
                        <div key={message.id} className={`msg ${message.sender == userEmail ? 'sent' : admins.includes(userEmail) ? 'admin' : 'received'}`}>
                            <p>{message.body}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollDivEndRef}/>
            </div>
            <form onSubmit={handleOnSubmit}>
                <input
                style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Type your message here..."
                />
                <button className="btn"
                style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}}
                type="submit" disabled={!newMessage}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default WebChat
