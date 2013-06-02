import json
import csv

with open("dataWithFIPS.json") as file:
    data = json.load(file)

keyArray = []
for key in data[0]:
	keyArray.append(key)

with open("data.csv", "w") as file:
    csv_file = csv.writer(file)
    csv_file.writerow(keyArray)
	for record in data:
    	nextRow = []
    	for key in keyArray:
    		try:
    			nextRow.append(record[key])
    		except Exception, e:
    			print record
    			nextRow.append("")

        csv_file.writerow(nextRow)
