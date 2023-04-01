import React from 'react';
import { useNostr, dateToUnix } from "nostr-react";
import { useMemo, useState, useEffect } from "react";
import {
  type Event as NostrEvent,
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from "nostr-tools";

interface ThreadHeaderProps {
    id: string;
    reply_pk: string;
}

const ThreadHeader = ({ id, reply_pk}: ThreadHeaderProps) => {
  const { publish } = useNostr();
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let message = "\ncomment:- " + comment 
    + "\nfile:- " + file 
    + "\n";

    if (!message) {
      alert("no message provided");
      return;
    }

    const newEvent: NostrEvent = {
      id: 'null',
      content: message,
      kind: 1,
      tags: [
        ["e", id],
        ["p", reply_pk]
      ],
      created_at: dateToUnix(),
      pubkey: 'null',
      sig: 'null',
    };

      let sk = generatePrivateKey();
 
      newEvent.pubkey = getPublicKey(sk);
      newEvent.id = getEventHash(newEvent);
      newEvent.sig = signEvent(newEvent, sk);
  
      publish(newEvent);
  };

  const toggleForm = () => {
    const toggleLink = document.getElementById("togglePostFormLink");
    const postForm = document.getElementById("postForm");
  
    if (toggleLink && postForm) {
      if (postForm.style.display === "none") {
        toggleLink.style.display = "none";
        postForm.style.display = "table";
      } else {
        toggleLink.style.display = "block";
        postForm.style.display = "none";
      }
    }
  };

  return (
<div>
        <div id="boardNavDesktop" className="desktop"><span className="boardList">[ <a href="/g/" title="Anime &amp; Manga">g</a> ] </span></div>
        <div className="pageJump"> <a href="">▼</a> <a href="javascript:void(0);" id="settingsWindowLinkMobile">Settings</a> <a href="">Mobile</a> <a href="" target="_top">Home</a> </div>
        <div className="boardBanner">
          <div id="bannerCnt" className="title desktop" data-src="7.png"><img alt="ourChan" src="7.png" /></div>
          <div className="boardTitle">/g/ - General</div>
        </div>
        <hr className="abovePostForm" />
        <div style={{position: 'relative'}} />
        <form name="post" method="post" encType="multipart/form-data" onSubmit={handleSubmit}><input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
          <div id="togglePostFormLink" className="desktop">[<a onClick={toggleForm}>Post a reply</a>]
          </div>
          <table className="postForm" id="postForm">
            <tbody>
              <tr data-type="Comment">
                <td>Comment</td>
                <td><textarea name="com" cols={48} rows={4} wrap="soft" defaultValue={""} onChange={(e) => setComment(e.target.value)}/></td>
              </tr>
              <tr data-type="Subject">
                <td>File</td>
                <td><input name="sub" type="text" onChange={(e) => setFile(e.target.value)}/><input type="submit" defaultValue="Post" tabIndex={6}/></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <div id="postFormError" />
                </td>
              </tr>
            </tfoot>
          </table>
          <table id="blotter" className="desktop">
            <thead>
              <tr>
                <td colSpan={2}>
                  <hr className="aboveMidAd" />
                </td>
              </tr>
            </thead>
            <tbody id="blotter-msgs">
              <tr>
                <td data-utc={1598018313} className="blotter-date">03/31/23</td>
                <td className="blotter-content">First board added: <a target="_blank" title="Video Games/RPG" href="/g/">/g/</a></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>[<a data-utc={1598018313} id="toggleBlotter" href="">Hide</a>]<span> [<a href="" target="_blank">Show All</a>]</span></td>
              </tr>
            </tfoot>
          </table>
        </form>
    </div>
      );
 
};

      export default ThreadHeader;