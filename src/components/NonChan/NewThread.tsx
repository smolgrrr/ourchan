import React from 'react';
import { useNostr } from "nostr-react";
import { useState } from "react";
import NostrImg from '../../utils/NostrImg';
import BlotterMsgs from '../Misc/BlotterMsgs';
import { boards } from "../../constants/Const";
import { handleThreadSubmit } from '../../utils/postEvent';

interface NewThreadProps {
    currentboard: number;
}

const NewThread: React.FC<NewThreadProps> = ({ currentboard }) => {
  const board = boards[currentboard];
  const { publish } = useNostr();
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [zapAddress, setZapAddress] = useState("");
  const [hasSubmittedPost, setHasSubmittedPost] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newEvent = await handleThreadSubmit(['',''], subject, comment, zapAddress, hasSubmittedPost);
      if (newEvent) {
        publish(newEvent);
        setHasSubmittedPost(true);
      }
    } catch (error) {
      setComment(comment + " " + error);
    }
  };

  async function attachFile(file_input: File | null) {
    try {
      if (file_input) {
        const rx = await NostrImg(file_input);
        if (rx.url) {
          setComment(comment + " " + rx.url);
        } else if (rx?.error) {
          setComment(comment + " " + rx.error);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setComment(comment + " " + error?.message);
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
      <>
      <form name="post" method="post" encType="multipart/form-data" onSubmit={handleSubmit}><input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
        <div id="togglePostFormLink" className="desktop">[<a onClick={toggleForm}>Start a New Thread</a>]
        </div>
        <table className="postForm" id="postForm">
          <tbody>
            <tr data-type="Subject">
              <td>Subject*</td>
              <td><input name="sub" type="text" onChange={(e) => setSubject(e.target.value)} /><input type="submit" defaultValue="Post" tabIndex={6} /></td>
            </tr>
            <tr data-type="Comment">
              <td>Comment*</td>
              <td><textarea name="com" cols={48} rows={4} wrap="soft" defaultValue={""} onChange={(e) => setComment(e.target.value)} /></td>
            </tr>
            <tr data-type="Zaps">
              <td>Zap pubkey
              <div className="info_wrapper">
                  <div className="info_folder">
                    <div className="info_icon">?</div>
                    <div className="info_message">
                      Add a nostr pubkey which already has a lightning address ready to recieve sats to (NIP57)
                    </div>
                  </div>
                </div>
              </td>
              <td><input name="zap" type="text" placeholder="npub.." onChange={(e) => setZapAddress(e.target.value)} /></td>
            </tr>
            <tr data-type="File">
              <td>File*</td>
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
              <td><input name="file" type="text" placeholder={"or direct media link"} onChange={(e) => setFile(e.target.value)} /></td>
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
    </>
  );

};

export default NewThread;