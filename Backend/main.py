import os
import time
from flask import Flask, request, jsonify, abort, send_file
from werkzeug.utils import secure_filename

# Import functions from our modules
from content_recommendations import compile_all_trending, generate_recommendations
from deepfake_generator import generate_deepfake_video
from chat_system import llm_generate_response

app = Flask(__name__)

# Folder to store uploaded images
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Global store for recommendations (in a production system, use a database)
global_recommendations = {}

# ---------------------------------------
# Endpoint: /api/confirm-chat-changes
# ---------------------------------------
@app.route('/api/confirm-chat-changes', methods=['POST'])
def confirm_chat_changes():
    """
    Receives a chat message and returns an LLM-generated response.
    Expects JSON payload: { "user_input": "Your message here" }
    """
    if not request.json or 'user_input' not in request.json:
        abort(400, description="Missing required field: 'user_input'")
    
    user_input = request.json['user_input']
    response = llm_generate_response(user_input)
    return jsonify({"status": "success", "response": response})


# ---------------------------------------
# Endpoint: /api/publish-content
# ---------------------------------------
@app.route('/api/publish-content', methods=['POST'])
def publish_content():
    """
    Simulate publishing content (e.g. to YouTube).
    Expects JSON payload with content details (e.g. videoUrl, title, transcript, socialMediaChannels, etc.)
    """
    if not request.json:
        abort(400, description="Missing JSON payload")
    
    # In a real implementation, validate and publish the content.
    time.sleep(1)  # simulate processing delay
    return jsonify({
        "status": "success",
        "message": "Content successfully published to selected channels!"
    })


# ---------------------------------------
# Endpoint: /api/upload-image
# ---------------------------------------
@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    """
    Accepts an image file upload for deepfake generation.
    Returns the filename that can be used in subsequent requests.
    """
    if 'file' not in request.files:
        abort(400, description="Missing file upload with key 'file'")
    
    file = request.files['file']
    if file.filename == '':
        abort(400, description="No file selected")
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    
    return jsonify({"status": "success", "filename": filename})


# ---------------------------------------
# Endpoint: /api/generate-video
# ---------------------------------------
@app.route('/api/generate-video', methods=['POST'])
def generate_video():
    """
    Generates a deepfake video.
    Expects JSON payload with:
      - topic: a trending topic string
      - source_image_filename: the filename of the previously uploaded image
    Returns the generated video file.
    """
    data = request.get_json()
    if not data:
        abort(400, description="Missing JSON payload")
    
    topic = data.get("topic")
    source_image_filename = data.get("source_image_filename")
    if not topic or not source_image_filename:
        abort(400, description="Missing required fields: 'topic' and 'source_image_filename'")
    
    source_image_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(source_image_filename))
    if not os.path.exists(source_image_path):
        abort(400, description="Source image not found")
    
    # Set output video path (ensure proper write permissions)
    output_video_filename = f"deepfake_{secure_filename(topic)}.mp4"
    output_video_path = os.path.join("outputs", output_video_filename)
    if not os.path.exists("outputs"):
        os.makedirs("outputs")
    
    # Generate the deepfake video using our module
    result = generate_deepfake_video(source_image_path, topic, output_video_path)
    
    if result.get("status") == "success":
        return send_file(
            output_video_path,
            mimetype='video/mp4',
            as_attachment=True,
            download_name=output_video_filename
        )
    else:
        return jsonify(result), 500


# ---------------------------------------
# Endpoint: /api/content-info/<content_id>
# ---------------------------------------
@app.route('/api/content-info/<content_id>', methods=['GET'])
def content_info(content_id):
    """
    Retrieves content info (such as transcript and predicted reach) for a given recommendation.
    The recommendation must have been generated via /api/recommendations.
    """
    content = global_recommendations.get(content_id)
    if content:
        return jsonify(content)
    else:
        abort(404, description="Content not found")


# ---------------------------------------
# Endpoint: /api/recommendations
# ---------------------------------------
@app.route('/api/recommendations', methods=['GET'])
def recommendations():
    """
    Generates a list of content recommendations based on current trending topics.
    Each recommendation is assigned a unique ID (e.g. rec1, rec2, etc.) for later reference.
    """
    try:
        trending_topics = compile_all_trending()
        recs = generate_recommendations(trending_topics)
        
        # Assign unique IDs and store globally for subsequent lookup
        global global_recommendations
        global_recommendations = {}  # clear previous recommendations
        for idx, rec in enumerate(recs, start=1):
            rec_id = f"rec{idx}"
            rec["id"] = rec_id
            global_recommendations[rec_id] = rec
        
        # Return the list of recommendations
        return jsonify({"status": "success", "recommendations": list(global_recommendations.values())})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ----------------------------
# Run the Flask API Server
# ----------------------------
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)