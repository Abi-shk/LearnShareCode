import { useEffect, useState } from "react";

import Advanced from "../components/advanced";

const ChatsPage = (props) => {
  const [ChatUser, setChatUser] = useState();

  useEffect(() => {
    console.log("Component Mounted");
    const ChatData = localStorage.getItem("chatData");
    console.log(ChatData);
  
    if (ChatData) {
      try {
        const Data = JSON.parse(ChatData);
        console.log(Data);
        setChatUser(Data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // Handle the error gracefully, such as setting a default value for ChatUser
        setChatUser(null); // or any default value suitable for your application
      }
    } 
  }, []);
 console.log(ChatUser)
return(
  ChatUser&&
  < Advanced chatUser={ChatUser}/>
)
}

export default ChatsPage;