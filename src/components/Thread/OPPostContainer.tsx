import { unixToDate } from "../../utils/utils";
import { Event } from "../../types/types";
import { parseContent } from "../../utils/parseContent";

interface OPPostContainerProps {
    event: Event;
}

const OPPostContainer = ({ event}: OPPostContainerProps) => {
    const { subject, comment, file } = parseContent(event);
    
    return (
        <div className="postContainer opContainer">
            <div id="p421762085" className="post op">
                <div className="postInfoM mobile"> <span className="nameBlock"><span className="name">Anonymous</span> <br /><span className="subject"></span> </span><span className="dateTime postNum" data-utc={1680267945}>03/31/23(Fri)09:05:45 <a title="Link to this post">Post:</a><a href={`/thread/${event.id}`} title="Reply to this post">..{event.id.substring(event.id.length - 10)}</a></span></div>
                <div className="file" id="f421762085">
                    <div className="fileText">File: <a href={file} target="_blank">{file.substring(file.length - 21)}</a></div>
                    <a className="fileThumb" href={file} target="_blank">
                        <img src={file} alt="377 KB" data-md5="TaFWJ19lIH43I954gO55gA==" style={{ maxHeight: '250px', maxWidth: '236px' }} loading="lazy" />
                    </a>
                </div>
                <div className="postInfo desktop" id="pi421762085">
                    <input type="checkbox" name="421762085" defaultValue="delete" /> <span className="subject">{subject}</span> <span className="nameBlock"><span className="name">Anonymous</span> </span><span className="dateTime" data-utc={event.created_at}>{unixToDate(event.created_at)}</span> <span className="postNum desktop"><a title="Link to this post">Post:</a><a href={`/thread/${event.id}`} title="Reply to this post">..{event.id.substring(event.id.length - 10)}</a></span><a href="#" className="postMenuBtn" title="Post menu" style={{display: 'inline-block'}} data-cmd="post-menu">▶</a>
                </div>
                <blockquote className="postMessage" id="m421766820">{comment}</blockquote>
            </div>
        </div>
    );
};

export default OPPostContainer;
