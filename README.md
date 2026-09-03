# HSC Revision Platform

An AI-powered revision tool for HSC students, generating flashcards, practice questions, essay parts, MCQ quizzes, and study notes using the Groq API.

## Features

- **Flashcards**: Quick memory cards for key concepts
- **Practice Questions**: Exam-style questions with NESA-aligned marking criteria
- **Essay Parts**: Guided essay writing with feedback on specific sections
- **MCQ Quizzes**: Multiple-choice questions with explanations
- **Study Notes**: Structured notes with key points for each topic

## API Endpoints

### POST `/api/generate`
Generate a complete revision set for a topic.

**Request:**
```json
{ "topic": "Modern History: Russia and the Soviet Union" }
```

**Response:** Complete revision set with cards, practice questions, essays, MCQs, and notes.

### POST `/api/question`
Generate a single practice question or MCQ.

**Request:**
```json
{
  "subject": "Modern History",
  "topic": "Russian Revolution",
  "mode": "practice" or "mcq"
}
```

### POST `/api/mark`
Mark a student's response using AI.

**Request:**
```json
{ "prompt": "Mark this essay response..." }
```

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set environment variable: `GROQ_API_KEY=your_api_key`
4. Run dev server: `npm run dev`

## Environment Variables

- `GROQ_API_KEY`: Your Groq API key (recommended and required for new deployments).
- `GROQ_APIKEY`, `GROQ_KEY`, `GroqAPI`, and `GroqApi`: Supported legacy key names. The first non-empty value is used in that order.
- `GROQ_MODEL`: Optional Groq model override. Defaults to `openai/gpt-oss-120b`. Remove an old `GROQ_MODEL=llama-3.3-70b-versatile` Vercel setting, or update it to a model available to your Groq account.

After adding or changing an environment variable in Vercel, redeploy the project so the serverless API functions receive the updated value. Do not expose the key to browser code or commit it to a `.env` file.

## Architecture

- `api/utils.js`: Shared utilities (Groq API calls, JSON extraction)
- `api/generate.js`: Full revision set generation
- `api/question.js`: Single question generation
- `api/mark.js`: AI marking engine
