import axios from "axios";
import FileSaver from "file-saver";

export const downloadApp = async () => {
  await axios
    .post("/download")
    .then((res) => {
      FileSaver.saveAs(
        new Blob([res.data], { type: "application/x-msdownload" }),
        "MeruScreenshotMonitor.exe"
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
