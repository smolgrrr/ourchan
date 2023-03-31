import { useProfile } from "nostr-react";

export function NostrName(pubkey: string) {
    const { data: userData } = useProfile({ pubkey });
    return {
      name: userData?.name
    };
  }