
import json,requests
import os, uuid
# from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient


default = open('config/default.json')
defaultLoad = json.load(default)

# Replace with valid values
ENDPOINT = defaultLoad['ENDPOINT']
training_key = defaultLoad['training_key']
prediction_key = defaultLoad['prediction_key']
prediction_resource_id = defaultLoad['prediction_resource_id']

# # blobのパスを受け取って画像を取得し、ローカルに保存、読み取り成功・失敗時にはローカルの画像を削除
# def blobGetImage(blobPath):
#     blob_client = container_client.get_blob_client(blobPath)

#     with open("/image", "wb") as download_file:
#         download_file.write(blob_client.download_blob().readall())
#     return


# 画像をcustomvisionに投げて判定する関数
def customvision():
    url = "https://garbagedeterminingchatbotcv-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/e2bbbf10-497a-4916-9ea9-5fb3c2033f63/classify/iterations/Iteration2/image"
    headers = {
        'Content-Type': 'multipart/form-data',
        'Prediction-key': prediction_key
    }
    response =requests.post(url,data=open("chatbot/garbage.png","rb"),headers=headers)
    response.raise_for_status()

    analysis = response.json()
    name1, pred1 = analysis["predictions"][0]["tagName"], analysis["predictions"][0]["probability"]
    print(name1, pred1)
    name2, pred2 = analysis["predictions"][1]["tagName"], analysis["predictions"][1]["probability"]
    print(name2, pred2)



    # Precisionが高いものを返す
    if(pred1 > pred2):
        return name1
    else:return name2

# # (多分使わないと思われる)blobの画像の確認
# def blobCheckImage(blobPath):
#     from azure.storage.blob import BlockBlobService
#     account_name = defaultLoad['blob_account_name']
#     account_key = defaultLoad['blob_account_key']
#     container_name = defaultLoad['blob_container_name']
#     blob_name = defaultLoad['blob_name']

#     service = BlockBlobService(account_name=account_name, account_key=account_key)
#     service.get_blob_to_path(container_name,blob_name,'download.png')
#     return 


