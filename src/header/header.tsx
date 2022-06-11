import React from 'react';
import './header.css'

export const HeaderComponent = () => {
  const homeUrl = 'https://www.cccgermantown.org';
  return (
    <div className='app-header'>
      <a href={homeUrl} target="blank" style={{ height: '100%' }}>
        <img src='./cccg_logo_50x50_trans.webp' alt='logo' style={{ height: '100%', width: 'auto' }} />
      </a>
      <a className='header-link' href={homeUrl} target="blank">
        基督教德国镇中国教会
          <br />
          Chinese Christian Church of Germantown
      </a>
    </div>
  )
};
