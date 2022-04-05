// new post
const newFormHandler = async function (event) {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector(
    'textarea[name="post-body"]'
  ).value;

  console.log(postTitle);
  console.log(postContent);
  // new post request with title and content as req.body
  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      postTitle,
      postContent,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
};
// event listeners
document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
