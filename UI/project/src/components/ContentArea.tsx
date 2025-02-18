import React from 'react';
import { Upload, Video, Share2, BarChart2 } from 'lucide-react';
import type { ContentInfo } from '../types';
import { cn } from '../lib/utils';

interface ContentAreaProps {
  content: ContentInfo | null;
  onUploadImage: () => void;
  onGenerateVideo: () => void;
  onPublish: () => void;
}

export function ContentArea({ content, onUploadImage, onGenerateVideo, onPublish }: ContentAreaProps) {
  if (!content) {
    return (
      <div className="flex-1 bg-spotify-black p-4 flex items-center justify-center">
        <div className="bg-spotify-darkgray rounded-xl shadow-lg p-8">
          <p className="text-spotify-lightgray">Select a recommendation to view content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-spotify-black p-4 space-y-4 overflow-y-auto">
      {/* Header Card */}
      <div className="bg-spotify-darkgray rounded-xl shadow-lg p-6">
        <div className="flex items-start gap-6">
          <div className="relative group">
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-48 h-48 object-cover rounded-lg shadow-lg group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <button
                onClick={onUploadImage}
                className="bg-spotify-green text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90"
              >
                Change Image
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-4">{content.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={onUploadImage}
                title="Upload Image"
                className="w-10 h-10 flex items-center justify-center bg-spotify-green text-white rounded-full hover:bg-opacity-80 transition-colors shadow-md hover:shadow-lg"
              >
                <Upload size={20} />
              </button>
              <button
                onClick={onGenerateVideo}
                title="Generate Video"
                className="w-10 h-10 flex items-center justify-center bg-spotify-darkgray text-white rounded-full hover:bg-opacity-80 transition-colors shadow-md hover:shadow-lg border border-spotify-lightgray/20"
              >
                <Video size={20} />
              </button>
              <button
                onClick={onPublish}
                title="Publish Content"
                className="w-10 h-10 flex items-center justify-center bg-spotify-darkgray text-white rounded-full hover:bg-opacity-80 transition-colors shadow-md hover:shadow-lg border border-spotify-lightgray/20"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Card */}
      <div className="bg-spotify-darkgray rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="text-spotify-green" />
          <h2 className="text-white font-semibold text-xl">Potential Impact</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-spotify-black rounded-lg p-4">
            <p className="text-spotify-lightgray text-sm mb-1">Post Impressions</p>
            <p className="text-white text-2xl font-bold">{content.analytics.postImpressions}</p>
          </div>
          <div className="bg-spotify-black rounded-lg p-4">
            <p className="text-spotify-lightgray text-sm mb-1">Followers</p>
            <p className="text-white text-2xl font-bold">{content.analytics.followers}</p>
          </div>
          <div className="bg-spotify-black rounded-lg p-4">
            <p className="text-spotify-lightgray text-sm mb-1">Profile Views</p>
            <p className="text-white text-2xl font-bold">{content.analytics.profileViews}</p>
          </div>
          <div className="bg-spotify-black rounded-lg p-4">
            <p className="text-spotify-lightgray text-sm mb-1">Search Appearances</p>
            <p className="text-white text-2xl font-bold">{content.analytics.searchAppearances}</p>
          </div>
        </div>
      </div>

      {/* Transcript Card */}
      <div className="bg-spotify-darkgray rounded-xl shadow-lg p-6">
        <h2 className="text-white font-semibold text-xl mb-4">Transcript</h2>
        <div className="bg-spotify-black rounded-lg p-4 shadow-inner">
          <p className="text-spotify-lightgray whitespace-pre-wrap">
            {content.transcript}
          </p>
        </div>
      </div>
    </div>
  );
}