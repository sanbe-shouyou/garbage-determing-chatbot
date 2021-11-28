const express = require('express');
const app = express();
const { PythonShell } = require('python-shell');
const port = 8080;

var actionCount = 0;

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
        value: '<form action="http://127.0.0.1:5000/image" target="_blank" method="post" enctype="multipart/form-data"><div class="input-group"><label class="input-group-btn"><input type="file" name="file"><button type="submit" class="btn btn default">Submit</button></div></form>'});
        msg.push({type: 'option', options: opts});
        actionCount = actionCount + 1
        
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
    }else if (userInputText == '自転車') {
        msg.push({
            type: 'text',
            value: '自転車は「粗大ごみ」です。<br>「粗大ごみ」の申し込み方法及び出し方<br> 市役所3R推進課(000-0000-0000)に電話してください',
            delayMs: 500
        });
    }else if (userInputText == 'ソファー') {
        msg.push({
            type: 'text',
            value: 'ソファーは「粗大ごみ」です。<br>「粗大ごみ」の申し込み方法及び出し方<br> 市役所3R推進課(000-0000-0000)に電話してください',
            delayMs: 500
        });
    }else if (userInputText == 'ファイル選択') { 
        actionCount = actionCount + 1
    }
    else {
        msg.push({
            type: 'text',
            value:  userInputText 
        });
    }

    
    if(actionCount == 2) {
        PythonShell.run('chatbot/image.py', null, function(err, data) {
            if (err) throw err;
            console.log(data[0].value);
            msg.push({
                type: 'text',
                value: data[0]
            });
            const responseText = callback + '(' + JSON.stringify(response) + ')';
            res.set('Content-Type', 'application/javascript');
            res.send(responseText);
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

// function pythonCV(){
//     post = $.ajax({
//         type: "POST",
//         url: "/cv",
//         data: "", 
//         async:false,
//         dataType: "json",
//         success: function(response) {
//             console.log(response);
//             // Receive incremented number.
//             return response;
//         }, 
//         error: function(error) {
//             console.log("Error occurred in keyPressed().");
//             console.log(error);
//         }
//     })
// }