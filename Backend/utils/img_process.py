import cv2


def write_image(vid_path: str, user_id: str):
    cap = cv2.VideoCapture(vid_path)
    frames = []
    frame_paths = []

    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame_path = f'temp/{user_id}_frame_{frame_count}.jpg'
        cv2.imwrite(frame_path, frame)

        frames.append(frame)
        frame_count += 1

    return frame_count
