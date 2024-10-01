FROM python:3.12

ENV GOOGLE_PRIVATE_KEY_ID ""
ENV GOOGLE_PRIVATE_KEY "-----BEGIN PRIVATE KEY-----\n \n-----END PRIVATE KEY-----\n"
ENV GOOGLE_CLIENT_EMAIL ""
ENV GOOGLE_CLIENT_ID ""
ENV GOOGLE_CLIENT_X509_CERT_URL ""
ENV OPENAI_API_KEY ''

WORKDIR /app

COPY Pre-Built-Bin/dlib-19.24.99-cp312-cp312-linux_x86_64.whl dlib-19.24.99-cp312-cp312-linux_x86_64.whl
RUN pip install --upgrade pip

RUN pip install dlib-19.24.99-cp312-cp312-linux_x86_64.whl
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY . .


#COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD python3 -m uvicorn main:app --port 8000 --host 0.0.0.0
