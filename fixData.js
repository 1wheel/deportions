d3.csv('countyEdit.csv', function(countyData){
	d3.csv('fips.csv', function(fipsData){
		d3.tsv('fips.tsv', function(tsvData){
			
			countys = countyData;
			fips = fipsData;
			tsv = tsvData;
			fullNameToStateCode = {};
			fips.forEach(function(d){
				fullNameToStateCode[d['FIPS State']] = d['State'];
			});

			tsv.forEach(function(d){
				d.countyName = d.name								
								.replace(" County", "")
								.replace(" Borough", "")
								.replace(" Census Area", "");
				d.stateName = fullNameToStateCode[d.id[0] + ""+ d.id[1]];
			});

			countys.forEach(function(d){
				d.fips = getFIPS(d.State, d.County);
				if (d.fips == -1){
					console.log(d);
				}
			});

			console.log(JSON.stringify(countys));

		});
	});
});

abvToFull = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

eArray = [];
function getFIPS(stateAbv, countyName){
	stateName = abvToFull[stateAbv];
	countyName = countyName
					.replace(" Borough", "")
					.replace(" Census Area", "")
					.replace("?", "-")
					.replace("Saint", "St.");
	for (var i = 0; i < tsv.length; i++){
		if (stateName == tsv[i].stateName && countyName == tsv[i].countyName){
			return tsv[i].id;
		}
	}
	eArray.push(stateAbv + " " + countyName);

}