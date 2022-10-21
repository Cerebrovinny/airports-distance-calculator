#!/usr/bin/env python3
# Path: src/airports-data/get_airports.py
#download the airports.dat file from the openflights website
import os
import sys
import urllib.request
import json

def main():
    #check if the airports.dat file already exists
    if os.path.exists("airports.dat"):
        print("airports.dat file already exists")
        sys.exit(1)
    #download the airports.dat file
    urllib.request.urlretrieve("https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat", "airports.dat")
    print("airports.dat file downloaded")

    #read the airports.dat file
    with open("airports.dat", "r") as f:
        airports = f.readlines()
    #create a new file to store the results
    with open("us_airports.json", "w") as f:
        #loop through the airports and filter the ones in the United States
        for airport in airports:
            #split the line into a list
            airport = airport.split(",")
            #check if the airport is in the United States
            if airport[3] == '"United States"':
                #create a dictionary to store the airport information
                airport_dict = {}
                airport_dict["name"] = airport[1]
                airport_dict["city"] = airport[2]
                airport_dict["country"] = airport[3]
                airport_dict["iata"] = airport[4]
                airport_dict["icao"] = airport[5]
                airport_dict["latitude"] = airport[6]
                airport_dict["longitude"] = airport[7]
                airport_dict["altitude"] = airport[8]
                airport_dict["timezone"] = airport[9]
                airport_dict["dst"] = airport[10]
                airport_dict["tz"] = airport[11]
                #write the airport information to the file
                f.write(json.dumps(airport_dict) + "")
    print("us_airports.json file created")
    #convert to json
    print("converting to json")
    json.dumps(us_airports, indent = 4, sort_keys = True)
    #print the results
    print(us_airports)
    #create the file
    create_file = open("us_airports.json","w")
    #put the results in the new file
    create_file.write(str(us_airports) + "")
    create_file.close()

    print("airports.json file created")
#     remove the airports.dat file
    os.remove("airports.dat")
    print("airports.dat file removed")



if __name__ == "__main__":
    main()