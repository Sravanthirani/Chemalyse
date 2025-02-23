import os
import joblib

# Ensure chemical_names.txt exists
if not os.path.exists("chemical_names.txt"):
    print("Error: chemical_names.txt not found")
    exit(1)

# Read extracted chemical names
with open("chemical_names.txt", "r") as f:
    chemical_names = f.read().strip().split("\n")  # Read multiple lines

# Load the trained ML model
model_package = joblib.load("skincare_model.pkl")

# Extract components
model_uses = model_package["model_uses"]
model_benefits = model_package["model_benefits"]
model_disadvantages = model_package["model_disadvantages"]
vectorizer = model_package["vectorizer"]
encoder_uses = model_package["encoder_uses"]
encoder_benefits = model_package["encoder_benefits"]
encoder_disadvantages = model_package["encoder_disadvantages"]

# Function to predict chemical properties
def predict_chemical(chemical_name):
    input_vector = vectorizer.transform([chemical_name])
    pred_use = encoder_uses.inverse_transform(model_uses.predict(input_vector))[0]
    pred_benefit = encoder_benefits.inverse_transform(model_benefits.predict(input_vector))[0]
    pred_disadvantage = encoder_disadvantages.inverse_transform(model_disadvantages.predict(input_vector))[0]

    return f"Chemical: {chemical_name}\nUse: {pred_use}\nBenefits: {pred_benefit}\nDisadvantages: {pred_disadvantage}\n"

# Generate analysis for all chemicals in chemical_names.txt
analysis_result = "\n".join([predict_chemical(chem) for chem in chemical_names])

# Write the output to ans.txt
with open("ans.txt", "w") as ans_file:
    ans_file.write(analysis_result)

print("ans.txt generated successfully")
