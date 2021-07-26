FROM ubuntu:18.04
# ...
RUN apt-get update && apt-get install -y \
        software-properties-common
    RUN add-apt-repository ppa:deadsnakes/ppa
    RUN apt-get update && apt-get install -y \
        python3.7 \
        python3-pip
    RUN python3.7 -m pip install pip
    RUN apt-get update && apt-get install -y \
        python3-distutils \
        python3-setuptools
    RUN python3.7 -m pip install pip --upgrade pip
# ???
ENV PYTHONUNBUFFERD 1

# copy file form local machine to container
COPY ./requirement.txt /requirement.txt

# install dependency
# RUN pip install -r /requirement.txt
RUN pip install -r /requirement.txt
# create app folder in container
RUN mkdir /app

# set default working dictionary
WORKDIR /app

# copy local app folder to container folder
COPY ./app /app

# ???
# 

CMD ["python", "test.py"]
