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
        value: '<form action="http://127.0.0.1:5000/image" target="_blank" method="post" enctype="multipart/form-data"><div class="input-group"><label class="input-group-btn"><input type="file" name="file"><button type="submit" class="btn btn default">送信する</button></div></form>'});
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
            value: '自転車は「粗大ごみ」です。<br>「粗大ごみ」の申し込み方法及び出し方<br><br>①電話で清掃課(電話:024-924-2181)に収集を申し込んでください<br>その際に、住所(アパート名、方書まで)、氏名、電話番号、回収をご希望している品物を確認します。<br>申し込み点数は1週間1回につき5点までです(無料)。<br> ③収集業者から指定された日の午前8時までに、品物を敷地の中の道路沿いまで出していただきます。<br>その際に、「粗大ごみ(名字)」と書いた張り紙を、品物それぞれに貼っていただきます。<br> ④収集業者が、張り紙を目印に回収します。',
            delayMs: 500
        });
    }else if (userInputText == 'ソファー') {
        msg.push({
            type: 'text',
            value: 'ソファーは「粗大ごみ」です。<br>「粗大ごみ」の申し込み方法及び出し方<br>①電話で清掃課(電話:024-924-2181)に収集を申し込んでください<br>その際に、住所(アパート名、方書まで)、氏名、電話番号、回収をご希望している品物を確認します。<br>申し込み点数は1週間1回につき5点までです(無料)。<br> ③収集業者から指定された日の午前8時までに、品物を敷地の中の道路沿いまで出していただきます。<br>その際に、「粗大ごみ(名字)」と書いた張り紙を、品物それぞれに貼っていただきます。<br> ④収集業者が、張り紙を目印に回収します。',
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