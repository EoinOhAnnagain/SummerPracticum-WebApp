import React from 'react';
import { useState, useEffect ,useContext} from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";


const WebChat = ({user = null, db = null}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [route, setRoute] = useState('messages');
    
    localStorage.getItem('email')
    // Check if user login firebase account.
    const {currentUser}  = useContext(AuthContext);
    // using localStorage.getItem('email') could get login email address.
    if(! currentUser){
        alert("You must login first.");
        return <Redirect to="/login" />;
    }

    useEffect(() => {

        if (db){
            const unsubscribe = db
            .collection(route)
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
                sender: "guest@web.com"
            })

        }
    }

    return (
        <div>
            <ul>
                {messages.map(message => (
                    <li key={message.id}> {message.body}</li>
                ))}
            </ul>
            <form onSubmit={handleOnSubmit}>
                <input
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Type your message here..."
                />
                <button type="submit" disabled={!newMessage}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default WebChat
