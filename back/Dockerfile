#syntax=docker/dockerfile:1

FROM python

WORKDIR /src

COPY . .

RUN pip install -r requirements.txt

CMD [ "python", "app.py"]