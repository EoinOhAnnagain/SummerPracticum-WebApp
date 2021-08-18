import requests

url = 'http://127.0.0.1:8000/api/token/obtain/'

response = requests.post(url, data={"email": "mhd0416@gmail.com", "password": ""})
response.encoding='utf-8'
print(response.url)
print(response.status_code)
print(response.request.headers)
print(response.headers)
print(response.content.decode())
