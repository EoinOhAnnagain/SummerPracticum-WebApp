import React from 'react';
import { useState, useEffect } from 'react';
import firebase from "firebase/app";

const WebChat = ({user = null, db = null}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [route, setRoute] = useState('messages');

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
