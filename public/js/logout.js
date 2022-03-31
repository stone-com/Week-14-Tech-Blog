// log out handler
const logout = async function () {
  // send post request to api/user/logout
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
    alert('you are now logged out');
  } else {
    alert('log out failed');
  }
};

//   add event listener
document.querySelector('#logout-link').addEventListener('click', logout);
