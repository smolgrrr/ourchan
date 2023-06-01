import { useNostrEvents } from "nostr-react";
import EventRow from './EventRow';
import { boards } from "../../constants/Const";
import "./thread.css"
import { PinnedPosts } from "./PinnedPosts";
import { pinnedPosts } from "../../constants/Const";

interface CatalogBannerProps {
  currentboard: number;
}

const useNostrEventsForBoard = (currentboard: number) => {
  const board = boards[currentboard];
  const pinnedPostsBoard: string[] | undefined = pinnedPosts.find(pinnedPost => pinnedPost[0] === board[0]);

  const { events: pinnedEvents } = useNostrEvents({
    filter: {
      ids: pinnedPostsBoard ? [pinnedPostsBoard[1]] : [],
    },
  });

  const { events } = useNostrEvents({
    filter: {
       kinds: [1],
      '#p': [board[1]],
      limit: 100,
    },
  });
  // Filter events where event.tags > 1
  const filteredEvents = events.filter(event => !event.tags.some(tag => tag[0] === "e"));

  return { pinnedEvents, events: filteredEvents };
};

const Catalog: React.FC<CatalogBannerProps> = ({ currentboard }) => {
  const { pinnedEvents, events } = useNostrEventsForBoard(currentboard);

  return (
    <>
    <div id="ctrl-top" className="desktop">
    <hr />
    </div>
    <div id="content">
      <div id="threads" className="extended-small">
          {pinnedEvents.map((event) => <PinnedPosts key={event.id} event={event} />)}
          {events.map((event) => <EventRow key={event.id} event={event} />)}
      </div>
    </div>
    </>
  );
};

export default Catalog;
