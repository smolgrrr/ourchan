import { useNostrEvents, useProfile } from "nostr-react";
import { useParams } from 'react-router-dom';
import { parseContent } from '../../utils/parseContent';
import ThreadHeader from "./ThreadHeader";
import OPPostContainer from "./OPPostContainer";
import ReplyContainer from "./ReplyContainer";
import ThreadFooter from "./ThreadFooter";

const Thread = () => {
    const { id } = useParams();

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
                    <div className="thread" id="t421762085">
                        <OPPostContainer event={OP_event} file={file} subject={subject} comment={comment} />
                        {ByReplies.sort((a, b) => a.created_at - b.created_at).map((event) => <ReplyContainer event={event} />)}
                    </div>
                </div>
                <ThreadFooter />
            </form>
        </div>

    );
};

export default Thread;