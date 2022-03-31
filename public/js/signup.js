// handler for signing up, creating new user
const signupFormHandler = async function (event) {
  event.preventDefault();
  // save username and password input values to variables
  const username = document
    .querySelector('#username-input-signup')
    .value.trim();
  const password = document
    .querySelector('#password-input-signup')
    .value.trim();
  const response = await fetch('/api/user', {
    //   post to api/user with username and pw as req.body
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('sign up failed');
  }
};
// adding event listener to submit button on form
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
