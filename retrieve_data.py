import requests
from pprint import pprint
import pandas as pd

url = 'https://data.wa.gov/resource/3d5d-sdqb.csv'

#response = requests.get(url)

#data = response.text

df = pd.read_csv(url, delimiter=',')

df.to_csv('Size_History_By_County.csv', header = True, index = False)

df.to_json('Size_History_By_County.json')