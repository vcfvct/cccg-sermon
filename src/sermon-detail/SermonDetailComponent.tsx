import React from "react";
import './SermonDetailStyles.scss';
import { Link, useLocation } from "react-router-dom";
import { PodCastMeta } from "../sermon-list/SermonList";
import { BackArrow } from '../icons/BackArrow';
import { Mp3Icon } from '../icons/Mp3Icon';
import { VideoIcon } from '../icons/VideoIcon';

export const SermonDetailComponent = () => {
  const { state } = useLocation();
  const podCast = state as PodCastMeta;
  console.log(podCast);
  return (
    <div className="detail-container">
      <div className="back-container">
        <Link to='/'>
          <div style={{ maxWidth: '60px', display: 'flex' }}><BackArrow /> <div style={{ marginLeft: '10px' }}>Back</div></div>
        </Link>
      </div>
      <div className="detail-meta" style={{ display: 'flex' }}>
        <div>{podCast.author} </div>
        <div style={{ marginRight: '20px' }}></div>
        <div> {podCast.eventDate?.toLocaleDateString()}</div>
      </div>
      <h1>{podCast.title}</h1>
      <div style={{ margin: '20px' }}>{podCast.eventName}: {podCast.description}</div>
      {podCast.youtubeUrl && <iframe src={podCast.youtubeUrl} id='youtube-embed' title='youtube-embed' width="560" height="315" allowFullScreen></iframe>}
      <div className='download-container'>
        {podCast.audio && <a href={podCast.audio} target="blank"><div className='download-link'><Mp3Icon />音频文件下载</div></a>}
        {podCast.video && <a href={podCast.video} target="blank"><div className='download-link'><VideoIcon/>视频文件下载</div></a>}
      </div>
    </div>
  )
}
