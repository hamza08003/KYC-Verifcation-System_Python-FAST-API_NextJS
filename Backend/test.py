import dotenv
import os

dotenv.load_dotenv()

def get_cred_json():
    print(os.getenv("GOOGLE_PRIVATE_KEY_ID"))

if __name__ == "__main__":
    get_cred_json()
