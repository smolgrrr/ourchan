import { useNostrEvents, dateToUnix } from "nostr-react";
import { EventRow } from './EventRow';
import "../thread.css"

const Catalog = () => {
  const { events } = useNostrEvents({
    filter: {
       kinds: [1],
      '#p': [
        'bb2a6abc7b91f2ebcdd6d1b71a3a2b1f36a4d4960fda793694bc057408cac5c6'
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