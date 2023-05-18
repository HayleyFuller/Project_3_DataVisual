import requests
import pandas as pd
# url define
url1 = 'https://data.wa.gov/resource/3d5d-sdqb.csv'
url2 = 'https://data.wa.gov/resource/f6w7-q2d2.geojson'
url3 = 'https://data.wa.gov/resource/f6w7-q2d2.json'

# fist datasetoutput
df = pd.read_csv(url1, delimiter=',')
df.to_csv('dataCollect/Size_History_By_County.csv', header = True, index = False)
df.to_json('dataCollect/Size_History_By_County.json')

# second dataset output
response = requests.get(url2)
with open('dataCollect/Population_Data.geojson', 'wb') as file:
    file.write(response.content)
# third dataset output
df1 = pd.read_json(url3)
df1.to_csv('dataCollect/Population_Data.csv', header = True, index = False)
df1.to_json('dataCollect/Population_Data.json')