import type { ContentInfo, Recommendation, Analytics } from '../types';

const BASE_URL = '/api';

// Fallback analytics data
const generateAnalytics = (): Analytics => ({
  postImpressions: Math.floor(Math.random() * 500) + 200,
  followers: Math.floor(Math.random() * 300) + 100,
  profileViews: Math.floor(Math.random() * 200) + 50,
  searchAppearances: Math.floor(Math.random() * 50) + 10,
});

// Sample video URLs (using sample videos that actually exist)
const sampleVideos: Record<string, string> = {
  rec1: "https://youtu.be/pnDdv2U762A",
  rec2: "https://youtu.be/sEbstw6ndH4",
  rec3: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  rec4: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  rec5: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
};

const script1 = `INTRO: Upbeat music plays. The screen fades in to show a modern newsroom background. A host, a young energetic presenter, stands on the left side of the screen. On the right, a cartoonish medieval king with a golden crown and royal robe sits on a floating throne.

HOST:
"Welcome back to The Truth Unveiled! Today, we've got a wild financial update about Donald Trump's social media company, Truth Social. And to help us break it down, I have with me... King Factalot!"

KING FACTALOT:
"Greetings, common folk! What dire news from the kingdom of digital media dost thou bring today?"

HOST:
"Well, King, Truth Social's parent company, Trump Media & Technology Group, just reported a massive loss of $400.9 million last year! And to make things worse, their revenue actually declined by 12%, leaving them with just $3.6 million for the whole year."

KING FACTALOT:
"Alas! A kingdom built on tweets and posts, yet it doth not prosper? What foul sorcery is this?"

HOST:
"Not exactly sorcery, but the company blames part of its losses on a revenue-sharing deal with an undisclosed ad partner. That means whatever money they made, they had to share a chunk of it with someone else."

KING FACTALOT:
"A mysterious deal shrouded in secrecy! A most peculiar business strategy, indeed."

HOST:
"And get this—after Trump won the U.S. presidential election in November, he transferred all of his shares, worth about $4 billion on paper, to the Donald J. Trump Revocable Trust."

KING FACTALOT:
"Four billion? That's enough gold to build a fortress! But who now controls this treasure hoard?"

HOST:
"Trump's eldest son, Donald Trump Jr., is the sole trustee, meaning he alone has the power to make decisions about those shares."

KING FACTALOT:
"A prince ruling over his father's kingdom! I have seen this tale before… oft does it end in great intrigue."

HOST:
"It sure does! Now, as for Truth Social itself, the company isn't sharing the usual numbers social media platforms do, like how many users they have, how often people use it, or how many ads are actually being seen."

KING FACTALOT:
"No numbers? A kingdom that keeps no census of its people? How dost one rule wisely without knowing their subjects?"

HOST:
"That's a great question! And here's another twist—Trump Media went public in March by merging with a SPAC, or Special Purpose Acquisition Company, called Digital World Acquisition Corp.."

KING FACTALOT:
"Ah yes, the SPAC! A modern-day alchemy that turns private ventures into publicly traded gold, without the toil of a traditional IPO!"

HOST:
"Exactly! But with Truth Social's financial struggles and lack of transparency, investors might start questioning if this kingdom is built on solid ground… or just shaky tweets."

KING FACTALOT:
"A realm in peril, a fortune in flux! What fate awaits this empire, I wonder?"

HOST:
"We'll have to wait and see. But one thing's for sure—this story is far from over. Stay tuned, like and subscribe, and we'll keep you updated on this digital drama!"

KING FACTALOT:
"Farewell, good people! And may thy investments be wise!"

[OUTRO: The screen fades as the host waves and the king vanishes in a magical swirl. The words 'Subscribe for more!' appear on screen.]`;

