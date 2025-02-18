import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentArea } from './components/ContentArea';
import { VideoPlayer } from './components/VideoPlayer';
import { Chat } from './components/Chat';
import { Loader2 } from 'lucide-react';
import type { Recommendation, ContentInfo } from './types';
import * as api from './lib/api';

function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contentInfo, setContentInfo] = useState<ContentInfo | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecommendations();
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadContentInfo(selectedId);
    }
  }, [selectedId]);

  async function loadRecommendations() {
    try {
      setLoading(true);
      const data = await api.getRecommendations();
      setRecommendations(data);
    } catch (err) {
      setError('Failed to load recommendations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadContentInfo(id: string) {
    try {
      setLoading(true);
      const data = await api.getContentInfo(id);
      setContentInfo(data);
    } catch (err) {
      setError('Failed to load content information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
  
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
  
      // Show loading **inside** this callback, where the actual upload occurs
      setLoading(true);
  
      try {
        const { imageUrl } = await api.uploadImage(file);
  
        if (contentInfo) {
          setContentInfo({ ...contentInfo, imageUrl });
        }
      } catch (err) {
        setError('Failed to upload image');
        console.error(err);
      } finally {
        // Ensure we remove loading state whether success or error
        setLoading(false);
      }
    };
  
    input.click();
  }

  async function handleGenerateVideo() {
    if (!contentInfo) return;

    try {
      setLoading(true);
      const { videoUrl } = await api.generateVideo({
        title: contentInfo.title,
        transcript: contentInfo.transcript,
        imageUrl: contentInfo.imageUrl,
      });
      setVideoUrl(videoUrl);
    } catch (err) {
      setError('Failed to generate video');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if (!contentInfo || !videoUrl) return;

    try {
      setLoading(true);
      await api.publishContent({
        videoUrl,
        title: contentInfo.title,
        content: contentInfo.transcript,
        socialMediaChannels: ['YouTube', 'Instagram'],
      });
    } catch (err) {
      setError('Failed to publish content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-spotify-black flex items-center justify-center">
        <div className="bg-spotify-darkgray rounded-xl shadow-lg p-8 max-w-md">
          <p className="text-red-500 text-center mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              loadRecommendations();
            }}
            className="w-full bg-spotify-green text-white rounded-full py-2 hover:bg-opacity-80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-spotify-black text-white relative">
      <Sidebar
        recommendations={recommendations}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ContentArea
        content={contentInfo}
        onUploadImage={handleUploadImage}
        onGenerateVideo={handleGenerateVideo}
        onPublish={handlePublish}
      />
      <VideoPlayer videoUrl={videoUrl} />
      <Chat
        currentContentId={selectedId}
        onContentUpdate={(updatedContent) => {
          setContentInfo(updatedContent);
        }}
      />
      
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-spotify-darkgray rounded-xl shadow-lg p-6 flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-spotify-green" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;