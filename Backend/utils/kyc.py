from utils.face_detection import extract_face_encodings, compare_faces
from utils.face_detection import extract_face_encodings, compare_faces
from utils.img_process import write_image
from typing import ByteString
from utils.ocr import perform_ocr, pdf_to_image, read_image
from utils.name_address_extraction import extract_name_and_address_gpt
from utils.prompts_loader import load_prompts
from utils.string_comparison import compare_names, compare_addresses

from fastapi import UploadFile


def face_verification(id_image: ByteString, selfie_video: ByteString, user_id: str):
    # Face verification
    match_found = False

    vid_path = f'temp/{user_id}_selfie.mp4'

    with open(vid_path, "wb") as f:
        f.write(selfie_video)

    id_face_encoding = extract_face_encodings(id_image)

    import os

    frame_count = 0
    if id_face_encoding is not None:
        print("Face detected in ID document. Capturing video for live verification...")
        # Capture video and extract frames
        import cv2

        frame_count = write_image(vid_path, user_id)

        match_found = False

        for i in range(frame_count):
            frame = cv2.imread(f'temp/{user_id}_frame_{i}.jpg')
            print(f"Processing frame {i}") if i % 10 == 0 else None

            live_face_encoding = extract_face_encodings(cv2.imencode('.jpg', frame)[1].tobytes())

            os.remove(f'temp/{user_id}_frame_{i}.jpg')
            if live_face_encoding is not None:
                res, dist = compare_faces(id_face_encoding, live_face_encoding)
                if res[0] and dist <= 0.55:
                    print(f"Face verification successful on frame {i}")
                    match_found = True
                    break

        if not match_found:
            print("Face verification failed")
        else:
            print("Face verification successful")
    else:
        print("No face detected in ID document")

    # cleanup
    os.remove(vid_path)

    return match_found


async def doc_verification(id_front_image_binary_content: ByteString,
                           id_back_image_binary_content: ByteString, bill: UploadFile):
    from main import vision_client

    id_front_ocr_text, _ = perform_ocr(vision_client, id_front_image_binary_content)
    id_back_ocr_text, _ = perform_ocr(vision_client, id_back_image_binary_content)
    id_ocr_text = id_front_ocr_text + "\n" + id_back_ocr_text
    bill_ocr_text = ""

    # OCR on the bill
    if bill.content_type == "application/pdf":
        bill_images = pdf_to_image(bill)

        for img in bill_images:
            bill_image_binary_content = read_image(img)
            bill_ocr_text += perform_ocr(vision_client, bill_image_binary_content)
    else:
        bill_image_binary_content = await bill.read()
        bill_ocr_text, _ = perform_ocr(vision_client, bill_image_binary_content)

    from main import gpt_client

    id_name_address_extraction_prompt, bill_name_address_extraction_prompt = load_prompts()

    bill_name_address = extract_name_and_address_gpt(gpt_client, bill_ocr_text, bill_name_address_extraction_prompt)

    id_name_address = extract_name_and_address_gpt(gpt_client, id_ocr_text, id_name_address_extraction_prompt)

    bill_name = bill_name_address.split("Address:")[0].replace("Name:", "").strip()
    bill_address = bill_name_address.split("Address:")[1].strip()
    id_name = id_name_address.split("Address:")[0].replace("Name:", "").strip()
    id_address = id_name_address.split("Address:")[1].strip()

    print(f"Bill Name: {bill_name}")
    print(f"Bill Address: {bill_address}")
    print(f"ID Name: {id_name}")
    print(f"ID Address: {id_address}")

    name_match = compare_names(bill_name, id_name)
    address_match = compare_addresses(bill_address, id_address)

    if name_match and address_match:
        print("Name and address match between bill and ID. Verification successful.")
    else:
        print("Name and address do not match. Verification failed.")

    return name_match and address_match
