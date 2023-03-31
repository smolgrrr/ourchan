import { useNostrEvents, useProfile } from "nostr-react";
import { useParams } from 'react-router-dom';
import { parseContent } from '../utils/parseContent';
import ThreadHeader from "./ThreadHeader";
import OPPostContainer from "./OPPostContainer";

const Thread = () => {
    const { id } = useParams();


    const { events } = useNostrEvents({
        filter: {
            ids: [id!],
            limit: 1,
        },
    });

    const event = events[0];
    if (!event) {
        return <ThreadHeader />;
      }

    const { subject, comment, file } = parseContent(event.content);

    return (
        <div>
            <ThreadHeader />
<hr className="aboveMidAd" />
<div className="middlead center">
   <div><a href="//boards.4channel.org/fa/"><img alt="" src="//s.4cdn.org/image/contest_banners/0c3e75f8b0f48dc15a11a8ae95cd9a72d0472ce9.jpg" /></a></div>
</div>
<hr className="desktop" id="op" />
<div className="navLinks desktop">
   [<a href="/pol/" accessKey="a">Return</a>] [<a href="/pol/catalog">Catalog</a>] [<a href="#bottom">Bottom</a>]
   <div className="thread-stats"><span className="ts-replies" data-tip="Replies">3</span> / <span className="ts-images" data-tip="Images">2</span> / <span data-tip="Posters" className="ts-ips">4</span> / <span data-tip="Page" className="ts-page">5</span></div>
   [<a data-cmd="update">Update</a>] [<label><input type="checkbox" title="Fetch new replies automatically" data-cmd="auto" />Auto</label>] <span />
</div>
<hr />
<form name="delform" id="delform" action="https://sys.4chan.org/pol/imgboard.php" method="post">
   <div className="board">
      <div className="thread" id="t421762085">
        <OPPostContainer file={file} subject={subject} comment={comment}  />
         <div className="postContainer replyContainer" id="pc421762185">
            <div className="sideArrows" id="sa421762185">&gt;&gt;</div>
            <div id="p421762185" className="post reply">
               <div className="postInfoM mobile" id="pim421762185"> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid id_GUrBLACF">(ID: <span className="hand" title="Highlight posts by this ID">GUrBLACF</span>)</span> <span title="Brazil" className="flag flag-br" /><br /></span><span className="dateTime postNum" data-utc={1680268022}>03/31/23(Fri)09:07:02 <a href="#p421762185" title="Link to this post">No.</a><a href="javascript:quote('421762185');" title="Reply to this post">421762185</a></span></div>
               <div className="postInfo desktop" id="pi421762185"><input type="checkbox" name="421762185" defaultValue="delete" /> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid id_GUrBLACF">(ID: <span className="hand" title="Highlight posts by this ID" style={{backgroundColor: 'rgb(38, 51, 45)', color: 'white'}}>GUrBLACF</span>)</span> <span title="Brazil" className="flag flag-br" /></span> <span className="dateTime" data-utc={1680268022}>04/01/23(Sat)00:07:02</span> <span className="postNum desktop"><a href="#p421762185" title="Link to this post">No.</a><a href="javascript:quote('421762185');" title="Reply to this post">421762185</a></span><a href="#" className="postMenuBtn" title="Post menu" data-cmd="post-menu">▶</a></div>
               <div className="file" id="f421762185">
                  <div className="fileText" id="fT421762185">File: <a href="https://i.imgur.com/RofB4EA.mp4" target="_blank">1680193256790041.gif</a> (2.59 MB, 300x230)</div>
                  <a className="fileThumb" href="https://i.imgur.com/RofB4EA.mp4" target="_blank">
                     <img src="https://i.imgur.com/RofB4EA.mp4" alt="2.59 MB" data-md5="HELNfpwz8Eeh7hXnxS4IOQ==" style={{height: '95px', width: '125px'}} loading="lazy" />
                     <div data-tip data-tip-cb="mShowFull" className="mFileInfo mobile">2.59 MB GIF</div>
                  </a>
               </div>
               <blockquote className="postMessage" id="m421762185"><span className="quote">&gt;sees anti-ukrainian post </span><br /><span className="quote">&gt;American flag </span><br />Every single time</blockquote>
            </div>
         </div>
         <div className="postContainer replyContainer" id="pc421762253">
            <div className="sideArrows" id="sa421762253">&gt;&gt;</div>
            <div id="p421762253" className="post reply">
               <div className="postInfoM mobile" id="pim421762253"> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid id_IIusL3Z2">(ID: <span className="hand" title="Highlight posts by this ID">IIusL3Z2</span>)</span> <span title="United States" className="flag flag-us" /><br /></span><span className="dateTime postNum" data-utc={1680268073}>03/31/23(Fri)09:07:53 <a href="#p421762253" title="Link to this post">No.</a><a href="javascript:quote('421762253');" title="Reply to this post">421762253</a></span></div>
               <div className="postInfo desktop" id="pi421762253"><input type="checkbox" name="421762253" defaultValue="delete" /> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid id_IIusL3Z2">(ID: <span className="hand" title="Highlight posts by this ID" style={{backgroundColor: 'rgb(130, 251, 151)', color: 'black'}}>IIusL3Z2</span>)</span> <span title="United States" className="flag flag-us" /></span> <span className="dateTime" data-utc={1680268073}>04/01/23(Sat)00:07:53</span> <span className="postNum desktop"><a href="#p421762253" title="Link to this post">No.</a><a href="javascript:quote('421762253');" title="Reply to this post">421762253</a></span><a href="#" className="postMenuBtn" title="Post menu" data-cmd="post-menu">▶</a></div>
               <blockquote className="postMessage" id="m421762253"><a href="#p421762085" className="quotelink">&gt;&gt;421762085 (OP)</a><br />the best writers money can buy came up with that cringe</blockquote>
            </div>
         </div>
         <div className="postContainer replyContainer" id="pc421762384">
            <div className="sideArrows" id="sa421762384">&gt;&gt;</div>
            <div id="p421762384" className="post reply">
               <div className="postInfoM mobile" id="pim421762384"> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid id_TQjvXDpx">(ID: <span className="hand" title="Highlight posts by this ID">TQjvXDpx</span>)</span> <span title="Singapore" className="flag flag-sg" /><br /></span><span className="dateTime postNum" data-utc={1680268167}>03/31/23(Fri)09:09:27 <a href="#p421762384" title="Link to this post">No.</a><a href="javascript:quote('421762384');" title="Reply to this post">421762384</a></span></div>
               <div className="postInfo desktop" id="pi421762384"><input type="checkbox" name="421762384" defaultValue="delete" /> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid id_TQjvXDpx">(ID: <span className="hand" title="Highlight posts by this ID" style={{backgroundColor: 'rgb(142, 69, 13)', color: 'white'}}>TQjvXDpx</span>)</span> <span title="Singapore" className="flag flag-sg" /></span> <span className="dateTime" data-utc={1680268167}>04/01/23(Sat)00:09:27</span> <span className="postNum desktop"><a href="#p421762384" title="Link to this post">No.</a><a href="javascript:quote('421762384');" title="Reply to this post">421762384</a></span><a href="#" className="postMenuBtn" title="Post menu" data-cmd="post-menu">▶</a></div>
               <div className="file" id="f421762384">
                  <div className="fileText" id="fT421762384">File: <a href="https://i.imgur.com/SODIwHd.png" target="_blank">PolandFloyd.png</a> (306 KB, 593x624)</div>
                  <a className="fileThumb" href="https://i.imgur.com/SODIwHd.png" target="_blank">
                     <img src="https://i.imgur.com/SODIwHd.png" alt="306 KB" data-md5="aNuWhGo6gUZOVw1P/emulQ==" style={{height: '125px', width: '118px'}} loading="lazy" />
                     <div data-tip data-tip-cb="mShowFull" className="mFileInfo mobile">306 KB PNG</div>
                  </a>
               </div>
               <blockquote className="postMessage" id="m421762384"><a href="#p421762085" className="quotelink">&gt;&gt;421762085 (OP)</a><br />Always has been</blockquote>
            </div>
         </div>
      </div>
      <hr />
      <div className="navLinks navLinksBot desktop">
         <div className="open-qr-wrap">[<a href="#" className="open-qr-link" data-cmd="open-qr">Post a Reply</a>]</div>
         [<a href="/pol/" accessKey="a">Return</a>] [<a href="/pol/catalog">Catalog</a>] [<a href="#top">Top</a>] 
         <div className="thread-stats"><span className="ts-replies" data-tip="Replies">3</span> / <span className="ts-images" data-tip="Images">2</span> / <span data-tip="Posters" className="ts-ips">4</span> / <span data-tip="Page" className="ts-page">5</span></div>
         [<a data-cmd="update">Update</a>] [<label><input type="checkbox" title="Fetch new replies automatically" data-cmd="auto" />Auto</label>] <span />
      </div>
      <hr className="desktop" />
      <div className="mobile center"><a className="mobilePostFormToggle button" href="#">Post a Reply</a></div>
   </div>
   <div className="navLinks mobile"><span className="mobileib button"><a href="/pol/" accessKey="a">Return</a></span> <span className="mobileib button"><a href="/pol/catalog">Catalog</a></span> <span className="mobileib button"><a href="#top">Top</a></span> <span className="mobileib button"><a href="#bottom_r" id="refresh_bottom">Refresh</a></span></div>
   <hr className="mobile" />
   <div id="danbo-s-b" className="danbo-slot"><a href="https://www.4channel.org/pass" target="_blank"><img src="//s.4cdn.org/image/banners/5.png" /></a></div>
   <div className="adl">[<a target="_blank" href="https://www.4channel.org/advertise">Advertise on 4chan</a>]</div>
   <hr />
   <div className="bottomCtrl desktop">
      <span className="deleteform"><input type="hidden" name="mode" defaultValue="usrdel" />Delete Post:<input type="hidden" name="res" defaultValue={421762085} /> [<input type="checkbox" name="onlyimgdel" defaultValue="on" />File Only]<input type="hidden" id="delPassword" name="pwd" /> <input type="submit" defaultValue="Delete" /><input id="bottomReportBtn" type="button" defaultValue="Report" style={{display: 'none'}} /></span>
      <span className="stylechanger">
         Style: 
         <select id="styleSelector">
            <option value="Yotsuba New">Yotsuba</option>
            <option value="Yotsuba B New">Yotsuba B</option>
            <option value="Futaba New">Futaba</option>
            <option value="Burichan New">Burichan</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="Photon">Photon</option>
         </select>
      </span>
   </div>
</form>
<div id="boardNavDesktopFoot" className="desktop"><span className="boardList">[<a href="//boards.4channel.org/a/" title="Anime & Manga">a</a> / <a href="/b/" title="Random">b</a> / <a href="//boards.4channel.org/c/" title="Anime/Cute">c</a> / <a href="/d/" title="Hentai/Alternative">d</a> / <a href="/e/" title="Ecchi">e</a> / <a href="/f/" title="Flash">f</a> / <a href="//boards.4channel.org/g/" title="Technology">g</a> / <a href="/gif/" title="Adult GIF">gif</a> / <a href="/h/" title="Hentai">h</a> / <a href="/hr/" title="High Resolution">hr</a> / <a href="//boards.4channel.org/k/" title="Weapons">k</a> / <a href="//boards.4channel.org/m/" title="Mecha">m</a> / <a href="//boards.4channel.org/o/" title="Auto">o</a> / <a href="//boards.4channel.org/p/" title="Photo">p</a> / <a href="/r/" title="Adult Requests">r</a> / <a href="/s/" title="Sexy Beautiful Women">s</a> / <a href="/t/" title="Torrents">t</a> / <a href="/u/" title="Yuri">u</a> / <a href="//boards.4channel.org/v/" title="Video Games">v</a> / <a href="//boards.4channel.org/vg/" title="Video Game Generals">vg</a> / <a href="//boards.4channel.org/vm/" title="Video Games/Multiplayer">vm</a> / <a href="//boards.4channel.org/vmg/" title="Video Games/Mobile">vmg</a> / <a href="//boards.4channel.org/vr/" title="Retro Games">vr</a> / <a href="//boards.4channel.org/vrpg/" title="Video Games/RPG">vrpg</a> / <a href="//boards.4channel.org/vst/" title="Video Games/Strategy">vst</a> / <a href="//boards.4channel.org/w/" title="Anime/Wallpapers">w</a> / <a href="/wg/" title="Wallpapers/General">wg</a>] [<a href="/i/" title="Oekaki">i</a> / <a href="/ic/" title="Artwork/Critique">ic</a>] [<a href="/r9k/" title="ROBOT9001">r9k</a> / <a href="/s4s/" title="Shit 4chan Says">s4s</a> / <a href="//boards.4channel.org/vip/" title="Very Important Posts">vip</a> / <a href="//boards.4channel.org/qa/" title="Question & Answer">qa</a>] [<a href="//boards.4channel.org/cm/" title="Cute/Male">cm</a> / <a href="/hm/" title="Handsome Men">hm</a> / <a href="//boards.4channel.org/lgbt/" title="LGBT">lgbt</a> / <a href="/y/" title="Yaoi">y</a>] [<a href="//boards.4channel.org/3/" title="3DCG">3</a> / <a href="/aco/" title="Adult Cartoons">aco</a> / <a href="//boards.4channel.org/adv/" title="Advice">adv</a> / <a href="//boards.4channel.org/an/" title="Animals & Nature">an</a> / <a href="/bant/" title="International/Random">bant</a> / <a href="//boards.4channel.org/biz/" title="Business & Finance">biz</a> / <a href="//boards.4channel.org/cgl/" title="Cosplay & EGL">cgl</a> / <a href="//boards.4channel.org/ck/" title="Food & Cooking">ck</a> / <a href="//boards.4channel.org/co/" title="Comics & Cartoons">co</a> / <a href="//boards.4channel.org/diy/" title="Do It Yourself">diy</a> / <a href="//boards.4channel.org/fa/" title="Fashion">fa</a> / <a href="//boards.4channel.org/fit/" title="Fitness">fit</a> / <a href="//boards.4channel.org/gd/" title="Graphic Design">gd</a> / <a href="/hc/" title="Hardcore">hc</a> / <a href="//boards.4channel.org/his/" title="History & Humanities">his</a> / <a href="//boards.4channel.org/int/" title="International">int</a> / <a href="//boards.4channel.org/jp/" title="Otaku Culture">jp</a> / <a href="//boards.4channel.org/lit/" title="Literature">lit</a> / <a href="//boards.4channel.org/mlp/" title="Pony">mlp</a> / <a href="//boards.4channel.org/mu/" title="Music">mu</a> / <a href="//boards.4channel.org/n/" title="Transportation">n</a> / <a href="//boards.4channel.org/news/" title="Current News">news</a> / <a href="//boards.4channel.org/out/" title="Outdoors">out</a> / <a href="//boards.4channel.org/po/" title="Papercraft & Origami">po</a> / <a href="/pol/" title="Politically Incorrect">pol</a> / <a href="//boards.4channel.org/pw/" title="Professional Wrestling">pw</a> / <a href="//boards.4channel.org/qst/" title="Quests">qst</a> / <a href="//boards.4channel.org/sci/" title="Science & Math">sci</a> / <a href="/soc/" title="Cams & Meetups">soc</a> / <a href="//boards.4channel.org/sp/" title="Sports">sp</a> / <a href="//boards.4channel.org/tg/" title="Traditional Games">tg</a> / <a href="//boards.4channel.org/toy/" title="Toys">toy</a> / <a href="//boards.4channel.org/trv/" title="Travel">trv</a> / <a href="//boards.4channel.org/tv/" title="Television & Film">tv</a> / <a href="//boards.4channel.org/vp/" title="Pokémon">vp</a> / <a href="//boards.4channel.org/vt/" title="Virtual YouTubers">vt</a> / <a href="//boards.4channel.org/wsg/" title="Worksafe GIF">wsg</a> / <a href="//boards.4channel.org/wsr/" title="Worksafe Requests">wsr</a> / <a href="//boards.4channel.org/x/" title="Paranormal">x</a> / <a href="//boards.4channel.org/xs/" title="Extreme Sports">xs</a>] <span className="custom-menu-ctrl">[<a data-cmd="custom-menu-edit" title="Edit Menu" href="#">Edit</a>]</span></span><span id="navbotright">[<a href="javascript:void(0);" id="settingsWindowLinkBot">Settings</a>] [<a href="/search" title="Search">Search</a>] [<a href="//p.4chan.org/" title="Mobile">Mobile</a>] [<a href="//www.4chan.org/" target="_top">Home</a>]</span></div>
<div id="absbot" className="absBotText">
   <div className="mobile"><span id="disable-mobile">[<a href="javascript:disableMobile();">Disable Mobile View / Use Desktop Site</a>]<br /><br /></span><span id="enable-mobile">[<a href="javascript:enableMobile();">Enable Mobile View / Use Mobile Site</a>]<br /><br /></span></div>
   <span className="absBotDisclaimer">All trademarks and copyrights on this page are owned by their respective parties. Images uploaded are the responsibility of the Poster. Comments are owned by the Poster.</span>
   <div id="footer-links"><a href="//www.4chan.org/faq#what4chan" target="_blank">About</a> • <a href="//www.4chan.org/feedback" target="_blank">Feedback</a> • <a href="//www.4chan.org/legal" target="_blank">Legal</a> • <a href="//www.4chan.org/contact" target="_blank">Contact</a></div>
</div>
<div id="bottom" />
</div>

    );
};

export default Thread;