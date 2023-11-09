import { parseContent } from "../../utils/content";
import { useState, useEffect } from "react";
import "./thread.css"
import { Event } from "nostr-tools";
import Popout from "../PostForms/PopoutMain";
import { renderMedia } from "../../utils/FileUpload";

type EventRowProps = {
  event: Event;
  replyCount: number;
};

const EventRow = ({ event, replyCount}: EventRowProps) =>  {
  const { comment, file } = parseContent(event);
  const [whichPopout, setWhichPopout] = useState('null');


  const closePopout = () => {
    if (whichPopout === 'null') {
      setWhichPopout('zap');
    } else if (whichPopout === 'zap') {
      setWhichPopout('null');
    }
  };
  
  return (
  <>
    <div className="thread">
      <a href={`/g/${event.id}`}>
      {renderMedia(file)}
      </a>
      <div title="(R)eplies / (I)mage Replies" id="meta" className="meta">
        R: <b>{replyCount}</b>
        <a href={`/g/${event.id}`} className="postMenuBtn" title="Thread Menu">▶</a>
      </div>
      <div className="teaser">{comment}</div>
    </div>
    <Popout whichPopout={whichPopout} events={[event]} closePopout={closePopout}/>
  </>
  );
}

export default EventRow;