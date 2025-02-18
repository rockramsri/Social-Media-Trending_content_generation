import type { ContentInfo, Recommendation, Analytics } from '../types';

const BASE_URL = '/api';

// A helper function to perform a fetch with a timeout
async function fetchWithTimeout(url: string, options = {}, timeout = 5000): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

export async function getRecommendations(): Promise<Recommendation[]> {
  const response = await fetchWithTimeout(`${BASE_URL}/recommendations`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = await response.json();
  return data;
}

export async function getContentInfo(id: string): Promise<ContentInfo> {
  const response = await fetchWithTimeout(`${BASE_URL}/content-info/${id}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = await response.json();
  return data;
}

export async function uploadImage(file: File): Promise<{ imageUrl: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetchWithTimeout(`${BASE_URL}/upload-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = await response.json();
  return data;
}

export async function generateVideo(data: {
  id: string;
  title: string;
  transcript: string;
  imageUrl: string;
}): Promise<{ videoUrl: string }> {
  const response = await fetchWithTimeout(`${BASE_URL}/generate-video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const videoData = await response.json();
  return videoData;
}

export async function publishContent(data: {
  videoUrl: string;
  title: string;
  content: string;
  socialMediaChannels: string[];
}): Promise<{ status: string; message: string }> {
  const response = await fetchWithTimeout(`${BASE_URL}/publish-content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const result = await response.json();
  return result;
}

export async function confirmChatChanges(data: {
  contentId: string;
  context: string;
}): Promise<ContentInfo> {
  const response = await fetchWithTimeout(`${BASE_URL}/confirm-chat-changes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const updated = await response.json();
  return updated;
}