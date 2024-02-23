"use client";
import * as React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  //video path
  //   let videoUrl = "/videos/next.mp4";

  return (
    <div>
      <ReactPlayer
        width="720px"
        height="410px"
        url={videoUrl}
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />
      <source src={videoUrl} type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;
