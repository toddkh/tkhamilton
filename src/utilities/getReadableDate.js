import createTimeAgo from 'time-ago';

const timeAgo = createTimeAgo();
const getReadableDate = docPublishedAt => {
  let date = new Date(docPublishedAt);
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const publishedAtTime = date.getTime();

  if (currentTime < publishedAtTime) {
    date = new Date(currentTime - 60000);
  }

  return timeAgo.ago(date);
};

export default getReadableDate;
