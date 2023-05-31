import { Event } from "../types/types";

function extractMediaUrl(content: string){
  const regex = /(https?:\/\/\S+\.(?:jpg|png|jpeg|gif|mp4|webm|mov|webp))/i;
  const match = content.match(regex);
  if (match) {
    return match[0];
     
  } else {
    return '' ;
  }
}


 function extractSubject(tags: string[][]){
    const subjectTag = tags.find(tag => tag[0] === "subject");
    if (subjectTag) {
      return subjectTag[1];
    } else {
      return null;
    }
  }

  function extractZapAddress(tags: string[][]){
    const subjectTag = tags.find(tag => tag[0] === "zapAddress");
    if (subjectTag && subjectTag[1] !== '') {
      return subjectTag[1];
    } else {
      return null;
    }
  }

  export function parseContent(event: Event) {
    const subject = extractSubject(event.tags);
    const zapAddress = extractZapAddress(event.tags);
    const file = extractMediaUrl(event.content);
    const contentWithoutFile = event.content.replace(file, '');

    return {
      subject,
      comment: contentWithoutFile.trim(),
      zapAddress,
      file
    };
  }