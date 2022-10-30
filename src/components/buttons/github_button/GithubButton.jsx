import React from 'react'
import btn from './GithubButton.module.css'
import logo from '../../../assets/github-logo.png'
const GithubButton = () => {
  return (
    <>
      <button className={btn.github_btn}>
        <span className={btn.github_btn_icon}>
          <img src={logo} alt="github logo" />
        </span>
        <span className={btn.github_btn_text}>Sign in with GitHub</span>
      </button>
    </>
  )
}
      

export default GithubButton