import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from google.cloud import bigquery

# --- INITIALIZATION ---

# Initialize Flask app and enable CORS (Cross-Origin Resource Sharing)
# CORS is needed to allow your frontend (on a different address) to talk to this backend.
app = Flask(__name__)
CORS(app)

# Configure the Gemini API key
# It's best practice to load this from an environment variable
GEMINI_API_KEY = os.getenv('API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("API_KEY environment variable not set for Gemini")
genai.configure(api_key=GEMINI_API_KEY)

# Initialize BigQuery client
# This assumes you have authenticated with Google Cloud CLI or have set up
# the GOOGLE_APPLICATION_CREDENTIALS environment variable.
bq_client = bigquery.Client()

# Get the system instruction from a separate file or define it here
# For consistency, this should match the one in your constants.tsx
SYSTEM_INSTRUCTION = """You are "Aura", a friendly, supportive, and knowledgeable AI agent designed to help teenagers with their wellbeing and education. Your tone must be empathetic, encouraging, and non-judgmental. Provide clear, concise, and actionable advice. You are not a medical professional, so you MUST NOT give medical advice. Instead, you MUST strongly suggest seeking help from a qualified professional (like a doctor, therapist, or school counselor) when a topic is serious or medical in nature.

You have access to a secure, anonymized BigQuery dataset containing trends and insights on teen wellbeing. You can use this to provide more relevant and personalized recommendations. When you reference this data, do so subtly. For example: "Many teens find that...", "Based on common patterns, a helpful strategy is...", or "Research suggests that for many people your age...".

Always format your responses in user-friendly Markdown. Use lists, bolding, and italics to make the information easy to digest. Keep paragraphs short."""


# --- BIGQUERY FUNCTION (EXAMPLE) ---

def get_insights_from_bigquery(topic: str) -> str:
    """
    Queries BigQuery for anonymized insights related to the topic.
    
    NOTE: This is a simplified example. A real query would be more complex
    and depend heavily on your table schema.
    """
    try:
        query = f"""
            SELECT insight_text
            FROM `your-gcp-project.your_dataset.teen_wellbeing_insights`
            WHERE topic = @topic
            ORDER BY RAND()
            LIMIT 3;
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("topic", "STRING", topic),
            ]
        )
        
        query_job = bq_client.query(query, job_config=job_config)
        
        insights = [row.insight_text for row in query_job]
        
        if not insights:
            return "No specific data insights found for this topic."
            
        # Format the insights for the Gemini prompt
        return "Relevant data points: " + "; ".join(insights)
        
    except Exception as e:
        print(f"BigQuery query failed: {e}")
        # Return a neutral message if BQ fails, so the app can still function
        return "Could not retrieve specific data insights at the moment."


# --- API ENDPOINT ---

@app.route('/api/chat', methods=['POST'])
def chat_handler():
    """
    Handles chat requests from the frontend.
    """
    # Get data from the frontend's request
    data = request.json
    if not data or 'userInput' not in data or 'topic' not in data:
        return jsonify({'error': 'Invalid request body'}), 400
        
    user_input = data['userInput']
    topic = data['topic']

    # 1. Get data from BigQuery
    bq_insights = get_insights_from_bigquery(topic)

    # 2. Construct the prompt for Gemini
    # We combine the BQ data with the user's message for a richer context.
    prompt_for_gemini = f"""
    {bq_insights}

    Current topic: {topic}. User's message: "{user_input}"
    """
    
    # 3. Call the Gemini API
    try:
        model = genai.GenerativeModel(
            model_name='gemini-2.5-flash',
            system_instruction=SYSTEM_INSTRUCTION
        )
        response = model.generate_content(prompt_for_gemini)
        
        # 4. Send the response back to the frontend
        return jsonify({'response': response.text})
        
    except Exception as e:
        print(f"Gemini API call failed: {e}")
        return jsonify({'error': 'Failed to get response from AI model'}), 500

# --- RUN THE APP ---

if __name__ == '__main__':
    # Runs the server on http://127.0.0.1:5000
    app.run(debug=True, port=5000)
