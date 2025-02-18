# Cell 1: Environment Setup
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(".env")

# Set up OpenAI with your API key
api_key = os.getenv("OPENIA_KEY")
openai.api_key = api_key

# Function to interact with OpenAI API
def get_openai_response(prompt, model="gpt-4"):
    response = openai.Completion.create(
        engine=model,
        prompt=prompt,
        max_tokens=2048,
        temperature=0.7,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response.choices[0].text.strip()


    # Function to gather user information interactively
def gather_information():
    sections = {
        "Education": "Tell me about your degrees, institutions attended, and any notable academic achievements.",
        "Profile Summary": "Provide your current professional summary or statement for LinkedIn and resume.",
        "Experience": "Describe your detailed work experience, including roles, responsibilities, and key achievements.",
        "Projects": "Mention any notable projects you've worked on, highlighting contributions and technologies used.",
        "Volunteering": "Have you done any volunteering work? If so, please detail.",
        "References": "Provide details about any professional references you have.",
        "Skills": "List your professional skills.",
        "Interests": "What are your personal interests?",
        "Certifications": "List any professional certifications you hold.",
        "Awards": "Mention any awards you have received.",
        "Publications": "Detail any publications you have contributed to.",
        "Languages": "What languages do you speak, and at what proficiency level?"
    }
    
    user_info = {}
    for section, query in sections.items():
        response = input(f"{section} - {query}\n")
        user_info[section] = response

    return user_info



# Function to create guidance for resume and LinkedIn profile
def create_guidance(user_info):
    for section, content in user_info.items():
        prompt = (
            f"Generate guidance for optimizing the {section} section in a technical resume:"
            f"\n{content}"
        )
        result = get_openai_response(prompt)
        print(f"Guidance for {section}:\n{result}\n")



# Main function to integrate all steps
def run_assistant():
    print("Welcome to the Resume and LinkedIn Assistant!")
    user_info = gather_information()
    create_guidance(user_info)

# Uncomment and run the main function
run_assistant()