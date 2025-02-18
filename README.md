
# Social Media Trending Content Generation

A content generation system that analyzes data from various social media platforms (Twitter, Reddit, YouTube) to find trending topics, generates content recommendations (including transcripts and analytics), and can even create deepfake videos using an open-source model. The project also includes an animated avatar demo and a React-based UI for user interaction.

:bookmark_tabs: Table of Contents
	•	Features
	•	Project Structure
	•	Prerequisites
	•	Installation
	•	Configuration
	•	Running the Project
	•	Running the Backend
	•	Running the UI
	•	Usage
	•	API Endpoints
	•	Animated Avatar (Standalone GUI)
	•	License

:star: Features
	1.	Social Media Trending
Fetch trending topics from Twitter, Reddit, and YouTube using their respective APIs.
	2.	Content Recommendations
Generate recommendations based on trending data, with transcripts (via an LLM) and simple analytics.
	3.	Deepfake Generation
Create deepfake videos using an open-source HuggingFace model (e.g., Sadtalker).
	4.	Chat System
Simple chat interface that uses an LLM to handle user requests (e.g., content updates, recommendations).
	5.	Animated Avatar
A standalone Tkinter GUI that demonstrates an early version of a personal assistant avatar.

:file_folder: Project Structure

Social-Media-Trending_content_generation/
│
├── Backend/
│   ├── animated_avatar.py
│   ├── chat_system.py
│   ├── content_recommendations.py
│   ├── deepfake_generator.py
│   ├── main.py
│   ├── requirements.txt
│   ├── social_media_trending.py
│   └── api_config.json (optional - for storing API credentials)
│
└── UI/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── ...
    │   └── ...
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── ...

	•	Backend/
Contains Python files that implement trending data retrieval, content recommendations, deepfake generation, and the chat system.
	•	UI/
A React (or similar) front end that calls the backend API endpoints to display trending data, generate new content, and manage user interactions.

:warning: Prerequisites
	1.	Python 3.8+
Make sure you have Python 3.8 or above installed.
	2.	Node.js & npm (or Yarn)
Required for running the UI portion if you wish to use the provided front end.
	3.	API Keys
	•	Twitter, Reddit, and YouTube Data API credentials for fetching trending data.

:arrow_forward: Installation
	1.	Clone the Repository

git clone https://github.com/your-username/Social-Media-Trending_content_generation.git
cd Social-Media-Trending_content_generation


	2.	Install Backend Dependencies

cd Backend
pip install -r requirements.txt


	3.	Install UI Dependencies

cd ../UI
npm install

(Or yarn install if you prefer Yarn.)

:gear: Configuration
	1.	API Credentials
Create a file named api_config.json in the Backend folder (if it does not exist). Example:

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

Alternatively, set these credentials as environment variables if you prefer not to store them in a file.

	2.	Deepfake Model Setup
The deepfake generation uses a HuggingFace pipeline.
Make sure you install or configure the model as needed. Some models require additional dependencies.
	3.	Animated Avatar
If you want to run the animated avatar, ensure tkinter is available. (It’s usually included with Python on most systems.)

:runner: Running the Project

Running the Backend
	1.	Navigate to the Backend folder:

cd Backend


	2.	Run the Flask server:

python main.py


	3.	The server should start on http://127.0.0.1:5000 by default.

Running the UI
	1.	In a separate terminal, navigate to the UI folder:

cd UI


	2.	Start the development server (assuming React + Vite):

npm run dev


	3.	Open your browser at the URL shown in the console (often http://127.0.0.1:5173 or similar).

:handshake: Usage

API Endpoints

Once the backend is running, you can access the following endpoints:
	1.	GET /api/recommendations
Generates a list of trending-based content recommendations.
	2.	GET /api/content-info/<content_id>
Retrieves detailed content info for a specific recommendation.
	3.	POST /api/upload-image
Uploads an image file (used for deepfake video generation).
	4.	POST /api/generate-video
Creates a deepfake video based on a topic and the previously uploaded image.
	5.	POST /api/publish-content
Simulates publishing content to social media channels (e.g., YouTube).
	6.	POST /api/confirm-chat-changes
Interacts with the chat system to confirm or modify content changes.

Animated Avatar (Standalone GUI)
	•	animated_avatar.py is a Tkinter application that showcases a simple animated avatar.
To run it:

python animated_avatar.py


	•	This animator demo does not interact directly with the Flask endpoints; it is purely for demonstration.

If you have any questions, suggestions, or contributions, feel free to open an issue or submit a pull request.


	•	This animator demo does not interact directly with the Flask endpoints; it is purely for demonstration.

