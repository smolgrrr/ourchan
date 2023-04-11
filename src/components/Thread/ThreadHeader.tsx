import React from 'react';
import { useState } from "react";
import NostrImg from '../../utils/NostrImg';
import BoardBanner from '../Misc/BoardBanner';
import BlotterMsgs from '../Misc/BlotterMsgs';
import { handleReplySubmit } from '../../utils/postEvent';
import { useNostr } from 'nostr-react';

interface ThreadHeaderProps {
    id: string;
    reply_pk: string;
}

const ThreadHeader = ({ id, reply_pk}: ThreadHeaderProps) => {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [zapAddress, setZapAddress] = useState("");
  const { publish } = useNostr();
  const [hasSubmittedPost, setHasSubmittedPost] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleReplySubmit([id], reply_pk, comment, file, zapAddress, hasSubmittedPost)
    .then(newEvent => {
      if (newEvent) {
        publish(newEvent);
        setHasSubmittedPost(true);
      }
    })
  };

  async function attachFile(file_input: File | null) {
    try {
      if (file_input) {
        const rx = await NostrImg(file_input);
        if (rx.url) {
          setFile(rx.url);
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
              <tr data-type="Zaps">
                <td>Zap pubkey</td>
                <td><input name="zap" type="text" placeholder="npub.." onChange={(e) => setZapAddress(e.target.value)} /></td>
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
              <tr data-type="File link">
                <td></td>
                <td><input name="file" type="text" placeholder={"or direct media link"} onChange={(e) => setFile(e.target.value)} /><input type="submit" defaultValue="Post" tabIndex={6}/></td>
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
          <BlotterMsgs />
        </form>
    </div>
      );
 
};

export default ThreadHeader;