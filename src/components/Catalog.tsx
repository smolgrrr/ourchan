import { useNostrEvents, dateToUnix } from "nostr-react";
import { EventRow } from './EventRow';
import "../thread.css"

const Catalog = () => {
  const { events } = useNostrEvents({
    filter: {
       kinds: [1],
      '#p': [
        'fc79f7f5306b6cfe949ac5bafffafe9bb9c60c2afd6dd5789297d7151e2506e3'
        ],
      limit: 75,    
    },
  });

  return (
    <div id="content">
      <div id="threads" className="extended-small">
          {events.sort((a, b) => a.created_at - b.created_at).map((event) => <EventRow event={event} />)}
      </div>
    </div>
  );
};

export default Catalog;