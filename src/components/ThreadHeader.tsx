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

const ThreadHeader = () => {
  const { publish } = useNostr();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let message = "subject: " + subject 
    + "\ncomment: " + comment 
    + "\nfile: " + file 
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
        ["p", "e1d31f34e0b95e2a078f15cc81d7218bab75b6be794b7976ba6aeb654df88005"],
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
        <div className="pageJump"> <a href="https://boards.4chan.org/pol/#bottom">▼</a> <a href="javascript:void(0);" id="settingsWindowLinkMobile">Settings</a> <a href="https://p.4chan.org/">Mobile</a> <a href="https://www.4chan.org/" target="_top">Home</a> </div>
        <div className="boardBanner">
          <div id="bannerCnt" className="title desktop" data-src="85.png"><img alt="4chan" src="./_pol_ - Politically Incorrect - 4chan_files/85.png" /></div>
          <div className="boardTitle">/g/ - General</div>
        </div>
        <hr className="abovePostForm" />
        <div style={{position: 'relative'}} />
        <form name="post" method="post" encType="multipart/form-data" onSubmit={handleSubmit}><input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
          <div id="togglePostFormLink" className="desktop">[<a onClick={toggleForm}>Post a reply</a>]
          </div>
          <table className="postForm" id="postForm">
            <tbody>
              <tr data-type="Name">
                <td>Name</td>
                <td><input name="name" type="text" placeholder="Anonymous" onChange={(e) => setName(e.target.value)}/></td>
              </tr>
              <tr data-type="Subject">
                <td>Subject</td>
                <td><input name="sub" type="text" onChange={(e) => setSubject(e.target.value)}/><input type="submit" defaultValue="Post" tabIndex={6}/></td>
              </tr>
              <tr data-type="Comment">
                <td>Comment</td>
                <td><textarea name="com" cols={48} rows={4} wrap="soft" defaultValue={""} onChange={(e) => setComment(e.target.value)}/></td>
              </tr>
              <tr data-type="Subject">
                <td>File</td>
                <td><input name="sub" type="text" onChange={(e) => setFile(e.target.value)}/></td>
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
                <td className="blotter-content">First board added: <a target="_blank" title="Video Games/RPG" href="https://boards.4channel.org/vrpg/">/g/</a></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>[<a data-utc={1598018313} id="toggleBlotter" href="https://boards.4chan.org/pol/#">Hide</a>]<span> [<a href="https://www.4chan.org/blotter" target="_blank">Show All</a>]</span></td>
              </tr>
            </tfoot>
          </table>
        </form>
    </div>
      );
 
};

      export default ThreadHeader;