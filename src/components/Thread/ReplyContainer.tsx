import { parseContent } from "../../utils/parseContent";
import { unixToDate } from "../../utils/utils";
import { Event } from "../../types/types";
import { useNostrEvents } from "nostr-react";
import QuotePreview from "./QuotePreview";
import { useState } from "react";
import Backlinks from "./Backlinks";
import BlockQuote from "./BlockQuote";

interface ReplyContainerProps {
  event: Event;
  visible: boolean;
  openPopout: () => void;
}

const ReplyContainer = ({ event, openPopout }: ReplyContainerProps) => {
  const { file, comment } = parseContent(event);
  const postDate = unixToDate(event.created_at);
  const [clicked, setClicked] = useState(false);

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
              {postDate}
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
            <input type="checkbox" defaultValue="delete" />{" "}
            <span className="nameBlock">
              <span className="name">Anonymous</span>
            </span>
            <span className="dateTime" data-utc={event.created_at}>
              {postDate}
            </span>{" "}
            <span className="postNum desktop">
              <a title="Link to this post">
                Post:
              </a>
              <a onClick={openPopout} title="Reply to this post">
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
            <Backlinks event={event}/>
          </div>
          {file !== "" && (
            <div className="file">
              <div className="fileText">
                File:{" "}
                <a href={file}>
                  {file && file.substring(file.length - 21)}
                </a>
              </div>
              <a className="fileThumb">
                <img
                  src={file}
                  style={{ maxHeight: clicked ? "none" : "95px", maxWidth: clicked ? "none" : "125px" }}
                  loading="lazy"
                  onClick={toggleClick}
                /> 
              </a>
            </div>
          )}
              <BlockQuote content={comment} />
        </div>
      </div>
    </>
  );
};

export default ReplyContainer;
