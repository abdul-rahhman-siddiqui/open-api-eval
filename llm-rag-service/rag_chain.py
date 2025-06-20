import os
import json
from dotenv import load_dotenv
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.docstore.document import Document

load_dotenv()

def build_rag_chain(latestSummary, logs_data):
    # 🔄 Parse if input is a string (sent as JSON string from frontend)
    if isinstance(latestSummary, str):
        latestSummary = json.loads(latestSummary)

    if isinstance(logs_data, str):
        try:
            logs_data = json.loads(logs_data)
        except:
            logs_data = logs_data.strip().splitlines()

    # 🧠 Format logs into readable text (method path → status)
    logs_text = "\n".join([
        f"{log.get('method', '').upper()} {log.get('path', '')} → {log.get('status', '')}"
        for log in logs_data
        if isinstance(log, dict)
    ])

    # 📄 Combine all text
    swagger_text = json.dumps(latestSummary, indent=2)
    full_text = f"{swagger_text}\n\nLogs:\n{logs_text}"

    # ✂️ Split text into chunks
    splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = splitter.create_documents([full_text])

    # 🔍 Embedding + Vector Store (using Gemini)
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vectorstore = Chroma.from_documents(docs, embeddings)

    # 🤖 Gemini-Pro LLM for answering
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0.2,
        convert_system_message_to_human=True
    )

    # 🧠 Create the Retrieval-QA chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever()
    )
    print("input to the model")
    print(vectorstore.as_retriever())
    return qa_chain
