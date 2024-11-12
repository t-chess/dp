import json
import glob

all_data = []

for filename in glob.glob("flights*.json"):
    with open(filename, "r") as file:
        file_data = json.load(file)
        all_data.extend(file_data.get("data", []))

with open("ALL_FLIGHTS.json", "w") as merged_file:
    json.dump(all_data, merged_file, indent=4)

print("Data merged")
