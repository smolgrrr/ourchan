

export async function openFile(): Promise<File | undefined> {
    return new Promise(resolve => {
      const elm = document.createElement("input");
      elm.type = "file";
      elm.onchange = (e: Event) => {
        const elm = e.target as HTMLInputElement;
        if (elm.files) {
          resolve(elm.files[0]);
        } else {
          resolve(undefined);
        }
      };
      elm.click();
    });
  }