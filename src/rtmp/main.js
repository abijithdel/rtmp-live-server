const NodeMediaServer = require("node-media-server");
const config = require("../rtmpConfig");
const { getAStreamKey, changeStreamStatus } = require("../live/utility");

const nms = new NodeMediaServer(config);

/*
|--------------------------------------------------------------------------
| BEFORE STREAM START
|--------------------------------------------------------------------------
*/

const StreamKeys = ["qLlgMhnELBFQHxaQeqSI"];

nms.on("prePublish", async (id, StreamPath, args) => {
  let session;

  try {
    console.log("STREAM PATH:", StreamPath);

    // safer extraction
    const streamKey = StreamPath?.split("/")?.pop();
    console.log("STREAM KEY:", streamKey);

    session = nms.getSession(id);
    if (!session) return;

    // invalid format check
    if (!streamKey) {
      console.log("Rejecting: missing stream key");
      session.reject();
      return;
    }

    // DB check
    const keyFromDB = await getAStreamKey(streamKey);

    // reject if not found
    if (!keyFromDB || !keyFromDB.status) {
      console.log(`Rejecting invalid stream key: ${streamKey}`);
      session.reject();
      return;
    }

    // optional extra safety check (if you still want compare)
    if (keyFromDB.key !== streamKey) {
      console.log(`Rejecting mismatch stream key: ${streamKey}`);
      session.reject();
      return;
    }
    changeStreamStatus('running', streamKey)
    console.log(`Accepted stream with key: ${streamKey}`);
  } catch (err) {
    console.error("prePublish error:", err.message);

    if (session) session.reject();
  }
});

/*
|--------------------------------------------------------------------------
| AFTER STREAM START
|--------------------------------------------------------------------------
*/

nms.on("postPublish", (id, StreamPath, args) => {
  const streamKey = StreamPath.split("/")[2];
  console.log("Running...");
  console.log("STREAM PATH:", StreamPath);
  console.log("STREAM NAME:", streamKey);

  // Note: Node Media Server automatically spawns FFmpeg based on the
  // `trans` configuration in rtmpConfig.js (hls: true).
  // Do NOT manually spawn FFmpeg here, as it will cause duplicate processes
  // and file write conflicts.
});

/*
|--------------------------------------------------------------------------
| STREAM ENDED
|--------------------------------------------------------------------------
*/

nms.on("donePublish", (id, StreamPath, args) => {
  const streamKey = StreamPath.split("/")[2];
  console.log("================================");
  console.log("STREAM ENDED");
  console.log("STREAM PATH:", StreamPath);
  console.log("STREAM NAME:", streamKey);
  changeStreamStatus('closed', streamKey)
});

/*
|--------------------------------------------------------------------------
| START RTMP SERVER
|--------------------------------------------------------------------------
*/

nms.run();

module.exports = nms;
