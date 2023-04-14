import { useNostrEvents } from "nostr-react";
import { parseContent } from "../../utils/parseContent";
import { useState, useEffect } from "react";
import "../Board/thread.css"
import { Event } from "nostr-tools";
import * as bolt11 from "bolt11";
import Popout from "../PostForms/PopoutMain";

export function useReplyCounts(event: Event) {
  const { events } = useNostrEvents({
    filter: {
      kinds: [1],
      '#e': [event.id],
      limit: 100,
    },
  });
  const [replyCount, setReplyCount] = useState(0);
  const [imageReplyCount, setImageReplyCount] = useState(0);

  useEffect(() => {
    const filteredEvents = events.filter(
      (event) => parseContent(event).file !== ''
    );

    setReplyCount(events.length)
    setImageReplyCount(filteredEvents.length);

  }, [events]);

  return { replyCount, imageReplyCount };
}

type EventRowProps = {
  event: Event;
};

const EventRow = ({ event }: EventRowProps) =>  {
  const { replyCount, imageReplyCount } = useReplyCounts(event);
  const { subject, comment, file } = parseContent(event);

  return (
  <>
    <div className="thread">
      <a href={`/thread/${event.id}`}><img alt="Invalid thread" loading="lazy" className="thumb" style={{ maxWidth: "150px", maxHeight: "150px" }} src={file} /></a>
      <div title="(R)eplies / (I)mage Replies" id="meta" className="meta">
        R: <b>{replyCount}</b> {imageReplyCount > 0 && <span>/ I: <b>{imageReplyCount}</b></span>}
        <a href={`/thread/${event.id}`} className="postMenuBtn" title="Thread Menu">▶</a>
      </div>
      <div className="teaser">{subject && <b>{subject}:</b> } {comment}</div>
    </div>
  </>
  );
}

export default EventRow;