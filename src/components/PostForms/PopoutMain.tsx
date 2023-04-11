import React from "react";
import {
  type Event as NostrEvent,
} from "nostr-tools";
import ZapPopout from "./ZapPopout";
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
        zap: JSX.Element;
      } = {
        reply: <ReplyPopout events={events} closePopout={closePopout}/>,
        zap: <ZapPopout event={events[0]} closePopout={closePopout}/>,
        null: <></>,
      };
      
    return popouts[whichPopout] ;
};

export default Popout;