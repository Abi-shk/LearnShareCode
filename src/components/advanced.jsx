import React from 'react';
import { MultiChatSocket,MultiChatWindow,useMultiChatLogic } from "react-chat-engine-advanced";

function Advanced({chatUser}) {
    const chatProps = useMultiChatLogic (
        "e22744d2-1abf-44d2-94dc-584039c7b863",chatUser?.chatUser,chatUser?.chatSecret
      )
      return (
        <div style={{ height: "100vh" }}>
         <MultiChatSocket {...chatProps} />
         <MultiChatWindow {...chatProps} style={{height:"100%"}} />
        </div>
      );
    };

export default Advanced;
