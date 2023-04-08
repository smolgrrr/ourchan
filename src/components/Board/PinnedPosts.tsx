import { parseContent } from "../../utils/parseContent";
import { useState } from "react";
import "./thread.css"
import { Event } from "../../types/types";


  // export function useReplyCounts(event: Event) {
  //   const { events } = useNostrEvents({
  //     filter: {
  //       kinds: [1],
  //       '#e': [event.id],
  //       limit: 75,    
  //     },
  //   });
  //   const [replyCount, setReplyCount] = useState(events.length);
  //   const [imageReplyCount, setImageReplyCount] = useState(0);
  
  //   useEffect(() => {
  //     setReplyCount(events.length)
  //     const filteredEvents = events.filter(
  //       (event) => parseContent(event.content).file !== ''
  //     );
  //     setImageReplyCount(filteredEvents.length);
  //   }, [events]);
  
  //   return { replyCount, imageReplyCount };
  // }

export function PinnedPosts({ event }: { event: Event }) {
  const [replyCount, setReplyCount] = useState(0);
  const [imageReplyCount, setImageReplyCount] = useState(0);
  const { subject, comment, file } = parseContent(event);
  
    return (
      <div className="thread">
        <a href={`/thread/${event.id}`}><img loading="lazy" className="thumb" style={{ maxWidth: "150px", maxHeight: "150px" }} src={file} /></a>
        <div className="threadIcons">
          <img title="Sticky" className="threadIcon stickyIcon" src="/sticky.gif"/>
        </div>
        <div title="(R)eplies / (I)mage Replies" id="meta" className="meta">
          R: <b>{replyCount}</b> {imageReplyCount > 0 && <span>/ I: <b>{imageReplyCount}</b></span>}
          <a href={`/thread/${event.id}`} className="postMenuBtn" title="Thread Menu">▶</a>
        </div>
        <div className="teaser">{subject && <b>{subject}:</b> } {comment}</div>
      </div>
    );
  }
