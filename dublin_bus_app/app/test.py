import platform
import os

print("container running")
print("platform system:",platform.system())
print("platform machine:",platform.machine())

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

print(BASE_DIR)