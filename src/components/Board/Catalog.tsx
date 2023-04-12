import { useNostrEvents } from "nostr-react";
import { EventRow } from './EventRow';
import { boards } from "../../constants/Const";
import "./thread.css"
import { PinnedPosts } from "./PinnedPosts";
import { pinnedPosts } from "../../constants/Const";

interface CatalogBannerProps {
  currentboard: number;
}

const Catalog: React.FC<CatalogBannerProps> = ({ currentboard }) => {
  const board = boards[currentboard];
  const pinnedPostsBoard: string[] | undefined = pinnedPosts.find(pinnedPost => pinnedPost[0] === board[0]);

  const { events: Pinned } = useNostrEvents({
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

  return (
    <>
    <div id="ctrl-top" className="desktop">
    <hr /><input type="text" id="search-box" placeholder="Search OPs…" /> [<a href="/g">Catalog</a>]
    </div>
    <div id="content">
      <div id="threads" className="extended-small">
          {/* {events.sort((a, b) => a.created_at - b.created_at).map((event) => <EventRow event={event} />)} */}
          {Pinned.map((event) => <PinnedPosts event={event} />)}
          {events.map((event) => <EventRow event={event} />)}
      </div>
    </div>
    </>
  );
};

export default Catalog;