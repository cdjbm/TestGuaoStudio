export const userService = {
  login,
};
function login(email, password) {
  const http = 'http://localhost:3001';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${http}/users/login`, requestOptions)
    .then(response => response.json())
    .then(data => {
      // login successful if there's a user in the response
      console.log(data);
      if (data) {
        debugger;
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        // data.authdata = window.btoa(email + ':' + password);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', JSON.stringify(data.token));
      }

      return data;
    });
}
