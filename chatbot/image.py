import json
from flask import Flask, request,render_template
from PIL import Image
app = Flask(__name__)

@app.route('/image', methods=['GET', 'POST'])
def image():
    if request.method == 'POST':
        f = request.files['file']
        png = f.filename.endswith('.png')
        jpg = f.filename.endswith('.jpg')
        jpeg = f.filename.endswith('.jpeg')
        if png or jpg:
            f.save('garbage.png')
        else: return 'png,またはjpg形式の画像を送信してください。'
    return '画像を保存しました。'
if __name__=='__main__':
    app.run()
