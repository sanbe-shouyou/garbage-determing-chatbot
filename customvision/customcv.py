
import json,requests

default = open('config/default.json')
defaultLoad = json.load(default)

# Replace with valid values
ENDPOINT = defaultLoad['ENDPOINT']
training_key = defaultLoad['training_key']
prediction_key = defaultLoad['prediction_key']
prediction_resource_id = defaultLoad['prediction_resource_id']
# </snippet_creds>

url = "https://garbagedeterminingchatbotcv-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/e2bbbf10-497a-4916-9ea9-5fb3c2033f63/classify/iterations/Iteration1/image"
headers = {
    'Content-Type': 'multipart/form-data',
    'Prediction-key': prediction_key
}
response =requests.post(url,data=open("image/冷蔵庫サンプル①.jpg","rb"),headers=headers)
response.raise_for_status()

analysis = response.json()
name, pred = analysis["predictions"][0]["tagName"], analysis["predictions"][0]["probability"]
print(name, pred)
name, pred = analysis["predictions"][1]["tagName"], analysis["predictions"][1]["probability"]
print(name, pred)