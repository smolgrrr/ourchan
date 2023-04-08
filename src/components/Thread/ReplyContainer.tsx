import { parseContent } from "../../utils/parseContent";
import { unixToDate } from "../../utils/utils";
import React, { useState } from "react";

interface ReplyContainerProps {
  event: Event;
  visible: boolean;
  openPopout: () => void;
}

interface Event {
  id: string;
  content: string;
  created_at: number;
  pubkey: string;
}

const ReplyContainer = ({ event, openPopout }: ReplyContainerProps) => {
  const { file, comment } = parseContent(event.content);
  const postDate = unixToDate(event.created_at);

  return (
    <>
      <div className="postContainer replyContainer">
        <div className="sideArrows">&gt;&gt;</div>
        <div className="post reply">
          <div className="postInfoM mobile">
            <span className="nameBlock">
              <span className="name">Anonymous</span>{" "}
            </span>
            <span className="dateTime postNum">
              {postDate}
              <a href="#p421762185" title="Link to this post">
                No.
              </a>
              <a
                href=""
                title="Reply to this post"
              >
                {event.id.substring(event.id.length - 10)}
              </a>
            </span>
          </div>
          <div className="postInfo desktop">
            <input type="checkbox" defaultValue="delete" />{" "}
            <span className="nameBlock">
              <span className="name">Anonymous</span>
            </span>
            <span className="dateTime" data-utc={event.created_at}>
              {postDate}
            </span>{" "}
            <span className="postNum desktop">
              <a href="#p421762185" title="Link to this post">
                No.
              </a>
              <a onClick={openPopout} title="Reply to this post">
                {event.id.substring(event.id.length - 10)}
              </a>
            </span>
            <a
              href="#"
              className="postMenuBtn"
              title="Post menu"
              style={{ display: "inline-block" }}
              data-cmd="post-menu"
            >
              ▶
            </a>
          </div>
          {file != "" && (
            <div className="file">
              <div className="fileText">
                File:{" "}
                <a href={file} target="_blank">
                  {file && file.substring(file.length - 21)}
                </a>
              </div>
              <a className="fileThumb" href={file} target="_blank">
                <img
                  src={file}
                  style={{ maxHeight: "95px", maxWidth: "125px" }}
                  loading="lazy"
                />
              </a>
            </div>
          )}
          <blockquote className="postMessage">
            <span className="">{comment}</span>
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default ReplyContainer;
