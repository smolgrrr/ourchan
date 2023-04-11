import React, { useState, useEffect } from "react";
import NostrImg from '../../utils/NostrImg';
import {
  type Event as NostrEvent,
} from "nostr-tools";
import { useNostrEvents } from "nostr-react";
import { createZap } from "../../utils/Zaps";
import { parseContent } from "../../utils/parseContent";

type PopoutProps = {
  event: NostrEvent;
  closePopout: () => void;
};

const ZapPopout: React.FC<PopoutProps> = ({
  event,
  closePopout,
}) => {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });
  const [isDragging, setIsDragging] = useState(false);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState(100);

  const { events } = useNostrEvents({
    filter: {
        kinds: [0],
        authors: [event.pubkey],
        },
    });

    let { zapAddress } = parseContent(event);
    const zapButton = () => {
        if (zapAddress) {
            let message = comment + " " + file;
            createZap(zapAddress, amount, message, events[0], event).then(result => {
              setInvoice(result);
            }).catch(error => {
                alert('Zap failed');
                return;
            });
        }
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
            zIndex: 1000000,
            textAlign: "left",
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
          }}>Zap Thread No.<span id="qrTid">..{event.id.substring(event.id.length - 10)}</span><a onClick={closePopout}> X</a></div>
          <input type="hidden" defaultValue={4194304} name="MAX_FILE_SIZE" /><input type="hidden" defaultValue="regist" name="mode" /><input id="qrResto" type="hidden" defaultValue={422237188} name="resto" />
          <div id="qrForm">
            <form encType="multipart/form-data" onSubmit={zapButton}><input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
            <input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
            <div><label>Amount (sats):* </label><input name="zap" type="number" style={{width: '70px'}} step="100" value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)} /></div>
            <div><textarea name="com" cols={36} rows={4} wrap="soft" placeholder={"Comment (optional)"} onChange={(e) => setComment(e.target.value)} /></div>
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
    </>
  );
};

export default ZapPopout;



