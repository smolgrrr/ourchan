// Main relays
export const relayUrls = [
    "wss://relay.snort.social",
    "wss://nos.lol",
    "wss://relay.damus.io",
    "wss://nostr.mutinywallet.com",
    "wss://nostr.frennet.xyz",
    "wss://nostr.libertasprimordium.com",
    "wss://relay.shitforce.one",
    "wss://relay.mostr.pub",
    "wss://relay.ourchan.org",
  ];

// Boards
// format is [boardlinkParam, boardPubkeyHash, boardNickname]
export const boards = [
  // ["test", "11feacea2cdd96a605a3d3d2e04d5284e6097ffde743fe0bae2b8f951e9cc0df", "test"],
  ["g", "90e71103a2735cc0d104299e18465bea84876d8dd558ff871e969615c50185c8", "General"],
  ["btc", "2cc73afdf0896c1739de0a2c5935b23fc59b00db58fff38d5da7b175822236a0", "bitcoin"],
];

// Blotter Messages
// format is [date, message, link]
export const BlotterMsgsText = [
  ["03/31/23", "First board added: ", "/g"],
  ["05/29/23", "First board with mods: ", "/btc"],
];

// Pinned posts
export const pinnedPosts = [
  ["g", "39170f7463ba96f8c5e6d063002cc5125334edaf2fdb21715eab1f43c1b6eb29"],
  ["pol", "136e9e853e2685d647fc232a0b0641d965f872896633a3b5ab9224755b81115d"],
  ["test", "66ac78df5b36fc75ea192d75c5ec5b1d472d16a05d180bd9b65d5f19d45ff90b"],
];


//Ads
export const ads = [
  ["https://powrelay.xyz/about.html", "https://i.imgur.com/v3xipT9.png"],
  ["", "https://i.imgur.com/j090mzd.png"],
];

//NonChan Boards
export const nonChanBoards = [
  ["mostr", "Mostr"],
];