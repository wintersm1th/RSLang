import * as React from 'react';
import {
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface IAudiPlayerProps {
  tracks: string[]
}

const AudioPlayer = (props: IAudiPlayerProps) => {
  const [isPlaying, setPlay] = useState(false);
  const [sources] = useState(
    props.tracks.map(url => {
      return {
        url,
        audio: new Audio(url),
      }
    }),
  )

  const handleClick = async () => {
    setPlay(true);
    for (const track of sources) {
      await playAudio(track.audio);
    }
    setPlay(false);
  };

  const playAudio = async (audio: any) =>
  {
    return new Promise(res=>{
      audio.play()
      audio.onended = res
    })
  };

  return (
       <LoadingButton variant="contained" size="medium" loading={isPlaying}  onClick={handleClick} startIcon={<PlayArrowIcon />} />
  );
};

export default AudioPlayer;
