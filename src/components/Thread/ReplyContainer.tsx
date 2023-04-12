import { parseContent } from "../../utils/parseContent";
import { unixToDate } from "../../utils/utils";
import { Event } from "nostr-tools";
import { useNostrEvents } from "nostr-react";
import QuotePreview from "./QuotePreview";
import { useState, useEffect } from "react";
import Backlinks from "./Backlinks";
import BlockQuote from "./BlockQuote";
import * as bolt11 from "bolt11";

interface ReplyContainerProps {
  event: Event;
  openPopout: (whichPopout: string, event: Event) => void;
}

const ReplyContainer = ({ event, openPopout }: ReplyContainerProps) => {
  const { file, comment } = parseContent(event);
  const postDate = unixToDate(event.created_at);
  const [clicked, setClicked] = useState(false);
  const [zapAmount, setZapAmount] = useState(0);

  const toggleClick = () => {
    setClicked(!clicked);
  };

  const zapAddressExists: boolean = event.tags.find(tag => tag[0] === 'zapAddress') !== undefined;
  const { events: Zaps } = useNostrEvents({
    filter: {
        kinds: [9735],
        '#e': [event.id],
    },
  });   


  useEffect(() => {
    // for (let i = 0; i < Zaps.length; i++) {
    //   const event = Zaps[i];
    //     let zapped = event.tags[1][1];
    //     const amount = bolt11.decode(zapped)?.satoshis;
    //     setZapAmount(amount as number);
    // }
    const amount = Zaps.reduce((acc, event) => {
      let zapped = event.tags[1][1];
      const amount = bolt11.decode(zapped)?.satoshis;
      return acc + (amount as number);
    }
    , 0);
    setZapAmount(amount);

  }, [Zaps]);

  return (
    <>
      <div id={event.id} className="postContainer replyContainer">
        <div className="sideArrows">&gt;&gt;</div>
        <div className="post reply">
          <div className="postInfoM mobile">
            {zapAddressExists && <a href="#" onClick={() => openPopout('zap', event)}><span>&#9889;{zapAmount} </span></a> }
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
            {zapAddressExists && <a href="#" onClick={() => openPopout('zap', event)}><span>&#9889;{zapAmount} </span></a> }
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
              <a onClick={() => openPopout('reply', event)} title="Reply to this post">
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
