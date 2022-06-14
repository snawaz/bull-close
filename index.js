const Queue = require('bull');

const time = () => new Date().getTime() / 1000;


async function closeBeingSlowIssue() {
  const videoQueue = new Queue('video transcoding', 'redis://127.0.0.1:6379');

  // this causes videoQueue.bclient to be initialized, and videoQueue.bclientInitialized becomes true
  // then videoQueue.whenCurrentJobsFinished gets executed completely, invoking redisClientDisconnect()
  // which takes 0.5 second to timeout
  videoQueue.getNextJob();

  const t1 = time();

  await videoQueue.close();

  console.log("time elapsed: ", time() - t1); // logs almost 0.5s
}

closeBeingSlowIssue();
