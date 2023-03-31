import { useNostrEvents, useProfile } from "nostr-react";
import { useParams } from 'react-router-dom';
import { parseContent } from '../utils/parseContent';
import ThreadHeader from "./ThreadHeader";
import OPPostContainer from "./OPPostContainer";
import ReplyContainer from "./ReplyContainer";

const Thread = () => {
    const { id } = useParams();

    const {events: ByOP} = useNostrEvents({
        filter: {
            ids: [id!],
            limit: 1,
        },
    });
    const {events: ByReplies} = useNostrEvents({
        filter: {
          '#e': [id!], 
          kinds: [1],
        },
    });

    const OP_event = ByOP[0];
    if (!OP_event) {
        return <ThreadHeader id={'null'} reply_pk={'null'}/>;
      }

    const { subject, comment, file } = parseContent(OP_event.content);

    return (
        <div>
            <ThreadHeader id={OP_event.id} reply_pk={OP_event.pubkey}/>
<hr className="aboveMidAd" />
<hr className="desktop" id="op" />
<div className="navLinks desktop">
   [<a href="/g/" accessKey="a">Return</a>] [<a href="/g">Catalog</a>] [<a href="#bottom">Bottom</a>]
   [<a data-cmd="update">Update</a>] [<label><input type="checkbox" title="Fetch new replies automatically" data-cmd="auto" />Auto</label>] <span />
</div>
<hr />
<form name="delform" id="delform" action="https://sys.4chan.org/pol/imgboard.php" method="post">
   <div className="board">
      <div className="thread" id="t421762085">
        <OPPostContainer file={file} subject={subject} comment={comment}  />
        {ByReplies.map((event) => <ReplyContainer event={event} />)}
        </div>
   </div>
   <div className="navLinks mobile"><span className="mobileib button"><a href="/pol/" accessKey="a">Return</a></span> <span className="mobileib button"><a href="/pol/catalog">Catalog</a></span> <span className="mobileib button"><a href="#top">Top</a></span> <span className="mobileib button"><a href="#bottom_r" id="refresh_bottom">Refresh</a></span></div>
   <hr className="mobile" />
   <div className="adl">[<a target="_blank" href="https://www.4channel.org/advertise">Tip me</a>]</div>
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
</div>

    );
};

export default Thread;