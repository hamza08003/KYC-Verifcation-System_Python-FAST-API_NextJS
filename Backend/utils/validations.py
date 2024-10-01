from fastapi import UploadFile
from typing import Annotated, List



id_content_types = ["image/jpeg", "image/png", "image/jpg"]
bill_content_types = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
selfie_content_types = ["video/mp4"]

def validate_kyc_files(front_id: List[UploadFile], back_id: List[UploadFile], bill: List[UploadFile], selfie: List[UploadFile]) -> str:
    error = ""
    # get docs and ame from multipart form data
    if len(front_id) > 1 or len(back_id) > 1 or len(bill) > 1 or len(selfie) > 1:
        error = "All files are required and must be one"
        
    # check all file are present
    elif front_id[0].filename == "" or back_id[0].filename == "" or bill[0].filename == "" or selfie[0].filename == "":
        error = "All files are required"

    elif selfie[0].size > 2 * 1024 * 1024:
        error = "Selfie must not be more than 20MB"
    
    # check if files are images and not more than 2MB
    elif front_id[0].content_type not in id_content_types :
        error = "Front ID must be an image"
    elif back_id[0].content_type not in id_content_types :
        error = "Back ID must be an image"
    elif bill[0].content_type not in bill_content_types :
        error = "Bill must be an image or pdf"
    elif selfie[0].content_type not in selfie_content_types :
        error = "Selfie must be a video"
    elif front_id[0].size > 2 * 1024 * 1024 or back_id[0].size > 2 * 1024 * 1024 or bill[0].size > 2 * 1024 * 1024 or selfie[0].size > 2 * 1024 * 1024:
        error = "Files must not be more than 2MB"

    return error
    