import React from "react";
import {
  type Event as NostrEvent,
} from "nostr-tools";
import ReplyPopout from "./ReplyPopout";

type PopoutProps = {
  whichPopout: string,
  events: NostrEvent[];
  closePopout: () => void;
};

const Popout: React.FC<PopoutProps> = ({
  whichPopout,
  events,
  closePopout,
}) => {
    
    const popouts: {
        [key: string]: JSX.Element;
        reply: JSX.Element;
      } = {
        reply: <ReplyPopout events={events} closePopout={closePopout}/>,
        null: <></>,
      };
      
    return popouts[whichPopout] ;
};

export default Popout;