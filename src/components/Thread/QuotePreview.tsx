import React, { useState } from "react";
import { Event } from "nostr-tools";
import { unixToDate } from "../../utils/otherUtils";
import { parseContent } from "../../utils/content";

type QuotePreviewProps = {
    event: Event;
    previewVisible: boolean;
};

const QuotePreview: React.FC<QuotePreviewProps> = ({
    event,
    previewVisible,
}) => {
    const postDate = unixToDate(event.created_at);
    const [position, setPosition] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });
    const { file, comment } = parseContent(event);


    return (
        <>
            {previewVisible && (
                <div id="quote-preview" className="post reply preview" style={{ right: '398.57px', top: '763.086px' }}>
                    <div className="postInfoM mobile" id="pim422849818">
                        <span className="nameBlock">
                            <span className="name">Anonymous</span>
                        </span>
                        <span className="dateTime postNum">{postDate}
                            <a title="Link to this post">Post:</a>
                            <a title="Reply to this post">{event.id.substring(event.id.length - 10)}</a>
                        </span>
                    </div>
                    <div className="postInfo desktop">
                        <span className="nameBlock">
                            <span className="name">Anonymous</span>
                        </span>
                        <span className="dateTime" >{postDate}</span>
                        <span className="postNum desktop"><a title="Link to this post">No.</a><a title="Reply to this post">{event.id.substring(event.id.length - 10)}</a></span><a href="#" className="postMenuBtn" title="Post menu" data-cmd="post-menu">▶</a>
                    </div>
                    {file !== "" && (
                        <div className="file">
                            <div className="fileText">
                                File:{" "}
                                <a href={file}>
                                    {file && file.substring(file.length - 21)}
                                </a>
                            </div>
                            <a className="fileThumb" href={file}>
                                <img
                                    src={file}
                                    style={{ maxHeight: "95px", maxWidth: "125px" }}
                                    loading="lazy"
                                />
                            </a>
                        </div>
                    )}
                    <blockquote className="postMessage" id="m422849818">{comment}</blockquote>
                </div>
            )}
        </>
    );
};

export default QuotePreview;