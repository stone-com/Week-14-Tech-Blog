// login handler
const loginFormHandler = async function (event) {
  event.preventDefault();
  // save username and password inputs to variables
  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');
  // send post request to api/user/login
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      // pass in username and password values as req.body
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('login failed');
  }
};
// add event listeners
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
