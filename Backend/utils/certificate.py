from PIL import Image, ImageDraw, ImageFont
from datetime import date
import io
import base64


def cert_gen(image_: str | bytes, name: str, hash: str) -> bytes:
    date_now = date.today().strftime("%d/%m/%Y")
    image = Image.open(image_)
    drawable_image = ImageDraw.Draw(image)

    font = ImageFont.truetype("public/font.ttf", 110)
    font_date = ImageFont.truetype("public/font.ttf", 35)

    name_width = drawable_image.textlength(name, font=font)
    date_width = drawable_image.textlength(date_now, font=font_date)
    hash_width = drawable_image.textlength(hash, font=font_date)
    text_color = (0, 0, 0)

    name_x_pos = (image.width - name_width) // 2
    date_x_pos = (image.width - date_width) // 2
    hash_x_pos = (image.width - hash_width) // 2

    drawable_image.text((name_x_pos, image.height / 2.3), name, fill=text_color, font=font)
    drawable_image.text((date_x_pos, image.height / 1.8), date_now, fill=text_color, font=font_date)
    drawable_image.text((hash_x_pos, image.height / 1.4), hash, fill=text_color, font=font_date)

    raw_bytes = io.BytesIO()
    image.save(raw_bytes, "png")
    raw_bytes.seek(0)
    img_base64 = base64.b64encode(raw_bytes.read())
    return img_base64
