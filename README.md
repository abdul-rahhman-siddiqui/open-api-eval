# OpenAPI Evaluator

A tool for automated OpenAPI (Swagger) API evaluation, endpoint testing, log analysis, and AI-powered Q&A.

## Screenshots
![1](https://github.com/user-attachments/assets/12ad4f42-d526-4e05-9fdc-5abbee592bca)
![2](https://github.com/user-attachments/assets/692a0179-7d3d-48c4-b7c5-2b57ba0fca3a)
![3](https://github.com/user-attachments/assets/4df77de6-b6fe-4f9d-9879-fc80b8848ec7)
![4](https://github.com/user-attachments/assets/2f7c1625-8635-4cbf-87b8-01b49c3f2d70)
![5](https://github.com/user-attachments/assets/4e7173be-8ae8-4080-94bc-efb8f240ca9e)



## Features

- Upload or link OpenAPI specs
- Automated endpoint testing & logging
- Status code and endpoint summary reports
- RAG AI Assistant (Gemini/GPT) for API/log Q&A

## Quick Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB (local or Atlas)
- Gemini API Key

### 1. Backend (Express.js)

```sh
cd rest-api-evaluator/backend
npm install
cp .env.example .env   # Edit with your Mongo URI and Gemini key
npm run dev
```

### 2. Python RAG Service

```sh
cd rest-api-evaluator/llm-rag-service
pip install -r requirements.txt
cp .env.example .env   # Add your GOOGLE_API_KEY
python app.py
```

### 3. Frontend (React)

```sh
cd rest-api-evaluator/frontend
npm install
npm run dev
```

### 4. (Optional) Node.js RAG Backend

```sh
cd rest-api-evaluator/node-rag-backend
npm install
cp .env.example .env   # Add your GOOGLE_API_KEY
npm start
```

## Usage

- Open [http://localhost:5173](http://localhost:5173)
- Upload/link OpenAPI spec, view reports, use AI Assistant

## Environment Variables

- `MONGO_URI` — MongoDB connection string
- `GEMINI_API_KEY` or `GOOGLE_API_KEY` — Gemini API key
