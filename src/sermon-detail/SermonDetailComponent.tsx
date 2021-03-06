import React, { useContext } from "react";
import './SermonDetailStyles.scss';
import { Link, useLocation } from "react-router-dom";
import { BackArrow } from '../icons/BackArrow';
import { Mp3Icon } from '../icons/Mp3Icon';
import { VideoIcon } from '../icons/VideoIcon';
import { PodCastMeta } from "../types";
import { SermonContext } from "../sermon-context";

export const SermonDetailComponent = () => {
  const { state, search } = useLocation();
  // const [searchParams] = useSearchParams();
  const sermons = useContext(SermonContext)

  let podCast: PodCastMeta | undefined = state as PodCastMeta | undefined;
  const searchParams = new URLSearchParams(search)
  if (!podCast && searchParams.has('id')) {
    podCast = sermons.find(s => s.id.toString() === searchParams.get('id'));
  }

  const preacherIcon = getPreacherIcon(podCast?.author);
  return podCast ? (
    <div className="detail-container">
      <div className="back-container">
        <Link to='/'>
          <div style={{ maxWidth: '60px', display: 'flex' }}><BackArrow /> <div style={{ marginLeft: '10px' }}>Back</div></div>
        </Link>
      </div>
      <div className="detail-meta" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {preacherIcon && <div className='preacher-icon' ><img src={preacherIcon} alt={podCast.author} /></div>}
          {podCast.author}
        </div>
        <div style={{ marginRight: '20px' }}></div>
        <div> {podCast.eventDate ? new Date(podCast.eventDate).toLocaleDateString() : ''}</div>
      </div>
      <h1>{podCast.title}</h1>
      <div style={{ margin: '20px' }}>{podCast.eventName} {podCast.description}</div>
      {podCast.youtubeUrl && (
        <div className="video-container">
          <iframe src={podCast.youtubeUrl} id='youtube-embed' title='youtube-embed' width="560" height="315" allowFullScreen></iframe>
        </div> )}
      <div className='download-container'>
        {podCast.audio && <a href={podCast.audio} target="blank"><div className='download-link'><Mp3Icon />??????????????????</div></a>}
        {podCast.video && <a href={podCast.video} target="blank"><div className='download-link'><VideoIcon />??????????????????</div></a>}
      </div>
    </div>
  ): <></>
}

function getPreacherIcon(name?: string) {
  switch (name) {
    case '???????????????':
      return './ppl/jianwen.jpg';
    case '????????????':
      return './ppl/wuwei.jpg';
    case '???????????????':
      return './ppl/dejun.jpg';
    case '????????????':
      return './ppl/zhangyong.jpg';
    default:
      return '';
  }
}
