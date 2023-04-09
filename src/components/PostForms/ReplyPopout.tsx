import React, { useState, useEffect } from "react";
import NostrImg from '../../utils/NostrImg';
import { handleReplySubmit } from "../../utils/postEvent";
import { useNostr } from "nostr-react";
import {
  type Event as NostrEvent,
} from "nostr-tools";

type PopoutProps = {
  OP_event: NostrEvent,
  tags: string[];
  visible: boolean;
  closePopout: () => void;
};

const Popout: React.FC<PopoutProps> = ({
  OP_event,
  tags,
  visible,
  closePopout,
}) => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });
  const [isDragging, setIsDragging] = useState(false);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [hasSubmittedPost, setHasSubmittedPost] = useState(false);
  const { publish } = useNostr();

  useEffect(() => {
    setComment([`>>${tags}\n`].join(''));
  }, [tags]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTags = [OP_event.id, ...tags];

    handleReplySubmit(updatedTags, OP_event.pubkey, comment, file, hasSubmittedPost)
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


  return (
    <>
      {visible && (
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
            <form encType="multipart/form-data" onSubmit={handleSubmit}><input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
            <input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
            <div><input name="name" type="text" tabIndex={0} placeholder="Name" /></div>
            <div><input name="email" type="text" tabIndex={0} id="qrEmail" placeholder="Options" /></div>
            <div><textarea
              name="com"
              cols={36}
              rows={8}
              wrap="soft"
              tabIndex={0}
              placeholder="Comment"
              defaultValue={tags.map(tag => `>>${tag}\n`).join('')}
              onChange={(e) => setComment(e.target.value)}
            /></div>
            <div>
            </div>
            <div><input id="qrFile" name="upfile" type="file" tabIndex={0} size={19} title="Shift + Click to remove the file" onChange={(e) => {
              const file_input = e.target.files?.[0];
              if (file_input) {
                attachFile(file_input);
              }
            }} /><input type="submit" tabIndex={6}/></div>
            </form>
          </div>
          <div id="qrError" />
        </div>
      )}
    </>
  );
};

export default Popout;



