import { Event } from "../types/types";

function extractMediaUrl(content: string){
  const regex = /(https?:\/\/\S+\.(?:jpg|png|gif))/i;
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

  export function parseContent(event: Event) {
    const subject = extractSubject(event.tags);
    const file = extractMediaUrl(event.content);
    const contentWithoutFile = event.content.replace(file, '');

    return {
      subject: subject,
      comment: contentWithoutFile.trim(),
      file
    };
  }