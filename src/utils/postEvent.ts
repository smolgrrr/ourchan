import { dateToUnix } from "nostr-react";
import {
  type Event as NostrEvent,
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from "nostr-tools";

export const handleThreadSubmit = async (board: string[], subject: string, comment: string, file: string, hasSubmittedPost: boolean) => {
  let message = comment + " " + file;

  if (!message) {
    alert("no message provided");
    return;
  }

  if (hasSubmittedPost) {
    alert('You have already submitted a post.');
    return;
  }

  const newEvent: NostrEvent = {
    id: 'null',
    content: message,
    kind: 1,
    tags: [
        ["p", board[1]],
        ["subject", subject],
    ],
    created_at: dateToUnix(),
    pubkey: 'null',
    sig: 'null',
  };

  let sk = generatePrivateKey();

  newEvent.pubkey = getPublicKey(sk);
  newEvent.id = getEventHash(newEvent);
  newEvent.sig = signEvent(newEvent, sk);

  return newEvent
};

export const handleReplySubmit = async (ids: string[], reply_pk: string, comment: string, file: string, hasSubmittedPost: boolean) => {
    let message = comment + " " + file;
  
    if (!message) {
      alert("no message provided");
      return;
    }
  
    if (hasSubmittedPost) {
      alert('You have already submitted a post.');
      return;
    }
  
    const tags = [["e", ids[0], "root"]];
    for (let i = 1; i < ids.length; i++) {
        tags.push(["e", ids[i]]);
    }
    tags.push(["p", reply_pk]);

    const newEvent: NostrEvent = {
      id: 'null',
      content: message,
      kind: 1,
      tags,
      created_at: dateToUnix(),
      pubkey: 'null',
      sig: 'null',
    };
  
    let sk = generatePrivateKey();
  
    newEvent.pubkey = getPublicKey(sk);
    newEvent.id = getEventHash(newEvent);
    newEvent.sig = signEvent(newEvent, sk);
  
    return newEvent
  };
