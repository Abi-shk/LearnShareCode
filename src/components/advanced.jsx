import React from 'react';
import { MultiChatSocket,MultiChatWindow,useMultiChatLogic } from "react-chat-engine-advanced";

function Advanced({chatUser}) {
    const chatProps = useMultiChatLogic (
        "0838887b-b9d0-437c-bd9c-719bcf250e36",chatUser?.chatUser,chatUser?.chatSecret
      )
      return (
        <div style={{ height: "100vh" }}>
         <MultiChatSocket {...chatProps} />
         <MultiChatWindow {...chatProps} style={{height:"100%"}} />
        </div>
      );
    };

export default Advanced;
