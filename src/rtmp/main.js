const NodeMediaServer = require('node-media-server');
const config = require('../rtmpConfig');

const nms = new NodeMediaServer(config);

/*
|--------------------------------------------------------------------------
| BEFORE STREAM START
|--------------------------------------------------------------------------
*/

const StreamKeys = [
    "qLlgMhnELBFQHxaQeqSI"
];

nms.on('prePublish', (id, StreamPath, args) => {
    console.log('STREAM PATH:', StreamPath);
    const streamKey = StreamPath.split('/')[2];
    console.log('STREAM NAME:', streamKey);
    
    const isValid = StreamKeys.includes(streamKey);
    if (!isValid) {
        console.log(`Rejecting invalid stream key: ${streamKey}`);
        let session = nms.getSession(id);
        if (session) session.reject();
    } else {
        console.log(`Accepted stream with key: ${streamKey}`);
    }
});

/*
|--------------------------------------------------------------------------
| AFTER STREAM START
|--------------------------------------------------------------------------
*/

nms.on('postPublish', (id, StreamPath, args) => {
    const streamKey = StreamPath.split('/')[2];
    console.log('Running...');
    console.log('STREAM PATH:', StreamPath);
    console.log('STREAM NAME:', streamKey);
    
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

nms.on('donePublish', (id, StreamPath, args) => {
    const streamKey = StreamPath.split('/')[2];
    console.log('================================');
    console.log('STREAM ENDED');
    console.log('STREAM PATH:', StreamPath);
    console.log('STREAM NAME:', streamKey);
});

/*
|--------------------------------------------------------------------------
| START RTMP SERVER
|--------------------------------------------------------------------------
*/

nms.run();

module.exports = nms;