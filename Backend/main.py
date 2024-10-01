from fastapi import FastAPI
from routes import kyc
from auth.google_cloud_vision_auth import authenticate_vision_client
from auth.gpt_auth import authenticate_opeani_client
import dotenv
from utils.auth import get_cred_json
import os
from fastapi.middleware.cors import CORSMiddleware


dotenv.load_dotenv()
# print(os.getenv("GOOGLE_PRIVATE_KEY"))
app = FastAPI()

vision_client = authenticate_vision_client(get_cred_json())
gpt_client = authenticate_opeani_client(os.getenv("OPENAI_API_KEY"))

app.include_router(kyc.router)  

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)

@app.get("/")
async def root():
    return {"message": "dw ddw"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
