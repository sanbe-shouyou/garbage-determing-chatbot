const express = require('express');
const app = express();
const port = 8080;
// CORSを有効にする
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});
app.get('/chat', function (req, res) {
    const userInputText = req.query.text;
    const callback = req.query.callback;
    const response = {output: []};
    const msg = response.output;

    if (userInputText == '粗大ゴミを出したい') {
        msg.push({
            type: 'text',
            value: '画像をアップロードしてください',
            delayMs: 500 //表示ディレイ（ミリ秒）
        });
        //オプションボタンを作る
        const opts = [];
        opts.push({label: 'ファイル選択', type: 'html',
        value: '<form action="imgを受け取るpythonのパスを指定" method="post" enctype="multipart/form-data"><div class="input-group"><label class="input-group-btn"><input type="file" name="file"><button type="submit" class="btn btn default">Submit</button></div></form><input type="file" id="img" name="img" accept="image/png , image/jpeg"><button type="submit">送信する</button>'});
        msg.push({type: 'option', options: opts});

        
    } else if (userInputText == '画像') {
        msg.push({
            type: 'text',
            value: '画像を表示します',
            delayMs: 500
        });
        msg.push({
            type: 'image',
            value: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kaiserpinguinjunges.jpg/800px-Kaiserpinguinjunges.jpg'
        });
    } else {
        msg.push({
            type: 'text',
            value: '「' + userInputText + '」ですね！'
        });
    }
    if (callback) {
        const responseText = callback + '(' + JSON.stringify(response) + ')';
        res.set('Content-Type', 'application/javascript');
        res.send(responseText);
    } else {
        res.json(response);
    }
    
});
app.listen(port, () => {
    console.log('チャットサーバーを開始しました ポート番号:' + port);
});

function RunApp(AppPath) {
    new ActiveXObject("WScript.Shell").Run(AppPath)
}