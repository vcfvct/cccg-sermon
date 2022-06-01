import React from 'react';
import './header.css'

export const HeaderComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <a href="https://www.cccgermantown.org" target="blank">
        <img src='/cccg_logo_50x50_trans.webp' alt='logo' />
      </a>
      <h3>
        <a href="https://www.cccgermantown.org" target="blank">基督教德国镇中国教会</a>
        <br />
        <span><a href="https://www.cccgermantown.org" target="blank">Chinese Christian Church of Germantown</a></span>
      </h3>
    </div>
  )
};
