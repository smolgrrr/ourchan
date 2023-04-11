import { useNostrEvents } from "nostr-react";
import { useParams } from 'react-router-dom';
import ThreadHeader from "./ThreadHeader";
import OPPostContainer from "./OPPostContainer";
import ReplyContainer from "./ReplyContainer";
import ThreadFooter from "./ThreadFooter";
import { useState } from "react";
import Popout from "../PostForms/PopoutMain";
import { Event } from "nostr-tools";

const Thread = () => {
    const { id } = useParams();
    const [whichPopout, setWhichPopout] = useState('null');
    const [taglist, setTaglist] = useState<Event[]>([]);
  
    const openPopout = (whichPopout: string, event: Event) => {
        setWhichPopout(whichPopout);

        if (event) {
            setTaglist((prevTags) => [...prevTags, event]);
        }
    };

    const closePopout = () => {
        setWhichPopout('null');
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

    //preloader before event is found
    if (!OP_event) {
        return <ThreadHeader id={'null'} reply_pk={'null'} />;
    }
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
                        <OPPostContainer event={OP_event} openPopout={openPopout} />
                        {ByReplies.sort((a, b) => a.created_at - b.created_at).map((event) => <ReplyContainer openPopout={openPopout} event={event} key={event.id}/>)}
                    </div>
                </div>
                <ThreadFooter />
            </form>
            <Popout whichPopout={whichPopout} events={taglist} closePopout={closePopout}/>
        </div>
    );
};

export default Thread;