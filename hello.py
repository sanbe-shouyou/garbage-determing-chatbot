import json
default = open('config/default.json')
defaultRead = json.load(default)

ENDPOINT = defaultRead['ENDPOINT']
training_key = "PASTE_YOUR_CUSTOM_VISION_TRAINING_SUBSCRIPTION_KEY_HERE"
prediction_key = "PASTE_YOUR_CUSTOM_VISION_PREDICTION_SUBSCRIPTION_KEY_HERE"