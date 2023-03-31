# Filesharing App Work-In-Progress (Pls Help!)
Inspired by Fiatjaf's bounty [here](https://bountsr.org/p2p-filesharing/), and a belief that torrent-based filesharing could be better serviced by a 'The Pirate Bay'-like Nostr client that remains censorship-resistant, and resilient.

The aim is to build a simple filesharing app using a combination of Nostr and WebTorrent/BitTorrent.\
By being open-source, ideally when one client gets shutdown another can startup without any loss to the ecosystem.



One main feature of the app is the ability to request/offer files, which can be resolved with a satoshi-denominated prize.
As an example, an “offer” is composed of the file link and a short description of the files, in some standard plaintext format, like

`title: Autobiography, Charles Dickens`\
`description: A very cool book I wrote`\
`location: magnet:...`\
which will be broadcasted as a kind:1 event, with a "t" tag (offer/request), as well as a "p" tag of the filesharing client's designated nostr pubkey (initially). Currently, there is no spec for how to appropriately enforce pay-to-access for offered files, and initially it will rely on an honour/repuation system.

## Further work
I personally expect to use this system to improve my other project [lightning.movie](https://www.lightning.movie/), in which I would like to offer some way for people to add movies/shows to the site as a torrent which could be paid for by users with a satoshi-based fee.

<br/><br/>
## Run locally

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
