import React from 'react';
import './header.css'

export const HeaderComponent = () => {
  const homeUrl = 'https://www.cccgermantown.org';
  return (
    <div className='app-header'>
      <a href={homeUrl} target="blank">
        <img src='./cccg_logo_50x50_trans.webp' alt='logo' />
      </a>
      <h1>
        <a className='header-link' href={homeUrl} target="blank">基督教德国镇中国教会</a>
        <br />
        <a className='header-link' href={homeUrl} target="blank">Chinese Christian Church of Germantown</a>
      </h1>
    </div>
  )
};
