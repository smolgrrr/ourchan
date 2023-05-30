const Home = () => {

  return (
    <div>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="imageboard,image board,forum,bbs,anonymous,chan,anime,manga,ecchi,hentai,video games,english,japan" />
      <meta name="description" content="ourChan is a simple image-based bulletin board where anyone can post comments and share images anonymously." />
      <meta name="robots" content="noarchive" />
      <title>ourChan</title><link rel="stylesheet" type="text/css" href="//s.4cdn.org/css/frontpage.12.css" />
      <link rel="shortcut icon" href="//s.4cdn.org/image/favicon.ico" />
      <link rel="apple-touch-icon" href="//s.4cdn.org/image/apple-touch-icon-iphone.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="//s.4cdn.org/image/apple-touch-icon-ipad.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="//s.4cdn.org/image/apple-touch-icon-iphone-retina.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="//s.4cdn.org/image/apple-touch-icon-ipad-retina.png" />
      <div id="doc">
        <div id="hd">
          <div id="logo-fp">
            <a href="/" title="Home"><img alt="ourChan" src="/logo.png" width={300} height={120} /></a>
          </div>
        </div>
        <div id="bd">
          <div className="box-outer" id="announce">
            <div className="box-inner">
              <div className="boxbar">
                <h2>What is ourChan?</h2>
                <a data-cmd="x-wot" href="#" className="closebutton" />
              </div>
              <div className="boxcontent">
                <div id="wot-cnt">
                  <p>ourChan is a simple, anonymous, image-based bulletin board where anyone can post comments and share images. There will be boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music, and photography. Users do not need to register an account. Feel free to click on a board below that interests you and jump right in!</p><br />
                  <p>We're different from 4chan because we won't use jannies and we're censorship resistant</p>
                  <p>Please host your own instance of ourChan from <a href="https://github.com/smolgrrr/ourchan">(here)</a> and read about NOSTR <a href="https://github.com/nostr-protocol/nostr">here</a></p>
                </div> 
              </div>
            </div>
          </div>
          <div className="box-outer top-box" id="boards">
            <div className="box-inner">
              <div className="boxbar">
                <h2>Boards</h2>
                <div id="filter-btn" data-cmd="filter">filter ▼</div>
              </div>
              <div className="boxcontent">
                <div className="column">
                  <h3 style={{ textDecoration: 'underline', display: 'inline' }}>Other</h3>
                  <ul>
                    <li><a href="/g" className="boardlink">General</a></li>
                  </ul>
                  <ul>
                    <li><a href="/f" className="boardlink">Free</a></li>
                  </ul>
                </div>
                <div className="column">
                  <h3 style={{ textDecoration: 'underline', display: 'inline' }}>NonChan feeds</h3>
                  <ul>
                    <li><a href="/mostr" className="boardlink">Mostr relay</a></li>
                  </ul>
                </div>
                <br className="clear-bug" />
              </div>
            </div>
          </div>
          <div className="box-outer top-box" id="popular-threads">
            <div className="box-inner">
              <div className="boxbar">
                <h2>A Cypherpunk Manifesto</h2>
                <div id="opts-btn" data-cmd="opts">by Eric Hughes</div>
              </div>
              <div className="boxcontent">
                <p>
                  Privacy is necessary for an open society in the electronic age. Privacy is not secrecy. A private matter is something one doesn't want the whole world to know, but a secret matter is something one doesn't want anybody to know. Privacy is the power to selectively reveal oneself to the world.
                </p><br />
                <p>
                  If two parties have some sort of dealings, then each has a memory of their interaction. Each party can speak about their own memory of this; how could anyone prevent it? One could pass laws against it, but the freedom of speech, even more than privacy, is fundamental to an open society; we seek not to restrict any speech at all. If many parties speak together in the same forum, each can speak to all the others and aggregate together knowledge about individuals and other parties. The power of electronic communications has enabled such group speech, and it will not go away merely because we might want it to.
                </p><br />
                <p>
                  Since we desire privacy, we must ensure that each party to a transaction has knowledge only of that which is directly necessary for that transaction. Since any information can be spoken of, we must ensure that we reveal as little as possible. In most cases, personal identity is not salient. When I purchase a magazine at a store and hand cash to the clerk, there is no need to know who I am. When I ask my electronic mail provider to send and receive messages, my provider need not know to whom I am speaking or what I am saying or what others are saying to me; my provider only need know how to get the message there and how much I owe them in fees. When my identity is revealed by the underlying mechanism of the transaction, I have no privacy. I cannot selectively reveal myself; I must always reveal myself.
                </p><br />
                <p>
                  Therefore, privacy in an open society requires anonymous transaction systems. Until now, cash has been the primary such system. An anonymous transaction system is not a secret transaction system. An anonymous system empowers individuals to reveal their identity when desired and only when desired; this is the essence of privacy.
                </p><br />
                <p>
                  Privacy in an open society also requires cryptography. If I say something, I want it heard only by those for whom I intend it. If the content of my speech is available to the world, I have no privacy. To encrypt is to indicate the desire for privacy, and to encrypt with weak cryptography is to indicate not too much desire for privacy. Furthermore, to reveal one's identity with assurance when the default is anonymity requires the cryptographic signature.
                </p><br />
                <p>
                  We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy out of their beneficence. It is to their advantage to speak of us, and we should expect that they will speak. To try to prevent their speech is to fight against the realities of information. Information does not just want to be free, it longs to be free. Information expands to fill the available storage space. Information is Rumor's younger, stronger cousin; Information is fleeter of foot, has more eyes, knows more, and understands less than Rumor.
                </p><br />
                <p>
                  We must defend our own privacy if we expect to have any. We must come together and create systems which allow anonymous transactions to take place. People have been defending their own privacy for centuries with whispers, darkness, envelopes, closed doors, secret handshakes, and couriers. The technologies of the past did not allow for strong privacy, but electronic technologies do.
                </p><br />
                <p>
                We the Cypherpunks are dedicated to building anonymous systems. We are defending our privacy with cryptography, with anonymous mail forwarding systems, with digital signatures, and with electronic money. Cypherpunks write code. We know that someone has to write software to defend privacy, and since we can't get privacy unless we all do, we're going to write it. We publish our code so that our fellow Cypherpunks may practice and play with it. Our code is free for all to use, worldwide. We don't much care if you don't approve of the software we write. We know that software can't be destroyed and that a widely dispersed system can't be shut down.
                </p><br />
                <p>
                Cypherpunks deplore regulations on cryptography, for encryption is fundamentally a private act. The act ofencryption, in fact, removes information from the public realm. Even laws against cryptography reach only sofar as a nation's border and the arm of its violence. Cryptography will ineluctably spread over the whole globe,and with it the anonymous transactions systems that it makes possible.
                </p><br />
                <p>
                For privacy to be widespread it must be part of a social contract. People must come and together deploy thesesystems for the common good. Privacy only extends so far as the cooperation of one's fellows in society. We theCypherpunks seek your questions and your concerns and hope we may engage you so that we do not deceiveourselves. We will not, however, be moved out of our course because some may disagree with our goals.
                </p><br />
                <p>
                The Cypherpunks are actively engaged in making the networks safer for privacy. Let us proceed together apace.
                </p><br />
                <p>
                Onward.
                </p><br />
                <p>
                Eric Hughes [hughes@soda.berkeley.edu]
                </p><br />
                <p>
                9 March 1993
                </p><br />
              </div>
            </div>
          </div>
          <div className="yui-g">
            <div className="yui-u first">
            </div><div className="yui-u">
            </div>
          </div>
        </div>
        <div id="ft">
          <br className="clear-bug" />
          <div id="copyright"> <a href="https://snort.social/p/npub13azv2cf3kd3xdzcwqxlgcudjg7r9nzak37usnn7h374lkpvd6rcq4k8m54">Contact</a> • <a href="https://github.com/smolgrrr/ourchan">Github</a><br /><br /><br />
            Fuck Copyright
          </div>
        </div>
      </div>
      <div id="modal-bg" />
    </div>
  );

};

export default Home;