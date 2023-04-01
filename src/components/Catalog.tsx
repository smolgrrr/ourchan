import { useNostrEvents, dateToUnix } from "nostr-react";
import { EventRow } from './EventRow';
import "../thread.css"

const Catalog = () => {
  const { events } = useNostrEvents({
    filter: {
       kinds: [1],
      '#p': [
        '2e8e04b3b46c8ebea7a4622d014a2fde48cc08840ff1ecdfc46f3973b6595b09'
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