# :sparkles: Social Media Trending Content Generation

:rocket: A multi-platform content generation system that analyzes trending data from Twitter, Reddit, and YouTube, generates content recommendations with transcripts & analytics, and even creates deepfake videos using open-source models. Includes an animated avatar demo and a React-based UI for user interaction.

## :star: Features & Capabilities

:chart_with_upwards_trend: Social Media Trending
	•	Fetch trending topics from Twitter, Reddit, and YouTube using their respective APIs.
	•	Combines trending data into a single dataset for content analysis.

:bulb: Content Recommendations
	•	Dynamically generate content ideas based on trending data.
	•	Predictive analytics to estimate reach and impact of each recommendation.

:film_strip: Deepfake Generation
	•	Create deepfake videos using an open-source HuggingFace model (e.g., Sadtalker).
	•	Merge custom transcripts with user-uploaded images for AI-driven video content.

:robot: Chat System
	•	LLM-based chat interface for real-time content updates and interactive recommendations.
	•	Supports promotional content links and user-friendly content edits.

:dancer: Animated Avatar
	•	A Tkinter-based animated avatar demo for personal assistant interactions.
	•	Showcases early-stage avatar design and minimal animation.

:file_folder: Project Structure

```markdown
📦 Social-Media-Trending_content_generation
│
├── Backend
│   ├── animated_avatar.py         # Tkinter GUI for the animated avatar demo
│   ├── chat_system.py             # Chat interface logic with LLM responses
│   ├── content_recommendations.py # Generates recommendations from trending data
│   ├── deepfake_generator.py      # Creates deepfake videos using HuggingFace model
│   ├── main.py                    # Flask API exposing endpoints for the UI
│   ├── requirements.txt           # Python dependencies
│   ├── social_media_trending.py   # Fetches trending topics from Twitter/Reddit/YouTube
│   └── api_config.json            # Optional - for storing API credentials (keys, tokens)
│
└── UI
    ├── node_modules
    ├── public
    ├── src
    │   ├── ...
    │   └── ...
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── ...

```

•	Backend/
Contains Python files for data retrieval, recommendation logic, deepfake generation, chat system, and Flask API endpoints.
•	UI/
A React (or similar) front end that calls the backend API endpoints to display trending data, generate new content, and manage user interactions.

:wrench: Tech Stack

| **Component**          | **Tech Used**                                        |
|------------------------|------------------------------------------------------|
| **Frontend**           | React.js ⚛️                                          |
| **Backend**            | Flask 🍃                                             |
| **Data Retrieval**     | Twitter/Reddit/YouTube APIs, Requests 🕸️             |
| **Deepfake Generation**| HuggingFace (e.g., Sadtalker) 🤖                     |
| **LLM & Chat**         | Custom LLM logic (OpenAI GPT or similar) 🧠          |
| **Analytics & Processing** | Python 🐍, Pandas, NumPy                          |
| **Storage & Logging**  | JSON, CSV, Local/Cloud Storage                       |

:warning: Prerequisites
	1.	Python 3.8+
Make sure you have Python 3.8 or above installed.
	2.	Node.js & npm (or Yarn)
Required if you wish to run the React-based UI.
	3.	API Keys
	•	Twitter, Reddit, and YouTube Data API credentials for fetching trending data.

:arrow_forward: Installation

1️⃣ Clone the Repository
```markdown
git clone https://github.com/your-username/Social-Media-Trending_content_generation.git
cd Social-Media-Trending_content_generation
```
2️⃣ Install Backend Dependencies
```markdown
cd Backend
pip install -r requirements.txt
```
3️⃣ Install UI Dependencies
```markdown
cd ../UI
npm install
```
(Or yarn install if you prefer Yarn.)

:gear: Configuration
	1.	API Credentials
	•	Create a file named api_config.json in the Backend folder (if it does not exist).
```markdown
{
  "twitter": {
    "bearer_token": "YOUR_TWITTER_BEARER_TOKEN"
  },
  "reddit": {
    "client_id": "YOUR_REDDIT_CLIENT_ID",
    "client_secret": "YOUR_REDDIT_CLIENT_SECRET",
    "user_agent": "YOUR_REDDIT_USER_AGENT"
  },
  "youtube": {
    "api_key": "YOUR_YOUTUBE_API_KEY"
  }
}
```
Alternatively, set these credentials as environment variables if you prefer not to store them in a file.

2.	Deepfake Model Setup
	•	The deepfake generation uses a HuggingFace pipeline.
	•	Make sure you install or configure the model as needed (some require additional dependencies).
	3.	Animated Avatar
	•	If you want to run the animated avatar, ensure tkinter is available.
	•	Typically included with Python on most systems.

:runner: Running the Project

Running the Backend
1.	Navigate to the Backend folder:

cd Backend


2.	Start the Flask server:
```markdown
python main.py
```

3.	The server should start on http://127.0.0.1:5000 by default.

Running the UI
1.	In a separate terminal, navigate to the UI folder:
```markdown
cd UI
```

2.	Start the development server (assuming React + Vite):
```markdown
npm run dev
```

3.	Open your browser at the URL shown in the console (often http://127.0.0.1:5173 or similar).

:handshake: Usage

API Endpoints

Once the backend is running, you can access the following endpoints:
	1.	GET /api/recommendations
	•	Generates a list of trending-based content recommendations.
	2.	GET /api/content-info/<content_id>
	•	Retrieves detailed content info for a specific recommendation.
	3.	POST /api/upload-image
	•	Uploads an image file (used for deepfake video generation).
	4.	POST /api/generate-video
	•	Creates a deepfake video based on a topic and the previously uploaded image.
	5.	POST /api/publish-content
	•	Simulates publishing content to social media channels.
	6.	POST /api/confirm-chat-changes
	•	Interacts with the chat system to confirm or modify content changes.

Animated Avatar (Standalone GUI)
	•	animated_avatar.py is a Tkinter application that showcases a simple animated avatar.
To run it:

```markdown
python animated_avatar.py
```

	•	This animator demo does not interact directly with the Flask endpoints; it is purely for demonstration.

:rocket: Future Improvements
	•	Enhanced LLM for deeper content analysis and more creative transcript generation.
	•	Advanced analytics with ML-based reach prediction.
	•	Multilingual support for global audience engagement.
	•	Scalable cloud deployment for high traffic handling.


Thanks for checking out this project!
Feel free to open an issue or pull request if you have suggestions or contributions. We welcome all feedback and collaborations.
