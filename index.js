const Queue = require('bull');

const time = () => new Date().getTime() / 1000;


async function closeBeingSlowIssue() {
  const videoQueue = new Queue('video transcoding', 'redis://127.0.0.1:6379');

  const t1 = time();

  await videoQueue.close();

  console.log("time elapsed: ", time() - t1); // logs almost 0.5s
}

closeBeingSlowIssue();
