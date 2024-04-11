import React from 'react';
import { MultiChatSocket,MultiChatWindow,useMultiChatLogic } from "react-chat-engine-advanced";

function Advanced({chatUser}) {
    const chatProps = useMultiChatLogic (
        "6c22a910-f41d-4d78-9011-bda60465bf24",chatUser?.chatUser,chatUser?.chatSecret
      )
      return (
        <div style={{ height: "100vh" }}>
         <MultiChatSocket {...chatProps} />
         <MultiChatWindow {...chatProps} style={{height:"100%"}} />
        </div>
      );
    };

export default Advanced;
