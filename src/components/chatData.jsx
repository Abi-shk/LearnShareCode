
import React from 'react';
import { PrettyChatWindow } from "react-chat-engine-pretty";

function ChatData({chatUser}) {
    
     return(
      <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId={"6c22a910-f41d-4d78-9011-bda60465bf24"}
        username={chatUser?.chatUser}
        secret={chatUser?.chatUser}
      />
    </div>

     )  
      

      
    };

export default ChatData;