
import sys
from PIL import Image
import pytesseract

def ocr_image(image_path):
    try:
        # Open image
        image = Image.open(image_path)
        
        # Perform OCR and get extracted text
        extracted_text = pytesseract.image_to_string(image)
        
        # Return the extracted text
        return extracted_text
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    # Get the image path from command line argument
    image_path = sys.argv[1]
    text = ocr_image(image_path)
    print(text)  # Output the text


