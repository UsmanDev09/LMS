"use client";
import * as React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  onCanPlay?: () => void;
  onEnded?: () => void;
}

const VideoPlayer = ({
  videoUrl,
  title,
  onCanPlay,
  onEnded,
}: VideoPlayerProps) => {
  //video path
  //   let videoUrl = "/videos/next.mp4";

  return (
    <div>
      <ReactPlayer
        width="100%"
        height="100%"
        url={videoUrl}
        title={title}
        onCanplay={onCanPlay}
        onEnded={onEnded}
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
