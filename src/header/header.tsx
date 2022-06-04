import React from 'react';
import './header.css'

export const HeaderComponent = () => {
  return (
    <div className='app-header'>
      <a href="https://www.cccgermantown.org" target="blank">
        <img src='./cccg_logo_50x50_trans.webp' alt='logo' />
      </a>
      <h1>
        <a className='header-link' href="https://www.cccgermantown.org" target="blank">基督教德国镇中国教会</a>
        <br />
        <span><a className='header-link' href="https://www.cccgermantown.org" target="blank">Chinese Christian Church of Germantown</a></span>
      </h1>
    </div>
  )
};
