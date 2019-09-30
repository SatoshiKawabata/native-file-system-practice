const tx = document.createElement("textarea") as HTMLTextAreaElement;

async function writeFile(handler: any, text: string): Promise<void> {
  const writer = await handler.createWriter();
  await writer.truncate(0);
  await writer.write(0, text);
  await writer.close();
}

// mount open button
const btn = document.createElement("button");
btn.textContent = "Open file and edit!";
document.body.appendChild(btn);
btn.addEventListener("click", async (ev: any) => {
  let handler: any = null;
  try {
    handler = await (window as any).chooseFileSystemEntries({
      type: "saveFile",
      accepts: [
        {
          description: "Text file",
          extensions: ["txt"],
          mimeTypes: ["text/plain"]
        }
      ]
    });
  } catch (err) {
    console.log("error", err);
    alert("Please select file");
    return;
  }

  tx.style.width = "80vw";
  tx.style.height = "80vh";
  document.body.appendChild(tx);

  tx.addEventListener("change", async (ev: any) => {
    await writeFile(handler, ev.target.value);
  });

  btn.remove();
});
