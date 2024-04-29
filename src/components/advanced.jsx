import React from 'react';
import { MultiChatSocket,MultiChatWindow,useMultiChatLogic } from "react-chat-engine-advanced";

function Advanced({chatUser}) {
    const chatProps = useMultiChatLogic (
        "4e40e4ad-de30-493d-a57d-56f6d19e49b3",chatUser?.chatUser,chatUser?.chatSecret
      )
      return (
        <div style={{ height: "100vh" }}>
         <MultiChatSocket {...chatProps} />
         <MultiChatWindow {...chatProps} style={{height:"100%"}} />
        </div>
      );
    };

export default Advanced;
