import { useNostrEvents, useProfile } from "nostr-react";
import { useParams } from 'react-router-dom';
import { parseContent } from '../../utils/parseContent';
import ThreadHeader from "./ThreadHeader";
import OPPostContainer from "./OPPostContainer";
import ReplyContainer from "./ReplyContainer";
import ThreadFooter from "./ThreadFooter";
import React, { useState } from "react";
import NewWindow from 'react-new-window'
import Popout from "../PostForms/ReplyPopout";

interface Event {
    id: string;
    content: string;
    created_at: number;
    pubkey: string;
  }

const Thread = () => {
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
  
    const openPopout = (event: Event) => {
        setVisible(true);
        setTags((prevTags) => [...prevTags, event.id]);
      };

   const closePopout = () => {
    setVisible(false);
  };

    const { events: ByOP } = useNostrEvents({
        filter: {
            ids: [id!],
            limit: 1,
        },
    });
    const { events: ByReplies } = useNostrEvents({
        filter: {
            '#e': [id!],
            kinds: [1],
        },
    });

    const OP_event = ByOP[0];
    if (!OP_event) {
        return <ThreadHeader id={'null'} reply_pk={'null'} />;
    }

    const { subject, comment, file } = parseContent(OP_event.content);

    return (
        <div>
            <ThreadHeader id={OP_event.id} reply_pk={OP_event.pubkey} />
            <hr className="aboveMidAd" />
            <hr className="desktop" id="op" />
            <div className="navLinks desktop">
                [<a href="#bottom">Bottom</a>]
                <span />
            </div>
            <hr />
            <form name="delform" id="delform" method="post">
                <div className="board">
                    <div className="thread" style={{width: '100%'}}>
                        <OPPostContainer event={OP_event} file={file} subject={subject} comment={comment} />
                        {ByReplies.sort((a, b) => a.created_at - b.created_at).map((event) => <ReplyContainer visible={visible} openPopout={() => openPopout(event)} event={event} key={event.id}/>)}
                        <Popout OP_event={OP_event} tags={tags} visible={visible} closePopout={closePopout}/>
                    </div>
                </div>
                <ThreadFooter />
            </form>
        </div>

    );
};

export default Thread;