import React, { useEffect, useState } from "react";
import { COLLECTION_ID, DATABASE_ID, databases } from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { Trash2 } from "react-feather";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  //fetching all the messages from the database
  const getMesssages = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);

    setMessages(response.documents);
  };

  //Creating document in the database
  const createDocument = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
    };
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      payload
    );

    setMessages((prevState) => [...messages, response]);
    setMessageBody("");
  };

  //deleting document
  const deletedocument = async (message_id) => {
    const result = await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID,
      message_id
    );

    setMessages((prevstate) =>
      messages.filter((message) => message.$id !== message_id)
    );

    console.log(result);
  };

  useEffect(() => {
    getMesssages();
  }, []);

  return (
    <div className="container">
      <div className="room--container">
        <form className="message--form" onSubmit={(e) => createDocument(e)}>
          <div>
            <textarea
              required
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            />
          </div>
          <div className="send-btn--wrapper">
            <button type="submit" value="Send" className="btn btn--secondary">
              {" "}
              Send{" "}
            </button>
          </div>
          <div>
            {messages.map((message) => {
              return (
                <div key={message.$id} className="message-wrapper">
                  <div className="message--header">
                    <small className="message-timestamp">
                      {message.$createdAt}
                    </small>

                      <Trash2
                        className="delete--btn"
                        onClick={() => {
                          deletedocument(message.$id);
                        }}
                      />

                  </div>
                  <div className="message--body">
                    <span>{message.body}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Room;
