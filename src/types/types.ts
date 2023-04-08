export interface Event {
    id: string;
    content: string;
    created_at: number;
    tags: string[][];
    pubkey: string;
  }