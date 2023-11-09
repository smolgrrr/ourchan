import { Event} from "nostr-tools";
import BlockQuote from "./BlockQuote";
import { parseContent } from "../../utils/content";
import { renderMedia } from "../../utils/FileUpload";

interface OPPostContainerProps {
    event: Event;
    openPopout?: (whichPopout: string, event: Event) => void;
}

const timeUnits = [
  { unit: 'w', value: 60 * 60 * 24 * 7 },
  { unit: 'd', value: 60 * 60 * 24 },
  { unit: 'h', value: 60 * 60 },
  { unit: 'm', value: 60 },
];

const timeAgo = (unixTime: number) => {
  let seconds = Math.floor(new Date().getTime() / 1000 - unixTime);

  if (seconds < 60) return `now`;

  for (let unit of timeUnits) {
      if (seconds >= unit.value) {
          return `${Math.floor(seconds / unit.value)}${unit.unit}`;
      }
      seconds %= unit.value;
  }
};

const OPPostContainer = ({ event , openPopout}: OPPostContainerProps) => {
    const {comment, file } = parseContent(event); 
    
    return (
        <div className="postContainer opContainer">
            <div id="p421762085" className="post op">
                <div className="postInfoM mobile"> <span className="nameBlock"><span className="name">Anonymous</span> <br /><span className="subject"></span> </span><span className="dateTime postNum" data-utc={1680267945}>03/31/23(Fri)09:05:45 <a title="Link to this post">Post:</a><a href={`/g/${event.id}`} title="Reply to this post">..{event.id.substring(event.id.length - 10)}</a></span></div>
                <div className="file" id="f421762085">
                    <div className="fileText">File: <a href={file} target="_blank">{file.substring(file.length - 21)}</a></div>
                    <a className="fileThumb" href={file} target="_blank">
                      {renderMedia(file)}
                    </a>
                </div>
                <div className="postInfo desktop" id="pi421762085">
                    <span className="nameBlock"><span className="name">Anonymous</span> </span>
                    <span className="dateTime" data-utc={event.created_at}>{timeAgo(event.created_at)}</span> 
                    <span className="postNum desktop"><a title="Link to this post">Post:</a><a href="#" title="Reply to this post">..{event.id.substring(event.id.length - 10)}</a></span>
                    <a href="#" className="postMenuBtn" title="Post menu" style={{display: 'inline-block'}} data-cmd="post-menu">▶</a>
                </div>
                <BlockQuote content={comment} />
            </div>
        </div>
    );
};

export default OPPostContainer;
