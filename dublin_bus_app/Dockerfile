# python3.7 environment
FROM python:3.7-alpine

#Maintainer
MAINTAINER Hank Ta

# ???
ENV PYTHONUNBUFFERD 1

# copy file form local machine to container
COPY ./requirement.txt /requirement.txt

# install dependency
# RUN pip install -r /requirement.txt
RUN pip install --upgrade pip && pip install -r /requirement.txt

# create app folder in container
RUN mkdir /app

# set default working dictionary
WORKDIR /app

# copy local app folder to container folder
COPY ./app /app

# ???
RUN adduser -D user
USER user

CMD ["python", "test.py"]