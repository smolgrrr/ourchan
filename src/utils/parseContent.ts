export function parseContent(content: string) {
    const lines = content.split('\n');
    const data: { [key: string]: string } = {};
    lines.forEach((line) => {
      const [key, value] = line.split(': ');
      data[key.toLowerCase()] = value;
    });
    return {
      subject: data.subject,
      comment: data.comment,
      file: data.file,
    };
  }