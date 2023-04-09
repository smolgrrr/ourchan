import { bech32 } from "@scure/base";
import { nip57, nip19, utils } from "nostr-tools";
import { useNostrEvents } from "nostr-react";
import { relayUrls } from '../constants/Const';
// import { Event } from "../types/types";
import {
    Event,
    generatePrivateKey,
    getEventHash,
    getPublicKey,
    finishEvent,
    signEvent,
  } from "nostr-tools";


// based on https://github.com/nbd-wtf/nostr-tools/blob/master/nip57.ts
export async function zap(zapAddress: string, metadata: Event, event: Event) {
    let amount = 100 * 1000;
    const hexZapAddress = nip19.decode(zapAddress).data;
    const endpoint = await nip57.getZapEndpoint(metadata)

    if (!endpoint) {
        return 'No zap endpoint found';
    }
    const privateKey = generatePrivateKey()
    const publicKey = getPublicKey(privateKey)

    const zapRequest = finishEvent(
      {
        kind: 9734,
        created_at: Date.now() / 1000,
        content: '',
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