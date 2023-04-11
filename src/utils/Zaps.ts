import { relayUrls } from '../constants/Const';
import {
    nip57,
    nip19,
    Event,
    generatePrivateKey,
    finishEvent,
  } from "nostr-tools";


// based on https://github.com/nbd-wtf/nostr-tools/blob/master/nip57.ts
export async function createZap(zapAddress: string, amount: number, comment: string, metadata: Event, event: Event) {
    const hexZapAddress = nip19.decode(zapAddress).data;
    const endpoint = await nip57.getZapEndpoint(metadata)

    if (!endpoint) {
        return 'No zap endpoint found';
    }
    const privateKey = generatePrivateKey()

    const zapRequest = finishEvent(
      {
        kind: 9734,
        created_at: Date.now() / 1000,
        content: comment,
        tags: [
          ['p', hexZapAddress as string],
          ["e", event.id],
          ['amount', amount.toString()],
          ["relays", ...relayUrls],
        ]
      },
      privateKey
    )

    let valid = nip57.validateZapRequest(JSON.stringify(zapRequest))
    if (valid !== null) {
        return 'nup didnt work';
    }

    const response = await fetch(`${endpoint}?` + new URLSearchParams({
            amount: amount.toString(),
            nostr: JSON.stringify(zapRequest),
        })
    );
    const body = await response.json();
    if (body.error) {
        return body.error;
    }

    return body.pr;
}