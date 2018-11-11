let axios = require("axios");

export function logOut() {
  console.log("LOGOUT REQUEST")
  axios({
    method: 'get',
    url: '../logout',
    headers: {'content-type': 'application/json'},
    params: {
      token: sessionStorage.getItem('token')
    }
  }).then((response) => {
    console.log("response: ", response)
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userInfo')
  })
}