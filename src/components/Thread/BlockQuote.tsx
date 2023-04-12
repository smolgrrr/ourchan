
// interface BlockQuoteProps {
//   content: string;
// }

// const BlockQuote = ({ content }: BlockQuoteProps) => {
//     const lines = content.split('\n');
//   const formattedContent = content
//     // Replace line breaks with <br>
//     .replace(/\n/g, '<br>');
    

//   return (
//     <blockquote className="postMessage" dangerouslySetInnerHTML={{ __html: formattedContent }}></blockquote>
//   );
// };

// export default BlockQuote;

import React from "react";

interface BlockQuoteProps {
  content: string;
}

const BlockQuote = ({ content }: BlockQuoteProps) => {
  const lines = content.split("\n");
  const result = lines.map((line, index) => {
    if (line.startsWith(">>")) {
      const eventID = line.substring(0, 25);
      return (
        <><a key={index} className="quotelink :hover" href={`#${line.substring(2)}`}>
            &gt;&gt;{line.substring(line.length - 10)}
        </a><br/></>
      );
    } else if (line.startsWith(">")) {
        return <><span key={index} className="quote">{line}</span><br/></>;
    } else {
      return <>{line}<br/></>;
    }
  });

  return <blockquote className="postMessage">{result}</blockquote>;
};

export default BlockQuote;
