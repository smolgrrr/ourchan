import { useNostrEvents, dateToUnix } from "nostr-react";
import { EventRow } from './EventRow';
import "../thread.css"

const Catalog = () => {
  const { events } = useNostrEvents({
    filter: {
       kinds: [1],
      '#p': [
        '2a65000478d8d7fb6c6902c5b4f33506def7c1c2d4dd6e952b056dd70d8293d4'
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