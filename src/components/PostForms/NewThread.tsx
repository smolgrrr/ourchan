import React from 'react';
import { useState, useEffect } from "react";
import { attachFile } from '../../utils/FileUpload';
import BlotterMsgs from '../Misc/BlotterMsgs';
import { UnsignedEvent, generatePrivateKey, getPublicKey } from 'nostr-tools';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { renderMedia } from '../../utils/FileUpload';

const useWorkers = (numCores: number, unsigned: UnsignedEvent, difficulty: string, deps: any[]) => {
  const [messageFromWorker, setMessageFromWorker] = useState(null);
  const [doingWorkProgress, setDoingWorkProgress] = useState(0);

  const startWork = () => {
    const workers = Array(numCores).fill(null).map(() => new Worker(new URL("../../powWorker", import.meta.url)));

    workers.forEach((worker, index) => {
      worker.onmessage = (event) => {
        if (event.data.status === 'progress') {
          console.log(`Worker progress: Checked ${event.data.currentNonce} nonces.`);
          setDoingWorkProgress(event.data.currentNonce);
        } else if (event.data.found) {
          setMessageFromWorker(event.data.event);
          // Terminate all workers once a solution is found
          workers.forEach(w => w.terminate());
        }
      };

      worker.postMessage({
        unsigned,
        difficulty,
        nonceStart: index, // Each worker starts from its index
        nonceStep: numCores  // Each worker increments by the total number of workers
      });
    });
  };

  return { startWork, messageFromWorker, doingWorkProgress };
};

const NewThread: React.FC = () => {
  const [hasSubmittedPost, setHasSubmittedPost] = useState(false);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [sk, setSk] = useState(generatePrivateKey());
  const [unsigned, setUnsigned] = useState<UnsignedEvent>({
    kind: 1,
    tags: [],
    content: "",
    created_at: Math.floor(Date.now() / 1000),
    pubkey: getPublicKey(sk),
  });
  const [difficulty, setDifficulty] = useState(
    localStorage.getItem("difficulty") || "21"
  );

  const [uploadingFile, setUploadingFile] = useState(false);
  const [doingWorkProp, setDoingWorkProp] = useState(false);

  // Initialize the worker outside of any effects
  const numCores = navigator.hardwareConcurrency || 4;

  const { startWork, messageFromWorker, doingWorkProgress } = useWorkers(numCores, unsigned, difficulty, [unsigned]);


  useEffect(() => {
    const handleDifficultyChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { difficulty } = customEvent.detail;
      setDifficulty(difficulty);
    };

    window.addEventListener("difficultyChanged", handleDifficultyChange);

    return () => {
      window.removeEventListener("difficultyChanged", handleDifficultyChange);
    };
  }, []);

  useEffect(() => {
    setUnsigned(prevUnsigned => ({
      ...prevUnsigned,
      content: `${comment} ${file}`,
      created_at: Math.floor(Date.now() / 1000),
      pubkey: getPublicKey(sk),
    }));
  }, [comment, file]);

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
      <form name="post" method="post" encType="multipart/form-data"
        onSubmit={(event) => {
          event.preventDefault();
          startWork();
          setDoingWorkProp(true);
        }}>
        <input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
        <div id="togglePostFormLink" className="desktop">[<a onClick={toggleForm}>Start a New Thread</a>]
        </div>
        <table className="postForm" id="postForm">
          <tbody>
            <tr data-type="Comment">
              <td>Comment*</td>
              <td><textarea name="com" cols={48} rows={4} wrap="soft" value={comment} onChange={(e) => setComment(e.target.value)} /></td>
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
              </input>
              </td>
            </tr>
            <div className="relative">
              {file !== "" && (
                <button onClick={() => setFile("")}>
                  <XCircleIcon className="h-10 w-10 absolute shadow z-100 text-blue-500" />
                </button>
              )}
              {renderMedia(file)}
            </div>
            <tr>
              <td></td>
              <td>Wait for media link to appear in comment before posting.</td>
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