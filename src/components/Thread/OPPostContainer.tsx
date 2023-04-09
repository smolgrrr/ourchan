import { unixToDate } from "../../utils/utils";
import { parseContent } from "../../utils/parseContent";
import { zap } from "../../utils/Zaps";
import { useState, useEffect } from "react";
import { useNostrEvents } from "nostr-react";
import { Event, nip57, nip19, utils } from "nostr-tools";
import * as bolt11 from "bolt11";

interface OPPostContainerProps {
    event: Event;
}

const OPPostContainer = ({ event}: OPPostContainerProps) => {
    const { subject, comment, zapAddress, file } = parseContent(event);
    const [invoice, setInvoice] = useState('nup');

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

    const zapButton = () => {
        if (zapAddress) {
            zap(zapAddress, events[0], event).then(result => {
              setInvoice(result);
            }).catch(error => {
    
            });
          }
    };
    
    return (
        <div className="postContainer opContainer">
            <div id="p421762085" className="post op">
                <div className="postInfoM mobile"> <span className="nameBlock"><span className="name">Anonymous</span> <br /><span className="subject"></span> </span><span className="dateTime postNum" data-utc={1680267945}>03/31/23(Fri)09:05:45 <a title="Link to this post">Post:</a><a href={`/thread/${event.id}`} title="Reply to this post">..{event.id.substring(event.id.length - 10)}</a></span></div>
                <div className="file" id="f421762085">
                    <div className="fileText">File: <a href={file} target="_blank">{file.substring(file.length - 21)}</a></div>
                    <a className="fileThumb" href={file} target="_blank">
                        <img src={file} alt="377 KB" data-md5="TaFWJ19lIH43I954gO55gA==" style={{ maxHeight: '250px', maxWidth: '236px' }} loading="lazy" />
                    </a>
                </div>
                <div className="postInfo desktop" id="pi421762085">
                    <a href="#" onClick={zapButton}><span>&#9889;</span></a> <span className="subject">{subject}</span> <span className="nameBlock"><span className="name">Anonymous</span> </span><span className="dateTime" data-utc={event.created_at}>{unixToDate(event.created_at)}</span> <span className="postNum desktop"><a title="Link to this post">Post:</a><a href={`/thread/${event.id}`} title="Reply to this post">..{event.id.substring(event.id.length - 10)}</a></span><a href="#" className="postMenuBtn" title="Post menu" style={{display: 'inline-block'}} data-cmd="post-menu">▶</a>
                </div>
                <blockquote className="postMessage" id="m421766820">{comment}</blockquote>
                {Zaps.map((Zap) => {
                const decoded = bolt11.decode(Zap.tags[1][1]);
                return (
                    <span>{decoded.satoshis}</span>
                );
                })}

            </div>
        </div>
    );
};

export default OPPostContainer;
