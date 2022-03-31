// new post handler
const newFormHandler = async function (event) {
  event.preventDefault();
  // save input values to variables
  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector(
    'textarea[name="post-body"]'
  ).value;

  await fetch(`/api/post`, {
    //   post request, using posttitle and postcontent as req.body
    method: 'POST',
    body: JSON.stringify({
      postTitle,
      postContent,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
};
//   adding event listeners
document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);
