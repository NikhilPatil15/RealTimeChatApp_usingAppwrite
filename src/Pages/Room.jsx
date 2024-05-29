import React, { useEffect, useState } from "react";
import client, {
  COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwriteConfig";
import { ID, Permission, Query, Role } from "appwrite";
import { Trash2 } from "react-feather";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../Components";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const { user } = useAuth();

  //fetching all the messages from the database
  const getMesssages = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);

    setMessages(response.documents);
  };

  //Creating document in the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    let permissions = [
      Permission.write(Role.user(user.$id)) 
    ];

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      payload,
      permissions
    );

    // setMessages((prevState) => [...messages, response]);
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
   

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        console.log("RESPONSe: ", response);

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("Message created");
          setMessages((prevState) => [response.payload, ...prevState]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("Message Deleted");
          setMessages((prevstate) =>
            prevstate.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    getMesssages();

    return () => {
      unsubscribe();
    };
  }, [messageBody]);

  return (
    <div className="container">
      <Header />
      <div className="room--container">
        <form className="message--form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <textarea
              required
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
              placeholder="Say something..."
            />
          </div>
          <div className="send-btn--wrapper">
            <button
              type="submit"
              value="Send"
              className="btn btn--lg btn--secondary"
            >
              Send
            </button>
          </div>
          <br />
          <div>
            {messages.map((message) => {
              return (
                <div key={message.$id} className="message--wrapper">
                  <div className="message--header">
                    <p>
                      {message?.username ? (
                        <span> {message.username}</span>
                      ) : (
                        <span> Anonymous user </span>
                      )}
                      <small className="message-timestamp">
                        {new Date(message.$createdAt).toLocaleString()}
                      </small>
                    </p>
                    {message.$permissions.includes(
                      `delete(\"user:${user.$id}\")`
                    ) && (
                      <Trash2
                        className="delete--btn"
                        onClick={() => {
                          deletedocument(message.$id);
                        }}
                      />
                    )}
                  </div>
                  <div className={"message--body " + (message.user_id === user.$id ? "message--body--owner": (""))}>
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
