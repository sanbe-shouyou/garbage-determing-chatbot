import json
from flask import Flask, request,render_template
from PIL import Image
import customcv
app = Flask(__name__)

@app.route('/image', methods=['GET', 'POST'])
def image():
    if request.method == 'POST':
        f = request.files['file']
        png = f.filename.endswith('.png')
        jpg = f.filename.endswith('.jpg')
        jpeg = f.filename.endswith('.jpeg')
        if png or jpg or jpeg:
            f.save('garbage.png')
            result = customcv.customvision()
        else: return 'png,またはjpg形式の画像を送信してください。'
    return result
if __name__=='__main__':
    app.run()
