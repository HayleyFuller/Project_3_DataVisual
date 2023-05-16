import requests
import pandas as pd
# url define
url1 = 'https://data.wa.gov/resource/3d5d-sdqb.csv'
url2 = 'https://data.wa.gov/resource/f6w7-q2d2.geojson'

# fist datasetoutput
df = pd.read_csv(url1, delimiter=',')
df.to_csv('Size_History_By_County.csv', header = True, index = False)
df.to_json('Size_History_By_County.json')

# second dataset output
response = requests.get(url2)
with open('Population_Data', 'wb') as file:
    file.write(response.content)