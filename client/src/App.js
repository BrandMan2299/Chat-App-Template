import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setUser('Guest#' + Math.round((Math.random() * 2000 + 1)))
    setInterval(() => {
      axios.get("/messages").then(messages => {
        setMessages(messages.data);
      })
    }, 1000)
  }, [])

  const postMessage = (e) => {
    e.preventDefault();
    axios.post("/messages", { body: inputValue, user: user }).then(
      setInputValue("")
    )
  }

  const enteredMessage = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div>
      <form onSubmit={postMessage}>
        <input id='messageInput' required onChange={enteredMessage} value={inputValue}></input>
        <button id='sendButton' type='submit' value='Send'>Send</button>
      </form>
      <input id='changeUserInput' value={user} onChange={(e) => { setUser(e.target.value) }}></input>
      <div className='messagesContainer'>

        {messages[0] ? messages.map((msg, i) => {
          return (
            <div className={msg.user === user ? 'my-msg msg' : 'other-msg msg'} key={i}>
              <strong>{msg.user}</strong>
              <br />{msg.body}
            </div>
          )
        }) : null}
      </div>
    </div>
  );
}

export default App;
