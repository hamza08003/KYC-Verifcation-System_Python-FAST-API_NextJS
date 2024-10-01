import random
from datetime import datetime

from fastapi import APIRouter, Form, Response, status, UploadFile
from typing import Annotated, List
from utils.certificate import cert_gen
from utils.validations import validate_kyc_files
from utils.kyc import face_verification, doc_verification
from uuid import uuid4
import hashlib
router = APIRouter()


# get all files from
@router.post("/kyc")
async def kyc_verification(
        username: Annotated[str, Form()],
        is_business: Annotated[bool, Form()],
        front_id: List[UploadFile],
        back_id: List[UploadFile],
        bill: List[UploadFile],
        selfie: List[UploadFile],
        response: Response):
    user_id = str(uuid4().int)

    if error := validate_kyc_files(front_id, back_id, bill, selfie):
        return {
            "error": error
        }

    selfie_video = await selfie[0].read()

    print(f"Selfie video: {type(selfie_video)}")

    id_front_image_binary_content = await front_id[0].read()
    id_back_image__binary_content = await back_id[0].read()

    # OCR
    is_docs_verified = await doc_verification(id_front_image_binary_content, id_back_image__binary_content, bill[0])

    # Face verification
    face_match_found = face_verification(id_front_image_binary_content, selfie_video, user_id)

    res = {
        "message": f"KYC verification for {"Business" if is_business == True else "Person"} {username} is"
                   f" {"successful" if face_match_found and is_docs_verified else "failed"}",
    }



    # if True:
    if face_match_found and is_docs_verified:
        # hash format: "username,timestamp"
        hash = hashlib.md5(f"{random.randrange(0, 1000)},{username},{str(datetime.now())},passed".encode()).hexdigest()
        # Generate certificate
        res["cert"] = cert_gen("public/cert.png", username, hash)
        res["is_verified"] = True
        res["hash"] = hash
    else:
        res["is_verified"] = False

    return res
