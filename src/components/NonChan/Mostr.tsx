import { Event } from "nostr-tools";
import EventRow from './EventRow';
import "../Board/thread.css"
import {
    relayInit,
  } from 'nostr-tools'
import { useState, useEffect } from "react";

const relays = [
    "wss://relay.mostr.pub",
];

const relay = relayInit(relays[0])

function containsMedia(content: string){
    const regex = /(https?:\/\/\S+\.(?:jpg|png|jpeg|gif))/i;
    const match = content.match(regex);
    if (match) {
      return true;
       
    } else {
      return false ;
    }
  }

async function mostrEvents() {
    await relay.connect()
    let events = await relay.list([{kinds: [1], limit: 100}])

    events = events.filter((event: Event) => {
        if (event.content) {
            return containsMedia(event.content)
        }
        return false
    })

    // events = events.filter((event: Event) => {
    //     if (event.tags[0].includes("#p")) {
    //         return false
    //     }
    //     return true
    // })

    return events;
};

const Mostr = () =>  {
    const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function fetchEvents() {
      const events = await mostrEvents();
      setEvents(events);
    }
    fetchEvents();
  }, []);

    return (
        <>
            <div id="ctrl-top" className="desktop">
                <hr /><input type="text" id="search-box" placeholder="Search OPs…" /> [<a href="/g">Catalog</a>]
            </div>
            <div id="content">
                <div id="threads" className="extended-small">
                    {events.map((event: Event) => <EventRow key={event.id} event={event} />)}
                </div>
            </div>
        </>
    );
};

export default Mostr;
