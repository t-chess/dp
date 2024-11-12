import json
from datetime import datetime
import pytz

with open('ALL_FLIGHTS.json', 'r') as file:
    flights_data = json.load(file)

unique_flights = {}

def convert_to_utc(scheduled_time, timezone_str):
    local_time = datetime.fromisoformat(scheduled_time)
    if local_time.tzinfo is not None:
        utc_time = local_time.astimezone(pytz.utc)
    else:
        local_tz = pytz.timezone(timezone_str)
        local_time = local_tz.localize(local_time)
        utc_time = local_time.astimezone(pytz.utc)
    return utc_time.isoformat()

for flight in flights_data:
    flight_key = (
        flight["flight_date"],
        flight["departure"]["iata"],
        flight["arrival"]["iata"],
        convert_to_utc(flight["departure"]["scheduled"], flight["departure"]["timezone"]),
        convert_to_utc(flight["arrival"]["scheduled"], flight["arrival"]["timezone"])
    )

    if flight_key not in unique_flights:
        unique_flights[flight_key] = {
            "departure": {
                "iata": flight["departure"]["iata"],
                "scheduled": convert_to_utc(flight["departure"]["scheduled"], flight["departure"]["timezone"])
            },
            "arrival": {
                "iata": flight["arrival"]["iata"],
                "scheduled": convert_to_utc(flight["arrival"]["scheduled"], flight["arrival"]["timezone"])
            }
        }

cleaned_flight_data = list(unique_flights.values())

with open('UNIQUE_FLIGHTS.json', 'w') as output_file:
    json.dump(cleaned_flight_data, output_file, separators=(',', ':'), indent=None)

print("Cleaned and combined duplicate flights.")
