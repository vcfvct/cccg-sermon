import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PodCastMeta } from "../sermon-list/SermonList";

export const SermonDetailComponent = () => {
  const { state } = useLocation();
  const podCast = state as PodCastMeta;
  console.log(podCast);
  return (
    <div>
      <Link to='/'>Back</Link>
      <div>{podCast.title}</div>
      <div>{podCast.author}</div>
      <div>{podCast.eventName}</div>
      <div>{podCast.description}</div>
      <div>{podCast.eventDate.toLocaleString()}</div>
      <div><a href={podCast.audio}>音频文件</a></div>
      <div><a href={podCast.video}>视频文件</a></div>
      <iframe src={podCast.youtubeUrl} id='youtube-embed' title='youtube-embed'></iframe>
    </div>
  )
}
