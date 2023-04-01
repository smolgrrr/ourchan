import { useNostrEvents, dateToUnix } from "nostr-react";
import { EventRow } from './EventRow';
import "../thread.css"

const Catalog = () => {
  const { events } = useNostrEvents({
    filter: {
       kinds: [1],
      '#p': [
        'ca73ee0889b8e9582368d28fd63d51f1d6adeb10b6a961da99ed90194adb571b'
        ],
      limit: 75,    
    },
  });

  return (
    <div id="content">
      <div id="threads" className="extended-small">
          {events.map((event) => <EventRow event={event} />)}
      </div>
    </div>
  );
};

export default Catalog;