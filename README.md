![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# 🚀 GroqSight

> Real-time audio eyes for the visually impaired, powered by Groq’s ultra-fast contextual understanding.

---

## 📌 Problem Statement

**Problem Statement 1 – Weave AI magic with Groq**

---

## 🎯 Objective

GroqSight empowers visually impaired individuals by providing real-time, intelligent, and contextual audio descriptions of their environment. Using Groq’s blazing-fast inference capabilities, the tool helps users navigate safely, interpret social situations, and access information instantly — transforming visual data into meaningful, personalized audio output.

---

## 🧠 Team & Approach

### Team Name:  
`NeuroNova`

### Team Members:  
- **Utsav Singhal** ([GitHub](https://github.com/UTSAVS26) / [LinkedIn](https://linkedin.com/in/utsavsinghal2604)) - **Team Lead & AI/ML Expert**  
- **Nandani Daga** ([GitHub](https://github.com/) / [LinkedIn](https://linkedin.com/in/)) - **ML Enthusiast & Backend Engineer**  
- **Shreya Gosavi** ([GitHub](https://github.com/Shreyagosavi811) / [LinkedIn](https://www.linkedin.com/in/shreya-gosavi-297485299/)) - **Full-Stack Developer & Creative Thinker**  
- **Kavya** ([GitHub](https://github.com/) / [LinkedIn](https://linkedin.com/in/)) - **UX Developer & Product Designer**

### Your Approach:  
- We chose this problem to make accessibility tools faster, smarter, and more human-friendly using Groq.  
- Key challenges addressed: latency, contextual reasoning, and custom user preferences.  
- Breakthroughs included dynamic scene narration, live camera streaming to backend, and Groq-powered description generation.

---

## 🛠️ Tech Stack

### Core Technologies Used:
- Frontend: React, Tailwind CSS
- Backend: Python, Flask
- Database: None (stateless prototype)
- APIs: Groq (Vision/NLP Models), Web Speech API (TTS)
- Hosting: Docker + Docker Compose

### Sponsor Technologies Used (if any):
- ✅ **Groq:** Used for real-time inference on vision models (object detection, OCR, emotion recognition)  
- [ ] **Monad:**  
- [ ] **Fluvio:**  
- [ ] **Base:**  
- [ ] **Screenpipe:**  
- [ ] **Stellar:**  

---

## ✨ Key Features

- ✅ Real-Time Object & Scene Detection  
- ✅ Text Recognition (OCR) with Audio Output  
- ✅ Context-Aware Descriptions (e.g. "a person sitting at a café table")  
- ✅ Customizable Audio Profiles (speed, verbosity, tone)  

---

## 📽️ Demo & Deliverables

- **Demo Video Link:** [https://youtu.be/demo-link](https://youtu.be/demo-link)  
- **Pitch Deck / PPT Link:** [https://slides.com/groqsight-deck](https://slides.com/groqsight-deck)  

---

## ✅ Tasks & Bonus Checklist

- ✅ **All members of the team completed the mandatory task**  
- ✅ **All members completed Bonus Task 1 - Badge sharing (2 points)**  
- ✅ **All members completed Bonus Task 2 - Sprint.dev signup (3 points)**  

---

## 🧪 How to Run the Project

### Requirements:
- Node.js (v18+), Python (3.10+), Docker & Docker Compose
- Groq API key

### Local Setup:
```bash
# Clone the repo
git clone https://github.com/UTSAVS26/groqsight

# Run everything using Docker Compose
cd groqsight
docker-compose up --build
```

### Alternatively, run separately:
```bash
# Backend
cd backend
docker build -t groqsight-backend . 
docker run -d -p 5000:5000 groqsight-backend

# Frontend
cd frontend
docker build -t groqsight-frontend . 
docker run -d -p 3000:3000 groqsight-frontend
```

Ensure Groq credentials are added to your `.env` file in `backend/`.

---

## 🧬 Future Scope

- 📈 Add voice-based scene queries (“What’s in front of me?”)  
- 🛡️ Edge inference for offline mode  
- 🌐 Multi-language audio support & regional customization  
- 🔊 Haptic feedback integration for silent environments  

---

## 📎 Resources / Credits

- Groq SDK & API  
- Microsoft Seeing AI (Research Benchmark)  
- React, Tailwind CSS, Flask  
- Web Speech API for TTS  
- Unsplash / Open Datasets for image testing  

---

## 🏁 Final Words

Building GroqSight was a powerful journey — from brainstorming context-aware audio to optimizing real-time responses with Groq. We're proud to build something impactful and hope it brings us one step closer to inclusive tech for all.

---