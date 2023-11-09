import { useParams } from 'react-router-dom';
import ThreadHeader from "./ThreadHeader";
import OPPostContainer from "./OPPostContainer";
import ReplyContainer from "./ReplyContainer";
import ThreadFooter from "./ThreadFooter";
import { useState } from "react";
import { Event, nip19 } from "nostr-tools";
import { subNote, subNotesOnce } from '../../utils/subscriptions';
import { useEffect } from 'react';
import { uniqBy } from '../../utils/otherUtils';
import { getPow } from '../../utils/mine';

type PostType = "" | "Reply" | "Quote" | undefined;

const Thread = () => {
    const { id } = useParams();
    const [events, setEvents] = useState<Event[]>([]); // Initialize state
    const [OPEvent, setOPEvent] = useState<Event>()
    const [hasRun, setHasRun] = useState(false);
    const [preOPEvents, setPreOPEvents] = useState(['']);
    const [sortByTime, setSortByTime] = useState(true);
    const filterDifficulty = useState(localStorage.getItem("filterDifficulty") || "20");

    // Define your callback function for subGlobalFeed
    const onEvent = (event: Event, relay: string) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    useEffect(() => {
        setHasRun(false)
        subNote(id as string, onEvent);

        return () => {
            // Your cleanup code here
        };
    }, [id]);  // Empty dependency array means this useEffect runs once when the component mounts

    const uniqEvents = events.length > 0 ? uniqBy(events, "id") : [];

    useEffect(() => {
        if (!hasRun && events.length > 0) {
            let OPEvent = uniqEvents[0];
            setOPEvent(OPEvent);
            
            if (OPEvent && OPEvent.id !== id) {
            OPEvent = events.find(e => e.id === id) as Event;
            }

            if (OPEvent) {
            setOPEvent(OPEvent);
            let OPNoteEvents = OPEvent.tags.filter(tag => tag[0] === 'e').map(tag => tag[1]);
            setHasRun(true);
            setPreOPEvents(OPNoteEvents)
            subNotesOnce(OPNoteEvents, onEvent)
            }
        }
    }, [uniqEvents, hasRun]);

    const getMetadataEvent = (event: Event) => {
        const metadataEvent = uniqEvents.find(e => e.pubkey === event.pubkey && e.kind === 0);
        if (metadataEvent) {
            return metadataEvent;
        }
        return null;
    }

    const countReplies = (event: Event) => {
        return uniqEvents.filter(e => e.tags.some(tag => tag[0] === 'e' && tag[1] === event.id)).length;
    }

    const repliedList = (event: Event): Event[] => {
        return uniqEvents.filter(e => event.tags.some(tag => tag[0] === 'p' && tag[1] === e.pubkey));
    }

    const earlierEvents = uniqEvents
        .filter(event =>
            event.kind === 1 &&
            preOPEvents.includes(event.id)
        )
        .sort((a, b) => (b.created_at as any) - (a.created_at as any));

    const toggleSort = () => {
        setSortByTime(prev => !prev);
    };

    const eventsSortedByTime = [...uniqEvents].slice(1).filter(event => event.kind === 1).sort((a, b) => a.created_at - b.created_at);

    // Events sorted by PoW (assuming `getPow` returns a numerical representation of the PoW)
    const eventsSortedByPow = [...uniqEvents].slice(1)
        .filter((event) =>
            getPow(event.id) > Number(filterDifficulty) &&
            event.kind === 1
        ).sort((a, b) => getPow(b.id) - getPow(a.id));

    const displayedEvents = sortByTime ? eventsSortedByTime : eventsSortedByPow;

    //preloader before event is found
    if (!uniqEvents[0]) {
        return <ThreadHeader id={'null'} reply_pk={'null'} />;
    }
    return (
        <div>
            <ThreadHeader id={uniqEvents[0].id} reply_pk={uniqEvents[0].pubkey} />
            <hr className="aboveMidAd" />
            <hr className="desktop" id="op" />
            <form name="delform" id="delform" method="post">
                <div className="board">
                    <div className="thread" style={{width: '100%'}}>
                        <OPPostContainer event={uniqEvents[0]} />
                        {displayedEvents.sort((a, b) => a.created_at - b.created_at).map((event) => <ReplyContainer event={event} key={event.id}/>)}
                    </div>
                </div>
                <ThreadFooter />
            </form>
        </div>
    );
};

export default Thread;