import EventRow from './EventRow';
import "./thread.css"
// import { PinnedPosts } from "./PinnedPosts";
// import { pinnedPosts } from "../../constants/Const";
import { useEffect, useState } from "react";
import { uniqBy } from "../../utils/otherUtils"; // Assume getPow is a correct import now
import { subGlobalFeed } from "../../utils/subscriptions";
import { verifyPow } from "../../utils/mine";
import { Event } from "nostr-tools";
import { parseContent } from '../../utils/content';

const DEFAULT_DIFFICULTY = 20;

const useUniqEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const onEvent = (event: Event) => setEvents((prevEvents) => [...prevEvents, event]);
    const unsubscribe = subGlobalFeed(onEvent);

    return unsubscribe;
  }, []);

  return uniqBy(events, "id");
};

const Catalog: React.FC = () => {
  const filterDifficulty = localStorage.getItem("filterDifficulty") || DEFAULT_DIFFICULTY;
  const uniqEvents = useUniqEvents();

  const postEvents = uniqEvents
    .filter((event) =>
      verifyPow(event) >= Number(filterDifficulty) &&
      event.kind === 1 &&
      !event.tags.some((tag) => tag[0] === "e") &&
      parseContent(event).file
    )

  const sortedEvents = [...postEvents].sort((a, b) => b.created_at - a.created_at);

  const countReplies = (event: Event) => {
    return uniqEvents.filter((e) => e.tags.some((tag) => tag[0] === "e" && tag[1] === event.id)).length;
  };

  return (
    <>
    <div id="ctrl-top" className="desktop">
    <hr />
    </div>
    <div id="content">
      <div id="threads" className="extended-small">
          {sortedEvents.map((event) => <EventRow key={event.id} event={event} replyCount={countReplies(event)}/>)}
      </div>
    </div>
    </>
  );
};

export default Catalog;
