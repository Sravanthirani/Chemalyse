# Chemical Information Prediction Model

## 📌 Project Overview
This project is a *full-stack web application* that predicts the *primary uses, benefits, and disadvantages* of chemicals based on images. The system consists of a *React.js frontend* and a *Node.js backend* that integrates *OCR and machine learning* for chemical recognition.

## 🔧 Features
- 📸 Extracts chemical names from images using *OCR (Tesseract & PyTesseract)*.
- 🧪 Predicts *uses, benefits, and disadvantages* of the extracted chemical names.
- 🤖 Uses a *Random Forest* machine learning model (skincare_model.pkl).
- 🌍 Full-stack application with *React.js frontend* and *Node.js backend*.

## 🛠 Technologies Used
### Frontend
- *React.js*
- *CSS (App.css)*

### Backend
- *Node.js*
- *Python (PyTesseract, OCR)*
- **Machine Learning (Random Forest Model - skincare_model.pkl)**

## 📂 Project Structure

```
Your-Repository-Name/
│-- README.md
│-- FrontEnd/
│   ├── frontend/  # Contains all frontend-related files
│   │   ├── App.js   # Main React component
│   │   ├── App.css  # Stylesheet
│-- BackEnd/
│   ├── app.js          # Connects frontend and backend, handles image processing
│   ├── OCR_text.py       # Runs PyTesseract for OCR
|   ├── generate.py 
│   ├── skincare_model.pkl # Random Forest trained model
```

## 🔹 How to Run
### **Method 1: Run Frontend and Backend Separately**
1. **Download the repository** as a ZIP file from GitHub and extract it.
2. **Setup and run the backend:**
   ```sh
   cd BackEnd
   npm install
   node app.js  # Starts the backend server
   ```
3. **Setup and run the frontend:**
   Open a new terminal window and navigate to the `FrontEnd/frontend` folder:
   ```sh
   cd FrontEnd/frontend
   npm install
   npm start  # Starts the frontend React app
   ```
4. **Access the application**
   - The backend should be running at: `http://localhost:5000`
   - The frontend should be running at: `http://localhost:3000`.

---

### **Method 2: Run Both with a Single Command**
1. **Download the repository** as a ZIP file from GitHub and extract it.
2. **Setup dependencies in the root directory:**
   ```sh
   npm install concurrently
   ```
3. **Setup backend and frontend:**
   ```sh
   cd BackEnd
   npm install
   ```
   ```sh
   cd FrontEnd/frontend
   npm install
   ```
4. **Run both frontend and backend together:**
   Navigate to the root directory and run:
   ```sh
   npm start
   ```
5. **Access the application**
   - The backend should be running at: `http://localhost:5000`
   - The frontend should be running at: `http://localhost:3000`

## 👨‍💻 Contribution
If you'd like to contribute:
1. *Fork* the repository.
2. Create a new *branch* (feature-branch).
3. Make changes and *commit* them.
4. Open a *Pull Request*.

## 📝 License
This project is open-source under the *MIT License*.

---
🔗 *Maintainer:* Sravanthi Rani Anupoju
📩 *Contact:* anupojusravanthirani@gmail.com

