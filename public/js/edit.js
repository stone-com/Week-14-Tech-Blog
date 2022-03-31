const postId = document.querySelector('input[name="post-id"]').value;
console.log('testing');
console.log(postId);

// function for editing  a post
const editFormHandler = async (event) => {
  event.preventDefault();
  // save input values to variables to use later
  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector(
    'textarea[name="post-body"]'
  ).value;

  // PUT fetch call to api/post/postId
  const response = await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      // pass in title and content to req.body
      postTitle,
      postContent,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response);
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('update failed');
  }
  document.location.replace('/dashboard');
};

// delete post handler
const deleteClickHandler = async () => {
  // send delete request with post Id
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
  });

  document.location.replace('/dashboard');
};
// adding event handlers
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
