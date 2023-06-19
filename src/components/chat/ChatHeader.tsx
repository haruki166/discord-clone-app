import {
  Help,
  Notifications,
  PeopleAlt,
  PushPin,
  Search,
  Send,
} from "@mui/icons-material";
import React from "react";
import "./ChatHeader.scss";

type Props = {
  channelName: string | null;
};

const ChatHeader = (props: Props) => {
  const { channelName } = props;
  return (
    <div className="chatHeader">
      <div className="chatHeaderLeft">
        <h3>
          <span className="chatHeaderHash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeaderRight">
        <Notifications />
        <PushPin />
        <PeopleAlt />
        <div className="chatHeaderSearch">
          <input type="text" placeholder="検索" />
          <Search />
        </div>
        <Send />
        <Help />
      </div>
    </div>
  );
};

export default ChatHeader;
