import { useNostrEvents, useProfile } from "nostr-react";
import "../thread.css"

interface Event {
  id: string;
  content: string;
  created_at: number;
  pubkey: string;
}

function parseContent(content: string) {
  const lines = content.split('\n');
  const data: { [key: string]: string } = {};
  lines.forEach((line) => {
    const [key, value] = line.split(': ');
    data[key.toLowerCase()] = value;
  });
  return {
    subject: data.subject,
    comment: data.comment,
    file: data.file,
  };
}

function EventRow({ event }: { event: Event }) {
  const { subject, comment, file } = parseContent(event.content);

  return (
    <div className="thread">
        <a href={`/g/thread/${event.id}`}><img loading="lazy" className="thumb" style={{ maxWidth: "150px", maxHeight: "150px" }} src={file}/></a>
        <div title="(R)eplies / (I)mage Replies" id="meta-421725997" className="meta">
          <i>R: <b>326</b></i> / I: <b>77</b><a href="#" className="postMenuBtn" title="Thread Menu" data-post-menu={421725997}>▶</a>
        </div>
        <div className="teaser"><b>{subject}</b> {comment}</div>
    </div>
  );
}

const Catalog = () => {
  const { events } = useNostrEvents({
    filter: {
      since: 0,
       kinds: [1],
      '#p': [
        'e1d31f34e0b95e2a078f15cc81d7218bab75b6be794b7976ba6aeb654df88005'
        ],    
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