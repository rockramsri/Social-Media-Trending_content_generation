import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Rotate3D } from 'lucide-react';
import type { VideoOrientation } from '../types';
import { cn } from '../lib/utils';

interface VideoPlayerProps {
  videoUrl: string | null;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [orientation, setOrientation] = useState<VideoOrientation>('landscape');

  // Toggle video orientation between landscape and portrait
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'landscape' ? 'portrait' : 'landscape');
  };

  return (
    <div className="w-80 bg-spotify-black p-4 h-full">
      <div className="bg-spotify-darkgray rounded-xl shadow-lg p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-spotify-green font-bold text-xl">Preview</h2>
          {videoUrl && (
            <button
              onClick={toggleOrientation}
              className="p-2 rounded-full hover:bg-spotify-black/50 transition-colors"
              title={`Switch to ${orientation === 'landscape' ? 'portrait' : 'landscape'} mode`}
            >
              <Rotate3D className="w-5 h-5 text-spotify-green" />
            </button>
          )}
        </div>
        
        <div className={cn(
          "rounded-lg overflow-hidden bg-spotify-black shadow-inner transition-all duration-300",
          orientation === 'landscape' ? 'aspect-video' : 'aspect-[9/16]'
        )}>
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              controls
              className="rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-spotify-lightgray p-4 text-center">
              Generate a video to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}