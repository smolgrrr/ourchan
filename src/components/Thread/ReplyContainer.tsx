import { Event } from "nostr-tools";
import { useState, useEffect } from "react";
import BlockQuote from "./BlockQuote";
import { parseContent } from "../../utils/content";
import { renderMedia } from "../../utils/FileUpload";

interface ReplyContainerProps {
  event: Event;
  openPopout?: (whichPopout: string, event: Event) => void;
}

const timeUnits = [
  { unit: 'w', value: 60 * 60 * 24 * 7 },
  { unit: 'd', value: 60 * 60 * 24 },
  { unit: 'h', value: 60 * 60 },
  { unit: 'm', value: 60 },
];

const timeAgo = (unixTime: number) => {
  let seconds = Math.floor(new Date().getTime() / 1000 - unixTime);

  if (seconds < 60) return `now`;

  for (let unit of timeUnits) {
      if (seconds >= unit.value) {
          return `${Math.floor(seconds / unit.value)}${unit.unit}`;
      }
      seconds %= unit.value;
  }
};

const ReplyContainer = ({ event, openPopout }: ReplyContainerProps) => {
  const { file, comment } = parseContent(event);
  const [clicked, setClicked] = useState(false)

  const toggleClick = () => {
    setClicked(!clicked);
  };
  
  return (
    <>
      <div id={event.id} className="postContainer replyContainer">
        <div className="sideArrows">&gt;&gt;</div>
        <div className="post reply">
          <div className="postInfoM mobile">
            <span className="nameBlock">
              <span className="name">Anonymous</span>{" "}
            </span>
            <span className="dateTime postNum">
              {timeAgo(event.created_at)}
              <a title="Link to this post">
                Post:
              </a>
              <a
                href=""
                title="Reply to this post"
              >
                ..{event.id.substring(event.id.length - 10)}
              </a>
            </span>
          </div>
          <div className="postInfo desktop">
            <span className="nameBlock">
              <span className="name">Anonymous</span>
            </span>
            <span className="dateTime" data-utc={event.created_at}>
            {timeAgo(event.created_at)}
            </span>{" "}
            <span className="postNum desktop">
              <a title="Link to this post">
                Post:
              </a>
              <a title="Reply to this post">
                ..{event.id.substring(event.id.length - 10)}
              </a>
            </span>
            <a
              href="#"
              className="postMenuBtn"
              title="Post menu"
              style={{ display: "inline-block" }}
              data-cmd="post-menu"
            >
              ▶
            </a>
          </div>
            {renderMedia(file)}
          <BlockQuote content={comment} />
        </div>
      </div>
    </>
  );
};

export default ReplyContainer;
