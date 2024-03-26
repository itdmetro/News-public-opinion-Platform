
let messages_list = [];

//清除按鈕：
const cleanButton = document.getElementById('clean-button');
cleanButton.onclick = async () => { //按下清除按鈕
    // $("input:radio[name='form_box_question']").removeAttr('checked');
    document.getElementById("input_box").value = "";
    document.getElementById("output_box_text").innerHTML = "歡迎來到北捷新聞輿情搜尋平台，請在上方輸入關鍵字進行搜尋<br>";
    $("#news_box").remove();
}



//搜尋按鈕：
const searchbutton = document.getElementById('search-button');
searchbutton.onclick = async () => { //按下Start按鈕

    begin = Date.now();

    //擷取輸入內容：
    input_box = $("#input_box").val();
    console.log('input_box:', input_box);

    if (input_box.trim() === "") {
      alert("請輸入文字");
      return;
    }

    //清空原先所有的表格
    // document.getElementById("output_box").innerHTML = "";
    document.getElementById("output_box_text").innerHTML = "";
    $("#news_box").remove();

    // messages_list.push({"role": "user", "content": user_input})
    // query = JSON.stringify(query) //轉成string格式，不能用.toString()
    // console.log("query:", query)

    //搜尋關鍵字後讓後端傳回結果
    fetch('/web_run_google_custom_search', {
      method: 'POST',
      // headers: {'Content-Type': 'application/json; charset=utf-8'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      // body: messages_list
      body: `query=${input_box}`  // 傳送字串
    })
    .then(response => response.json())
    .then(data => { //typeof(data.reply_msg)) -> string
        reply_info = data.reply_info
        console.log("reply_info:", reply_info);
        // console.log("data.reply_msg:", data.reply_msg);
      if(typeof(data.reply_msg) == "undefined"){ //無搜尋結果
      // if(typeof(reply_msg) == "undefined"){ //無搜尋結果
        $('#clipboard-button').hide();
        $('#linebot-button').hide();
        console.log("無搜尋結果");
        document.getElementById("output_box_text").innerHTML = reply_info; //回傳整個字串
      }else{
        $('#clipboard-button').show();
        $('#linebot-button').show();
        // reply_msg = JSON.parse(data.reply_msg.replace(/'/g, '"')); // 將單引號替換為雙引號，並轉換成object
        reply_msg = JSON.parse(data.reply_msg.replace(/"/g, ' ').replace(/'/g, '"')); // 將標題可能有的雙引號變空格，單引號替換為雙引號，並轉換成object
        // reply_msg = data.reply_msg.replace(/"/g, ' '); // 將雙引號替換為空格，並轉換成object
        // reply_msg = reply_msg.replace(/'/g, '"'); // 將單引號替換為雙引號，並轉換成object
        // reply_msg = JSON.parse(reply_msg); // 轉換成object
        console.log("reply_msg:", reply_msg);

        // console.log("新聞搜尋返回結果:", data.reply_msg);  // 打印處理後的字串
        // document.getElementById("output_box_text").innerHTML = reply_info + reply_msg; //回傳整個字串
        // document.getElementById("output_box_text").innerHTML = reply_info; //回傳整個字串
        document.getElementById("output_box_text").innerHTML = reply_info+'<br><b>新聞搜尋結果：</b><br>'; //回傳整個字串
        // end = Date.now();
        // elapsedTime = (end-begin) / 1000;
        // console.log(`新聞搜尋 Time taken:: ${elapsedTime}s`);

        var news_box = document.createElement("table"); // 創建表格
        var news_tbody = document.createElement("tbody"); // 創建tbody
        news_box.setAttribute("id","news_box");
        news_box.setAttribute("width","100%");
        news_box.setAttribute("border-collapse","collapse");

        // for (var i = 0; i < data.reply_msg.length; i++) {
        for (var i = 0; i < reply_msg.length; i++) {
          const title = reply_msg[i]["title"];
          const link = reply_msg[i]["link"];
          
          var tr = document.createElement("tr"); // 創建tr
          var td1 = document.createElement("td"); // 創建td
          var td2 = document.createElement("td"); // 創建td
          var checkbox = document.createElement("input"); // 添加 checkbox
          checkbox.type = "checkbox";
          checkbox.setAttribute("name","news_select");
          checkbox.setAttribute("value",i.toString());
          checkbox.setAttribute("value",i.toString());
          checkbox.style.width = "25px";
          checkbox.style.height = "25px";
          td1.appendChild(checkbox);
          td1.setAttribute("name","checkbox-cell");
          td1.style.textAlign = "center";
          // content2 = document.createTextNode(title+"<br>"+link); // 創建td內容
          // td2.appendChild(content2);
          // td2.innerHTML = title+"<br>"+link;
          a = document.createElement('a');
          linkText = document.createTextNode(link);
          a.appendChild(linkText);
          a.href = link;
          // document.body.appendChild(a);
          td2.innerHTML = title+"<br>";
          td2.appendChild(a);

          tr.appendChild(td1);
          tr.appendChild(td2);
          news_tbody.appendChild(tr);

          // var news_box = document.getElementById("news_box"); // 獲取表格
          // var newRow = news_box.insertRow(); // 新增一行
          // var cell1 = newRow.insertCell(0); // 新增兩個單元格
          // var cell2 = newRow.insertCell(1);

          // 設置單元格的內容
          // var checkbox = document.createElement("input"); // 添加 checkbox
          // checkbox.type = "checkbox";
          // cell1.appendChild(checkbox);
          // cell1.style.textAlign = "center";
          // cell2.innerHTML = title+"<br>"+link;
        }
        news_box.appendChild(news_tbody);
        document.getElementById('output_box').appendChild(news_box); //將建立的表格新增回去
      }
    });

};



//選擇的新聞整理：
async function select_news() {
    //擷取勾選新聞：
    var reply_msg_array = [reply_info]
    var checkbox_array = []
    // var checkbox_array = ["0","1","2","3","4"]
    var news_select = document.querySelectorAll("input[name='news_select']:checked");
    // console.log("news_select:",news_select)

    for (var i = 0; i < news_select.length; i++) {
      checkbox_array.push(parseInt(news_select[i].value));
      console.log(parseInt(news_select[i].value));
    }

    for (var i = 0; i < checkbox_array.length; i++) {
      // const title = reply_msg[parseInt(checkbox_array[i])]["title"];
      // const link = reply_msg[parseInt(checkbox_array[i])]["link"];
      const title = reply_msg[checkbox_array[i]]["title"];
      const link = reply_msg[checkbox_array[i]]["link"];
      reply_msg_array.push((i+1).toString()+"."+title);
      reply_msg_array.push(link);
    }
    reply_msg_string = reply_msg_array.join("\n")
    console.log('選擇的新聞:');
    console.log("reply_msg_string:",reply_msg_string)
}



//剪貼簿按鈕：
const clipboardbutton = document.getElementById('clipboard-button');
clipboardbutton.onclick = async () => {
    //複製至剪貼簿：
    select_news();
    const el = document.createElement('textarea');
    el.value = reply_msg_string;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}



//linebot按鈕：
const linebotbutton = document.getElementById('linebot-button');
linebotbutton.onclick = async () => {
    select_news();

    //搜尋關鍵字後讓後端傳回結果
    fetch('/send_to_linebot', {
      method: 'POST',
      // headers: {'Content-Type': 'application/json; charset=utf-8'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      // body: messages_list
      body: `select_news=${reply_msg_string}`  // 傳送字串
    })
}



//資料庫按鈕：
// const dbbutton = document.getElementById('db-button');
// dbbutton.onclick = async () => {

//     //擷取輸入內容：
//     input_box = $("#input_box").val();
//     console.log('input_box:', input_box);
// }

//文字轉語音按鈕：
// const ttsbutton = document.getElementById('tts-button');
// ttsbutton.onclick = async () => {

//     //擷取輸入內容：
//     input_box = $("#input_box").val();
//     console.log('input_box:', input_box);
// }



