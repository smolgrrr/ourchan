import { useNostrEvents, dateToUnix } from "nostr-react";
import { parseContent } from '../utils/parseContent';
import { useState, useEffect } from "react";
import { relayUrls } from "../constants/Const";
import {SimplePool} from 'nostr-tools'
import "../thread.css"

interface Event {
    id: string;
    content: string;
    created_at: number;
    pubkey: string;
  }
  
export function EventRow({ event }: { event: Event }) {
    const { subject, comment, file } = parseContent(event.content);
    const [replyCount, setReplyCount] = useState(0);
    const [imageReplyCount, setImageReplyCount] = useState(0);

    const pool = new SimplePool()
    useEffect(() => {
      const fetchEvents = async () => {
        const events = await pool.list(relayUrls, [{ '#e': [event.id] }]);
        setReplyCount(events.length);
        const filteredEvents = events.filter(
          (event) => parseContent(event.content).file !== ''
        );
        setImageReplyCount(filteredEvents.length);
      };
      fetchEvents();
    }, [event.id]);
  
    return (
      <div className="thread">
        <a href={`/g/thread/${event.id}`}><img loading="lazy" className="thumb" style={{ maxWidth: "150px", maxHeight: "150px" }} src={file} /></a>
        <div title="(R)eplies / (I)mage Replies" id="meta" className="meta">
          R: <b>{replyCount}</b> {imageReplyCount > 0 && <span>/ I: <b>{imageReplyCount}</b></span>}
          <a href={`/g/thread/${event.id}`} className="postMenuBtn" title="Thread Menu">▶</a>
        </div>
        <div className="teaser">{subject && <b>{subject}:</b> } {comment}</div>
      </div>
    );
  }