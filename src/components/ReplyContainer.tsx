import { parseContent } from "../utils/parseContent";
import { unixToDate } from "../utils/utils";

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
           <div className="postInfoM mobile"> <span className="nameBlock"><span className="name">Anonymous</span> <span className="posteruid"></span> <span title="Brazil" className="flag flag-br" /><br /></span><span className="dateTime postNum" data-utc={1680268022}>03/31/23(Fri)09:07:02 <a href="#p421762185" title="Link to this post">No.</a><a href="javascript:quote('421762185');" title="Reply to this post">421762185</a></span></div>
           <div className="postInfo desktop"><input type="checkbox" defaultValue="delete" /> <span className="nameBlock"><span className="name">Anonymous</span></span><span className="dateTime" data-utc={event.created_at}>{unixToDate(event.created_at)}</span> <span className="postNum desktop"><a href="#p421762185" title="Link to this post">No.</a><a href="javascript:quote('421762185');" title="Reply to this post">421762185</a></span><a href="#" className="postMenuBtn" title="Post menu" style={{display: 'inline-block'}} data-cmd="post-menu">▶</a></div>
           {file != '' && 
           <div className="file">
              <div className="fileText">File: <a href={file} target="_blank">{file}</a></div>
              <a className="fileThumb" href={file} target="_blank">
                 <img src={file} alt="2.59 MB" data-md5="HELNfpwz8Eeh7hXnxS4IOQ==" style={{height: '95px', width: '125px'}} loading="lazy" />
              </a>
           </div> }
           <blockquote className="postMessage"><span className="">{comment}</span></blockquote>
        </div>
     </div>
    );
};

export default ReplyContainer;