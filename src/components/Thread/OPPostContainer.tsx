import { unixToDate } from "../../utils/utils";
import { parseContent } from "../../utils/parseContent";
import { createZap } from "../../utils/Zaps";
import { useState, useEffect } from "react";
import { useNostrEvents } from "nostr-react";
import { Event, nip57, nip19, utils } from "nostr-tools";
import * as bolt11 from "bolt11";
import BlockQuote from "./BlockQuote";

interface OPPostContainerProps {
    event: Event;
    openPopout: (whichPopout: string, event: Event) => void;
}

const OPPostContainer = ({ event , openPopout}: OPPostContainerProps) => {
    const { subject, comment, zapAddress, file } = parseContent(event);
    const [zapAmount, setZapAmount] = useState(0);

    event.kind = 1;

    const { events } = useNostrEvents({
    filter: {
        kinds: [0],
        authors: ['8f44c56131b362668b0e01be8c71b24786598bb68fb909cfd78fabfb058dd0f0'],
        },
    });


    const { events: Zaps } = useNostrEvents({
        filter: {
            kinds: [9735],
            '#e': [event.id],
        },
    });   

    const zapAddressExists: boolean = event.tags.find(tag => tag[0] === 'zapAddress') !== undefined;
    useEffect(() => {
        const amount = Zaps.reduce((acc, event) => {
          let zapped = event.tags[1][1];
          const amount = bolt11.decode(zapped)?.satoshis;
          return acc + (amount as number);
        }
        , 0);
        setZapAmount(amount);
    
      }, [Zaps]);
    
      const renderMedia = () => {
    if (file && (file.endsWith(".mp4") || file.endsWith(".webm"))) {
      return (
        <video controls className="thumb" style={{ maxWidth: "150px", maxHeight: "150px" }}>
          <source src={file} type="video/mp4" />
        </video>
      );
    } else {
      return (
          <img alt="Invalid thread" loading="lazy" className="thumb" style={{ maxWidth: "150px", maxHeight: "150px" }} src={file} />
      );
    }
  };
  
    return (
        <div className="postContainer opContainer">
            <div id="p421762085" className="post op">
                <div className="postInfoM mobile"> <span className="nameBlock"><span className="name">Anonymous</span> <br /><span className="subject"></span> </span><span className="dateTime postNum" data-utc={1680267945}>03/31/23(Fri)09:05:45 <a title="Link to this post">Post:</a><a href={`/thread/${event.id}`} title="Reply to this post">..{event.id.substring(event.id.length - 10)}</a></span></div>
                <div className="file" id="f421762085">
                    <div className="fileText">File: <a href={file} target="_blank">{file.substring(file.length - 21)}</a></div>
                    <a className="fileThumb" href={file} target="_blank">
                      {renderMedia()}
                    </a>
                </div>
                <div className="postInfo desktop" id="pi421762085">
                    {zapAddressExists && <a href="#" onClick={() => openPopout('zap', event)}><span>&#9889;{zapAmount} </span></a> }
                    <span className="subject">{subject}</span> <span className="nameBlock"><span className="name">Anonymous</span> </span>
                    <span className="dateTime" data-utc={event.created_at}>{unixToDate(event.created_at)}</span> 
                    <span className="postNum desktop"><a title="Link to this post">Post:</a><a href="#" onClick={() => openPopout('reply', event)} title="Reply to this post">..{event.id.substring(event.id.length - 10)}</a></span>
                    <a href="#" className="postMenuBtn" title="Post menu" style={{display: 'inline-block'}} data-cmd="post-menu">▶</a>
                </div>
                <BlockQuote content={comment} />
            </div>
        </div>
    );
};

export default OPPostContainer;
