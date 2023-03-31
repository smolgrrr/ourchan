import { parseContent } from "../utils/parseContent";

interface ReplyContainerProps {
    event: Event;
}

interface Event {
    id: string;
    content: string;
    created_at: number;
    pubkey: string;
  }

const ReplyContainer = ({ event }: ReplyContainerProps) => {
    const { file, comment } = parseContent(event.content);

    return (
        <div className="postContainer replyContainer">
        <div className="sideArrows">&gt;&gt;</div>
        <div className="post reply">
           <div className="postInfoM mobile"> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid">(ID: <span className="hand" title="Highlight posts by this ID">GUrBLACF</span>)</span> <span title="Brazil" className="flag flag-br" /><br /></span><span className="dateTime postNum" data-utc={1680268022}>03/31/23(Fri)09:07:02 <a href="#p421762185" title="Link to this post">No.</a><a href="javascript:quote('421762185');" title="Reply to this post">421762185</a></span></div>
           <div className="postInfo desktop"><input type="checkbox" defaultValue="delete" /> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid">(ID: <span className="hand" title="Highlight posts by this ID" style={{backgroundColor: 'rgb(38, 51, 45)', color: 'white'}}>GUrBLACF</span>)</span> <span title="Brazil" className="flag flag-br" /></span> <span className="dateTime" data-utc={1680268022}>04/01/23(Sat)00:07:02</span> <span className="postNum desktop"><a href="#p421762185" title="Link to this post">No.</a><a href="javascript:quote('421762185');" title="Reply to this post">421762185</a></span><a href="#" className="postMenuBtn" title="Post menu" data-cmd="post-menu">▶</a></div>
           <div className="file">
              <div className="fileText">File: <a href="https://i.imgur.com/RofB4EA.mp4" target="_blank">1680193256790041.gif</a> (2.59 MB, 300x230)</div>
              <a className="fileThumb" href="https://i.imgur.com/RofB4EA.mp4" target="_blank">
                 <img src="https://i.imgur.com/RofB4EA.mp4" alt="2.59 MB" data-md5="HELNfpwz8Eeh7hXnxS4IOQ==" style={{height: '95px', width: '125px'}} loading="lazy" />
                 <div data-tip data-tip-cb="mShowFull" className="mFileInfo mobile">2.59 MB GIF</div>
              </a>
           </div>
           <blockquote className="postMessage"><span className="quote">{comment}</span><br /><span className="quote">&gt;American flag </span><br />Every single time</blockquote>
        </div>
     </div>
    );
};

export default ReplyContainer;