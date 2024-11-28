import requests
import json

with open("../../../.env", "r") as file:
    access_key = file.read().strip()  

base_url = "https://api.aviationstack.com/v1/flights"

def fetch_and_save_data(offset):
    params = {
        'access_key': access_key,
        'offset': offset
    }
    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        filename = f"flights{(offset // 100) + 1}.json"
        with open(filename, "w") as file:
            json.dump(data, file, indent=4)
        print(f"Data for offset {offset} saved as {filename}")
    else:
        print(f"Failed to fetch data for offset {offset}: Status code {response.status_code}")

for i in range(20):
    offset = 10000 + i * 100
    fetch_and_save_data(offset)
