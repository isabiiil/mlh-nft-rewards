import React from 'react'
import btn from './GithubButton.module.css'
import logo from '../../../assets/github-logo.png'
import LoginGithub from 'react-login-github';

const GithubButton = () => {

  
const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret= process.env.REACT_APP_CLIENT_SECRET
const redirect_uri = process.env.REACT_APP_REDIRECT_URI

const onSuccess = (response) => {

  const code = response.code;

  const data = new FormData();

  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    // mode: 'no-cors',
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");
      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      console.log("sucess: ", response);
    })
    .catch((error) => {
      console.log("fail: ", error);
    });
}

const onFailure = response => console.error(response);

  return (
    <>
      <div className={btn.github_btn}>
        <div className={btn.btn_container}>
          <span className={btn.github_btn_icon}>
            <img src={logo} alt="github logo" />
          </span>
          <LoginGithub 
          className={`${btn.github_btn} ${btn.github_btn_text}`}
          clientId={client_id}
          onSuccess={onSuccess}
          onFailure={onFailure}
          />
        </div>
      </div>
    </>
  )
}
      

export default GithubButton