const script2 = `INTRO: Upbeat music plays. A person stands in a modern studio setup, facing the camera. To their right, an animated medieval king with a golden crown and flowing robe sits on a floating throne.

PERSON:
"Big changes are coming to Reddit, and not everyone's happy about it. The platform is officially planning to introduce paywalls for exclusive content this year! And to help us make sense of this, I've got my good friend, King Factalot!"

KING FACTALOT:
"Ah, a land once known for free speech and open forums! Now, they wish to build walls around their knowledge? What treachery is this?"

PERSON:
"Well, it's not exactly treachery, but it is a major shift. During Reddit's Q4 earnings AMA, CEO Steve Huffman confirmed that paid subreddits are coming. He called it a 'work in progress' and said they're actively building it as we speak."

KING FACTALOT:
"A marketplace of wisdom where entry requires coin! A bold move indeed. But will the people of this realm embrace such a change?"

PERSON:
"That's the big question. One Reddit user asked if they were also building a full marketplace system in 2025. Huffman replied: 'Paid subreddits, yes. A marketplace, probably not, though we'll be laying the foundation for it.'"

KING FACTALOT:
"Ah, so the grand bazaar of Reddit shall be constructed in stages! Tell me, does this scheme fill their royal coffers?"

PERSON:
"Not quite! Reddit's shares dropped 15% after its Q4 earnings report showed user growth below expectations. Investors weren't thrilled about the numbers."

KING FACTALOT:
"A weakened treasury and unrest among the nobles? This does not bode well!"

PERSON:
"And here's another twist—Reddit struck a deal with Google and OpenAI in February to let them train their AI models using Reddit comments. But at the same time, Reddit's traffic took a hit after Google changed its search algorithm."

KING FACTALOT:
"A most dangerous alliance! To aid the great machine overlords while relying on their favor… a double-edged sword, indeed!"

PERSON:
"Exactly! When asked how Reddit would avoid being 'dependent on Google for traffic,' Huffman responded that Reddit has a 'long, deep, and symbiotic' relationship with Google but isn't completely reliant on it."

KING FACTALOT:
"A delicate dance with the giant of search! But will these moves lead to prosperity or downfall?"

PERSON:
"That's what we'll have to wait and see. Reddit is evolving—paywalls, AI deals, shifting traffic sources—but whether it leads to success or a revolt, only time will tell!"

KING FACTALOT:
"Then we shall watch with keen eyes! Until then, fare thee well, and may your gold stay in your own purse!"

PERSON:
"If you want more updates on the latest tech and social media shifts, subscribe now!"

[OUTRO: Screen fades to black with 'Subscribe for more!' text as the king vanishes into a swirl of magic.]`;

const newRecommendationsData = [
  {
    id: "rec1",
    title: "Trump Media reports $400 million in 2024 losses",
    transcript:
      script1,
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    analytics: generateAnalytics(),
  },
  {
    id: "rec2",
    title: "Reddit CEO Says Paywalls Are Coming Soon",
    transcript: script2,
      imageUrl:
      "https://gizmodo.com/app/uploads/2024/10/A-person-looking-at-Reddit-on-their-phone-1400x932.jpg",
    analytics: generateAnalytics(),
  },
  {
    id: "rec3",
    title:
      "No penalties even when deputies share a woman’s nudes after an illegal phone search",
    transcript:
      "Neuralink just tested a brain implant that lets people control computers with their thoughts! 🧠💭🖥️ A paralyzed man just used it to move a mouse on a screen—just by thinking about it! 🖱️ Imagine typing, playing video games, or even controlling a robotic arm just using your mind! 🎮 Elon Musk says this tech could one day let us upload memories, connect minds, or even merge with AI! 🤯 Would YOU get a brain chip? Comment 'brain' if you think this is the future, or ‘no’ if it’s too risky!",
    imageUrl:
      "https://cdn.arstechnica.net/wp-content/uploads/2025/02/GettyImages-1391696700.jpg",
    analytics: generateAnalytics(),
  },
  {
    id: "rec4",
    title:
      "Top US Election Security Watchdog Forced to Stop Election Security Work",
    transcript:
      "&gt; Feb 14, 2025 10:07 PM\n\nYou couldn't pick a better time to bury a story “It’s just politics.”\n\nNo, it is not. I’m angry about what has happened to—and is happening in—U.S. politics today.\n\nI say this with absolute respect for others’ personal beliefs and political affiliations: if you are not mad too, you are not paying attention to what’s actually happening—and you are a huge part of the problem. I don’t say that lightly, and I don’t say it with malice. Please bear with me.\n\nI’ve seen “That’s just/only/simply politics” used as a rationale for what’s going on in the Trump/Vance/Musk administration. No, it is not just politics. It is not something we should expect or accept.\n\nBelow, I use the word “just” in that sense, but even more importantly, as an adjective—with synonyms like reasonable, proper, correct, righteous, and lawful:\n• Respecting the rule of law is just politics.\n• Understanding and defending the plain language of the amended U.S. Constitution is just politics.\n• Following the intent and letter of the law is just politics.\n• The peaceful transition of power after an election is just politics.\n• Establishing and adopting clear ethics guidelines for the new team is just politics.\n• Rejecting bribery, corruption, and undue influence of any sort is just politics.\n• Eliminating (even the appearance of) conflicts of interest is just politics.\n• Nominating competent (not even the best) cabinet members is just politics.\n• Vetting competent staff through well-established methods before delegating authority is just politics.\n• Supporting nonpartisan government employees in the continuation of their sworn duty is just politics.\n• Not demonizing opposing viewpoints is just politics.\n• Avoiding petty retribution against the opposition is just politics.\n• Seeking common ground is just politics \n• Understanding the fundamentals of one’s avowed religion—and not twisting or perverting those principles into hateful bigotry (especially in light of direct feedback from those who shepherd)—is just politics.\n• Embodying the ideals of the American Dream as a shining beacon of what’s possible is just politics.\n• Working FOR the American people is just politics.\n\nThose are my expectations. What are yours?\n\nSTOP ignoring and/or rationalizing the shit they are doing.\n\nNon-Partisan Actions We Can ALL Take:\n• If someone is protesting, listen. Learn why.\n• Add reputable news sources with high journalistic integrity that differ from your usual ones.\n• Compare multiple sources when you hear something, even if—especially if—it sounds good.\n• Think critically and check in with your conscience.\n• Remember your civics lessons!\n• Participate! Write to your representatives, call them, meet them in person. Don’t forget state and local issues and resources.\n• Have conversations (not shouting matches) with your friends, neighbors, and colleagues.\n• Vote with your dollars too.\n\nIf this resonated with you, share it widely.  Send it to your elected officials (in your party or not) and ask them what their expectations are. If they don’t answer, send it to the local paper and have them ask. What would be a better show of integrity than shouting election fraud for half a decade and then gutting whoever is combating fraud. That’s why the 🍊💩 told his cult they will never have to vote again. He and Elon will do it for them. So congress, house, and the senate really have no power huh",
    imageUrl:
      "https://media.wired.com/photos/67aff884bc146803f49a20ac/master/w_2240,c_limit/1229436946",
    analytics: generateAnalytics(),
  },
  {
    id: "rec5",
    title:
      "Trump administration adds note rejecting 'gender ideology' to government websites",
    transcript:
      "This is making my groceries cheaper, right? Because I was promised prices would be going down very quickly. Does this help anyone?\nNo\n\nDoes this definitely hurt people?\nYes\n\nPerfect. Let’s do it. Remove religion from government. Destroy it. Kill it. They are obsessed with peoples genitals. So fucking creepy. Oh yeah, really targeting the important things here. That'll make eggs cheaper, right? Stupid orange moron",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1710894497738-6ad56806c01d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    analytics: generateAnalytics(),
  },
];

