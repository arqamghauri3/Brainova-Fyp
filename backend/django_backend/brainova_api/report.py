import os
from openai import OpenAI
import re

client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key="",  # Replace with a secure method in production!
)



def generate_report_from_eeg_file(file_path, prediction, confidence_score, patient_info):
    # with open(file_path, 'r', encoding='utf-8') as f:
    csv_content = file_path.read()
    
    return generate_report_from_eeg(csv_content, prediction, confidence_score, patient_info)


def generate_report_from_eeg(csv_content, prediction, confidence_score, patient_info):
    prompt = f"""
You are a medical AI assistant. Based on the patient's EEG recording (shown below) and the classification result from a deep learning model, generate a structured and understandable medical report in the following format:

1. Title: 
2. Patient Info:
   - Name:
   - Age:
   - Gender:
   - Medical History:
3. EEG Analysis Summary:
4. EEG Data Overview:
5. Key Findings:
6. Interpretation Of EEG Data:
7. Recommendation:
8. Conclusion:

- Patient: {patient_info['name']}, {patient_info['age']} y/o, {patient_info['gender']}
- Medical History: {patient_info['medical_history']}
- Prediction: {prediction} (Confidence: {confidence_score * 100:.2f}%)
- EEG Snippet:
{csv_content[:2000]}
"""

    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful medical assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1500,
        temperature=0.4,
        stream=True
    )

    full_response = ""
    for chunk in stream:
        if chunk.choices and chunk.choices[0].delta:
            content = getattr(chunk.choices[0].delta, "content", None)
            if content:
                print(content, end="", flush=True)
                full_response += content

    return full_response


def extract_field(label, text):
    pattern = rf"## {re.escape(label)}:\s*(.*?)(?=\n## |\Z)"
    match = re.search(pattern, text, re.DOTALL)
    return match.group(1).strip() if match else ""



def generate_html_report(report_data: dict):
    html_template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>EEG Evaluation Report</title>
  <style>
    body {{
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      color: #111827;
      margin: 0;
      padding: 0;
    }}

    .container {{
      max-width: 800px;
      margin: 40px auto;
      background-color: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }}

    header {{
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 30px;
    }}

    header svg {{
      width: 32px;
      height: 32px;
      color: #6366f1;
    }}

    header h1 {{
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      color: #111827;
    }}

    section {{
      margin-bottom: 30px;
    }}

    section h2 {{
      font-size: 18px;
      margin-bottom: 10px;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 5px;
    }}

    section p {{
      margin: 6px 0;
      line-height: 1.6;
    }}

    .signature {{
      margin-top: 50px;
      text-align: right;
    }}

    .signature p {{
      margin: 5px 0;
    }}

    .placeholder-line {{
      display: inline-block;
      width: 200px;
      height: 1px;
      background-color: #6b7280;
      margin-bottom: 4px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
           class="lucide lucide-brain" viewBox="0 0 24 24">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
        <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
        <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
        <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
      </svg>
      <h1>Brainova</h1>
    </header>

    <section>
      <h2>1. Title</h2>
      <p>{report_data["title"]}</p>
    </section>

    <section>
      <h2>2. Patient Info</h2>
      <p><strong>Name:</strong> {report_data["name"]}</p>
      <p><strong>Age:</strong> {report_data["age"]}</p>
      <p><strong>Gender:</strong> {report_data["gender"]}</p>
      <p><strong>Medical History:</strong> {report_data["medical_history"]}</p>
    </section>

    <section>
      <h2>3. EEG Analysis Summary</h2>
      <p><strong>Classification:</strong> {report_data["classification"]}</p>
      <p><strong>Confidence Score:</strong> {report_data["confidence"]}</p>
    </section>

    <section>
      <h2>4. EEG Data Overview</h2>
      <p>{report_data["data_overview"]}</p>
    </section>

    <section>
      <h2>5. Key Findings</h2>
      <p>{report_data["key_findings"]}</p>
    </section>

    <section>
      <h2>6. Interpretation Of EEG Data</h2>
      <p>{report_data["interpretation"]}</p>
    </section>

    <section>
      <h2>7. Recommendation</h2>
      <p>{report_data["recommendation"]}</p>
    </section>

    <section>
      <h2>8. Conclusion</h2>
      <p>{report_data["conclusion"]}</p>
    </section>

    <section class="signature">
      <div class="placeholder-line"></div>
      <p>Dr. [Your Name Here]</p>
      <p>Neurologist</p>
    </section>
  </div>
</body>
</html>
    """
    # with open(filename, "w", encoding="utf-8") as f:
    #     f.write(html_template)

    # print(f"\n\n✅ HTML report saved as: {filename}")
    return html_template


# === EXECUTION FLOW ===

  # report_text = generate_report_from_eeg_file(
  #     "D:/Final Year Project/Brainova/Brainova/backend/django_backend/media/file_uploads/P16.csv", 
  #     "Parkinson's Detected", 
  #     0.99,
  #     patient_info
  # )

# report_data = {
#     "title": extract_field("1. Title", report_text),
#     "name": re.search(r"\*\*Name:\*\* (.*)", report_text).group(1),
#     "age": re.search(r"\*\*Age:\*\* (.*)", report_text).group(1),
#     "gender": re.search(r"\*\*Gender:\*\* (.*)", report_text).group(1),
#     "medical_history": re.search(r"\*\*Medical History:\*\* (.*)", report_text).group(1),
#     "classification": extract_field("3. EEG Analysis Summary", report_text),
#     "confidence": "95.00%",  # Already known
#     "data_overview": extract_field("4. EEG Data Overview", report_text),
#     "key_findings": extract_field("5. Key Findings", report_text),
#     "interpretation": extract_field("6. Interpretation Of EEG Data", report_text),
#     "recommendation": extract_field("7. Recommendation", report_text),
#     "conclusion": extract_field("8. Conclusion", report_text),
# }


# generate_html_report(report_data, f"EEG_Report_{report_data['name'].replace(' ', '_')}.html")
