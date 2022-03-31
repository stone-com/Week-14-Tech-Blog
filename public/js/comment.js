const postId = document.querySelector('input[name="post-id"]').value;

// event handler for posting a new comment
const commentFormHandler = async (event) => {
  event.preventDefault();
  // save value of comment text input to variable
  const commentContent = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;

  if (commentContent) {
    //   send post request to api/comment with commentcontent as body with postId
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        commentContent,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // reload if response is ok
      document.location.reload();
    } else {
      // alert user if not ok
      alert(response.statusText);
    }
  }
};
// add event listener to submit button on form
document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
