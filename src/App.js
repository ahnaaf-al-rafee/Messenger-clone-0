import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import firebase from "firebase";
import FlipMove from "react-flip-move";

import "./App.css";
import Message from "./Message";
import db from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // console.log(input);
  // console.log(messages);

  useEffect(() => {
    // useEffect for the database loading
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    // useEffect for `username` prompt
    // useEffect runs when the app loads
    // if the dependencies is blank => [] ; then it runs just once when the app component loads

    setUsername(prompt("Please Enter Your Name To Start Chat"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); //Prevents app from refreshing
    // All the logic for sending messages here!

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Facebook Messenger Clone</h1>
      <h3>Welcome {username}</h3>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      {/* Messages Appears here */}

      <FlipMove className="card__content">
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
