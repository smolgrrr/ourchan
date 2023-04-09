import { useState } from "react";
import { Event } from "../../types/types";
import { useNostrEvents } from "nostr-react";
import QuotePreview from "./QuotePreview";

interface BacklinksProps {
  event: Event;
}

const Backlinks = ({ event }: BacklinksProps) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewEventId, setPreviewEventId] = useState("");

  const previewOpenPopout = (eventId: string) => {
    setPreviewVisible(true);
    setPreviewEventId(eventId);
  };

  const previewClosePopout = () => {
    setPreviewVisible(false);
    setPreviewEventId("");
  };

  const { events } = useNostrEvents({
    filter: {
      kinds: [1],
      "#e": [event.id],
    },
  });

  return (
    <div className="backlink">
      {events.map((event) => {
        const key = `backlink-${event.id}`;
        return (
          <span key={key}>
            <a
              href={`#${event.id}`}
              className="quotelink"
              onMouseEnter={() => previewOpenPopout(event.id)}
              onMouseLeave={previewClosePopout}
            >
              &gt;&gt;..{event.id.substring(event.id.length - 10)}
            </a>
            {previewEventId === event.id && (
              <QuotePreview event={event} previewVisible={previewVisible} />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Backlinks;