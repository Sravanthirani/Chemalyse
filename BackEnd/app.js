const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const cors = require('cors'); 

const app = express();
const port = 5000;

app.use(cors());
// Enable CORS and serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle OCR image upload and processing
app.post('/analyze', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    const imageBuffer = req.file.buffer;
    const imagePath = path.join(__dirname, 'temp_image.jpg');
    fs.writeFileSync(imagePath, imageBuffer);

    const pythonProcess = spawn('python', ['OCR_text.py', imagePath]);

    let output = '';
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
    });

    pythonProcess.on('close', (code) => {
        fs.unlinkSync(imagePath);  // Cleanup temporary image

        if (code === 0) {
            const outputFilePath = path.join(__dirname, 'chemical_names.txt');
            fs.writeFileSync(outputFilePath, output);

            res.json({
                message: 'OCR completed successfully.',
                extractedText: output,
                file: 'chemical_names.txt'
            });
        } else {
            res.status(500).json({ error: 'Failed to extract text using OCR' });
        }
    });
});

// Handle "Generate" button click to process ans.txt
app.get('/generate', (req, res) => {
    const chemicalNamesPath = path.join(__dirname, 'chemical_names.txt');
    const ansFilePath = path.join(__dirname, 'ans.txt');

    if (!fs.existsSync(chemicalNamesPath)) {
        return res.status(400).json({ error: 'No chemical names extracted yet' });
    }

    // Call the Python script to generate ans.txt
    const generateProcess = spawn('python', ['generate.py']);

    generateProcess.on('close', (code) => {
        if (code === 0 && fs.existsSync(ansFilePath)) {
            const ansContent = fs.readFileSync(ansFilePath, 'utf8');
            res.json({ generatedText: ansContent });
        } else {
            res.status(500).json({ error: 'Failed to generate analysis' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