// ==================== REPLACE SAMPLE RECOMMENDATIONS ====================

const sampleRecommendations: Recommendation[] = newRecommendationsData;

// ==================== REPLACE SAMPLE CONTENT INFO ====================

const sampleContentInfo: Record<string, ContentInfo> = newRecommendationsData.reduce(
  (acc, item) => {
    acc[item.id] = {
      title: item.title,
      transcript: item.transcript,
      imageUrl: item.imageUrl,
      analytics: item.analytics,
    };
    return acc;
  },
  {} as Record<string, ContentInfo>
);

// A helper function to perform a fetch with a timeout
async function fetchWithTimeout(url: string, options = {}, timeout = 5000) {
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
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/recommendations`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    await new Promise(resolve => setTimeout(resolve, 4000));
    return data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    // Return sample recommendations if the API call fails or times out
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5s delay on fallback as well
    return sampleRecommendations;
  }
}

export async function getContentInfo(id: string): Promise<ContentInfo> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/content-info/${id}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    await new Promise(resolve => setTimeout(resolve, 4000));
    return data;
  } catch (error) {
    console.error("Error fetching content info:", error);
    // Fallback to item ID or rec1 if not found
    await new Promise(resolve => setTimeout(resolve, 5000));
    return sampleContentInfo[id] ?? sampleContentInfo.rec1;
  }
}

export async function uploadImage(file: File): Promise<{ imageUrl: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetchWithTimeout(`${BASE_URL}/upload-image`, {
      method: "POST",
      body: formData,
    });
    console.log(response)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    //await new Promise(resolve => setTimeout(resolve, 3000));
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    // Fallback to a face image URL
    //await new Promise(resolve => setTimeout(resolve, 5000));
    return {
      imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    };
  }
}

export async function generateVideo(data: {
  id: string; // includes an ID for fallback
  title: string;
  transcript: string;
  imageUrl: string;
}): Promise<{ videoUrl: string }> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/generate-video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const videoData = await response.json();
    await new Promise(resolve => setTimeout(resolve, 11000));
    return videoData;
  } catch (error) {
    console.error("Error generating video:", error);
    // Fallback to sample video for this ID or rec1
    await new Promise(resolve => setTimeout(resolve, 5000));
    const fallbackId = sampleVideos[data.id] ? data.id : "rec1";
    return { videoUrl: sampleVideos[fallbackId] };
  }
}

export async function publishContent(data: {
  videoUrl: string;
  title: string;
  content: string;
  socialMediaChannels: string[];
}): Promise<{ status: string; message: string }> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/publish-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const result = await response.json();
    await new Promise(resolve => setTimeout(resolve, 5000));
    return result;
  } catch (error) {
    console.error("Error publishing content:", error);
    await new Promise(resolve => setTimeout(resolve, 5000));
    throw error; // rethrow to handle it outside if needed
  }
}

export async function confirmChatChanges(data: {
  contentId: string;
  context: string;
}): Promise<ContentInfo> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/confirm-chat-changes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const updated = await response.json();
    await new Promise(resolve => setTimeout(resolve, 5000));
    return updated;
  } catch (error) {
    console.error("Error confirming chat changes:", error);
    // Fallback to "rec1"
    await new Promise(resolve => setTimeout(resolve, 5000));
    return sampleContentInfo["rec1"];
  }
}