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
import NostrImg from '../../utils/NostrImg';
import BoardBanner from '../Misc/BoardBanner';
import BlotterMsgs from '../Misc/BlotterMsgs';

interface ThreadHeaderProps {
    id: string;
    reply_pk: string;
}

const ThreadHeader = ({ id, reply_pk}: ThreadHeaderProps) => {
  const { publish } = useNostr();
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [hasSubmittedPost, setHasSubmittedPost] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let message = "ourchan.org \ncomment:- " + comment 
    + "\nfile:- " + file 
    + "\n";

    if (!message) {
      alert("no message provided");
      return;
    }

    if (hasSubmittedPost) {
      alert('You have already submitted a post.');
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
      setHasSubmittedPost(true);
  };

  async function attachFile(file_input: File | null) {
    try {
      if (file_input) {
        const rx = await NostrImg(file_input);
        if (rx.url) {
          setFile(n => `${n ? `${n}\n` : ""}${rx.url}`);
        } else if (rx?.error) {
          setFile(rx.error);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFile(error?.message);
      }
    }
  }

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
        <BoardBanner currentboard={null}/>
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
              <td> <input type="file" name="file_input" id="file_input"
                onChange={(e) => {
                  const file_input = e.target.files?.[0];
                  if (file_input) {
                    attachFile(file_input);
                  }
                }}>
              </input></td>
              </tr>
              <input type="submit" defaultValue="Post" tabIndex={6}/>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <div id="postFormError" />
                </td>
              </tr>
            </tfoot>
          </table>
          <BlotterMsgs />
        </form>
    </div>
      );
 
};

      export default ThreadHeader;