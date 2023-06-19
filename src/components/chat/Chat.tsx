import React, { useEffect, useState } from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import {
  AddCircleOutline,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@mui/icons-material";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../app/hooks";
import {
  DocumentData,
  DocumentReference,
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const { subDocuments: messages } = useSubCollection("channels", "messages");
  const user = useAppSelector((state) => state.user.user);
  // console.log(inputText);

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    //channelコレクションの中にあるmessageコレクションの中にメッセージ情報を入れる
    //
    //今クリックしているチャンネルのメッセージコレクションに入力したデータを入れる
    const collectionRef = collection(
      db,
      "channels",
      String(channelId), //クリックしたチャンネルのID
      "messages"
    );
    //
    //上のコードで設定した箇所にオブジェクト（データ）を入れる
    const docRef: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      }
    );
    console.log(docRef);
    setInputText("");
  };

  return (
    <div className="chat">
      {/* <>ChatHeader</> */}
      <ChatHeader channelName={channelName} />
      {/* <>ChatMessage</> */}
      <div className="chatMessage">
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
            />
          );
        })}
      </div>
      {/* ChatInput */}
      <div className="chatInput">
        <AddCircleOutline />
        <form>
          <input
            type="text"
            value={inputText}
            placeholder={`#${channelName}へメッセージを送信`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            送信
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcard />
          <Gif />
          <EmojiEmotions />
        </div>
      </div>
    </div>
  );
};

export default Chat;
