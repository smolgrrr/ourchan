import React, { useState, useEffect } from "react"
import { generatePrivateKey, getPublicKey, finishEvent, UnsignedEvent, Event as NostrEvent, nip19 } from "nostr-tools";
import { publish } from "../../utils/relays";
import { renderMedia, attachFile } from "../../utils/FileUpload";
import { XCircleIcon } from "@heroicons/react/24/solid";

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

type ReplyPopoutProps = {
  events: NostrEvent[];
  closePopout: () => void;
};

const ReplyPopout: React.FC<ReplyPopoutProps> = ({
  events,
  closePopout,
}) => {
  const tagType = useState('Reply')
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });
  const [isDragging, setIsDragging] = useState(false);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [hasSubmittedPost, setHasSubmittedPost] = useState(false);
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
    if (tagType && unsigned.tags.length === 0) {
      const tags = ['e', 'p'];
      if (tags) {
        unsigned.tags.push(["e", events[0].id])
        unsigned.tags.push(["p", events[0].pubkey])
      }
    }

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

  useEffect(() => {
    setDoingWorkProp(false);
    if (messageFromWorker) {
      try {
        const signedEvent = finishEvent(messageFromWorker, sk);
        publish(signedEvent);

        setComment("");
        setFile("");
        setSk(generatePrivateKey());
        setUnsigned(prevUnsigned => ({
          ...prevUnsigned,
          content: '',
          created_at: Math.floor(Date.now() / 1000),
          pubkey: getPublicKey(sk),
        }));
      } catch (error) {
        setComment(error + " " + comment);
      }
    }
  }, [messageFromWorker]);

  return (
    <>
      <div id="quickReply" className="popout-content extPanel reply"
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          border: "1px solid black",
        }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}>

        <div id="qrHeader" className="drag postblock" style={{ cursor: 'move' }} onMouseMove={(e) => {
          if (!isDragging) return;

          // Calculate the new position of the popout based on the mouse movement
          const newPosition = {
            x: position.x + e.movementX,
            y: position.y + e.movementY,
          };
          setPosition(newPosition);
        }}>Reply to Thread No.<span id="qrTid">422237188</span><a onClick={closePopout}> X</a></div>
        <input type="hidden" defaultValue={4194304} name="MAX_FILE_SIZE" /><input type="hidden" defaultValue="regist" name="mode" /><input id="qrResto" type="hidden" defaultValue={422237188} name="resto" />
        <div id="qrForm">
          <form encType="multipart/form-data" onSubmit={(event) => {
            event.preventDefault();
            startWork();
            setDoingWorkProp(true);
          }}><input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
            <input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
            <div><textarea
              name="com"
              cols={36}
              rows={8}
              wrap="soft"
              tabIndex={0}
              onChange={(e) => setComment(e.target.value)}
            /></div>
            <div className="relative">
              {file !== "" && (
                <button onClick={() => setFile("")}>
                  <XCircleIcon className="h-10 w-10 absolute shadow z-100 text-blue-500" />
                </button>
              )}
              {renderMedia(file)}
            </div>
            <div><input id="qrFile" name="upfile" type="file" tabIndex={0} size={19} title="Shift + Click to remove the file" onChange={(e) => {
              const file_input = e.target.files?.[0];
              if (file_input) {
                attachFile(file_input);
              }
            }} /><input type="submit" tabIndex={6} /></div>
            <input name="file" type="text" placeholder={"or direct media link"} onChange={(e) => setFile(e.target.value)} />
          </form>
        </div>
        <div id="qrError" />
      </div>
    </>
  );
};

export default ReplyPopout;



