import React, { useState, useEffect } from "react";
import NostrImg from '../../utils/NostrImg';
import { handleReplySubmit } from "../../utils/postEvent";
import { useNostr } from "nostr-react";
import {
  type Event as NostrEvent,
} from "nostr-tools";

type ReplyPopoutProps = {
  events: NostrEvent[];
  closePopout: () => void;
};

const ReplyPopout: React.FC<ReplyPopoutProps> = ({
  events,
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
  const [defaultComment, setDefaultComment] = useState("");
  const [zapAddress, setZapAddress] = useState("");
  const [tags, setTags] = useState(['']);
  const { publish } = useNostr();

  useEffect(() => {
    setTags(events.map(event => event.id));
    setComment([`>>${tags}\n`].join(''));
  }, [events]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTags = events.map(event => event.id);

    handleReplySubmit(updatedTags, events[0].pubkey, comment, file, zapAddress, hasSubmittedPost)
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
            <div><input name="zap" type="text" placeholder="(optional) npub for zaps" onChange={(e) => setZapAddress(e.target.value)} />
                <div className="info_wrapper">
                  <div className="info_folder">
                    <div className="info_icon">?</div>
                    <div className="info_message">
                      Add a nostr pubkey which already has a lightning address ready to recieve sats to (NIP57)
                    </div>
                  </div>
                </div>
            </div>
            <div><textarea
              name="com"
              cols={36}
              rows={8}
              wrap="soft"
              tabIndex={0}
              defaultValue={tags.slice(1).map(tag => `>>${tag}\n`).join('')}
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
                <input name="file" type="text" placeholder={"or direct media link"} onChange={(e) => setFile(e.target.value)} />
            </form>
          </div>
          <div id="qrError" />
        </div>
    </>
  );
};

export default ReplyPopout;



