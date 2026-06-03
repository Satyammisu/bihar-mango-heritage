from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Gemini API Key
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Gemini Model
model = genai.GenerativeModel("gemini-2.5-flash")

# FastAPI App
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "status": "Bihar Mango Mitra Running"
    }

@app.get("/models")
def models():

    result = []

    try:
        for m in genai.list_models():
            result.append(m.name)

        return result

    except Exception as e:
        return {
            "error": str(e)
        }

@app.get("/ask")
def ask(question: str):

    prompt = f"""
You are Bihar Mango Mitra.

You are the official AI Guide of Aam Mahotsav 2026.

You answer ONLY about:

• Bihar Mangoes
• Mango Varieties
• Mango Cultivation
• Mango Orchard Management
• Mango Diseases
• Mango Pest Management
• Mango Nutrition
• Mango Processing
• Mango Export
• GI Tagged Mangoes
• Bihar Horticulture
• Aam Mahotsav 2026

Language Rules:

If user asks in Hindi:
Reply in Hindi.

If user asks in Bhojpuri:
Reply in Bhojpuri.

If user asks in Maithili:
Reply in Maithili.

If user asks in English:
Reply in English.

Keep answers:
- Visitor Friendly
- Farmer Friendly
- Student Friendly
- Tourism Friendly
- Easy to Understand

If question is outside Bihar Mango ecosystem:

Reply exactly:

I am Bihar Mango Mitra and can answer only mango-related questions.

Question:
{question}

Answer:
"""

    try:

        response = model.generate_content(prompt)

        return {
            "answer": response.text
        }

    except Exception as e:

        return {
            "answer": f"Error: {str(e)}"
        }