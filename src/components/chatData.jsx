
import React from 'react';
import { PrettyChatWindow } from "react-chat-engine-pretty";

function ChatData({chatUser}) {

  console.log(chatUser)
    
     return(
      <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId={"0838887b-b9d0-437c-bd9c-719bcf250e36"}
        username={chatUser?.chatUser}
        secret={chatUser?.chatUser}
      />
    </div>

     )  
      

      
    };

export default ChatData;