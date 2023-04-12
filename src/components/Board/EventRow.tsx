import { useNostrEvents } from "nostr-react";
import { parseContent } from "../../utils/parseContent";
import { useState, useEffect } from "react";
import "./thread.css"
import { Event } from "nostr-tools";
import * as bolt11 from "bolt11";
import Popout from "../PostForms/PopoutMain";

export function useReplyCounts(event: Event) {
  const { events } = useNostrEvents({
    filter: {
      kinds: [1, 9735],
      '#e': [event.id],
      limit: 75,    
    },
  });
  const [replyCount, setReplyCount] = useState(events.length);
  const [imageReplyCount, setImageReplyCount] = useState(0);
  const [zapAmount, setZapAmount] = useState(0);

  useEffect(() => {
    const filteredEvents = events.filter(
      (event) => parseContent(event).file !== ''
    );

    const zapEvents = events.filter(
      (event) => event.kind === 9735
    );
    const amount = zapEvents.reduce((acc, event) => {
      let zapped = event.tags[1][1];
      const amount = bolt11.decode(zapped)?.satoshis;
      return acc + (amount as number);
    }
    , 0);
    setZapAmount(amount);

    setReplyCount(events.length - zapEvents.length)
    setImageReplyCount(filteredEvents.length);

  }, [events]);

  return { replyCount, zapAmount, imageReplyCount };
}

export function EventRow({ event }: { event: Event }) {
  const { replyCount, zapAmount, imageReplyCount } = useReplyCounts(event);
  const { subject, zapAddress, comment, file } = parseContent(event);
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
      <a href={`/thread/${event.id}`}><img alt="Invalid thread" loading="lazy" className="thumb" style={{ maxWidth: "150px", maxHeight: "150px" }} src={file} /></a>
      {zapAddress ? <div className="threadIcons">
        <a href="#" onClick={closePopout}><span>&#9889;</span></a>
      </div> : null}
      <div title="(R)eplies / (I)mage Replies" id="meta" className="meta">
        R: <b>{replyCount}</b> {imageReplyCount > 0 && <span>/ I: <b>{imageReplyCount}</b></span>}{zapAmount > 0 && <span> / &#9889;: <b>{zapAmount}</b></span>}
        <a href={`/thread/${event.id}`} className="postMenuBtn" title="Thread Menu">▶</a>
      </div>
      <div className="teaser">{subject && <b>{subject}:</b> } {comment}</div>
    </div>
    <Popout whichPopout={whichPopout} events={[event]} closePopout={closePopout}/>
  </>
  );
}