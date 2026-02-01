import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MockSocket } from './MockSocket';

export default function RealtimeUi() {
    const messageRef = useRef([]);
    const socketRef = useRef(null);
    const containerRef = useRef(null);

    const [messages, setMessages] = useState([]);

    const onMessage = useCallback((message) => {
        
        messageRef.current.push(message);
    }, [])

    const intervalFunction = () => {
        const interval = setInterval(() => {
            setMessages([...messageRef.current])
            
        }, 1000);
        return interval
    }

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    },[messages])
    

    useEffect(() => {
        socketRef.current = new MockSocket(onMessage)
        socketRef.current.connect();
        const interval = intervalFunction();
        return () => {
            socketRef.current.disconnect();
            clearInterval(interval);
        }
    }, []);

    return (
        <div  style={{ height : window.innerHeight, overflowY: "auto" }} ref={containerRef}>
            {messages?.map(item => {
                return (
                <p key={item.id}>{item.text + 'Counter -> ' + item.counter}</p>
            )
            })}
        </div>
    );
}