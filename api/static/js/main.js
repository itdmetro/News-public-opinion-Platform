
// let messages_list = [];
let num = 50;

const selectElement = document.querySelector("#news_num_select");
selectElement.addEventListener("change", (event) => {
  //判斷選項後給chatgpt前置提詞：
  select_val = $('#news_num_select').val();
  console.log("select_val:", select_val);
  num = select_val;
});



//清除按鈕：
const cleanButton = document.getElementById('clean-button');
cleanButton.onclick = async () => { //按下清除按鈕
    // $("input:radio[name='form_box_question']").removeAttr('checked');
    document.getElementById("input_box").value = "";
    document.getElementById("output_box_text").innerHTML = "歡迎來到北捷新聞輿情搜尋平台，請在上方輸入關鍵字進行搜尋<br>";
    $("#news_box").remove();
    $('#clipboard-button').prop("disabled", true);
    $('#linebot-button').prop("disabled", true);
}



const andbutton = document.getElementById('and');
andbutton.onclick = async () => { //按下包含按鈕
  document.getElementById("input_box").value += "&";
  $("#input_box").focus();
}
const orbutton = document.getElementById('or');
orbutton.onclick = async () => { //按下或著按鈕
  document.getElementById("input_box").value += "|";
  $("#input_box").focus();
}
const excludebutton = document.getElementById('exclude');
excludebutton.onclick = async () => { //按下排除按鈕
  document.getElementById("input_box").value += "!";
  $("#input_box").focus();
}

const item1button = document.getElementById('item1');
item1button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item1button.innerHTML;
  $("#input_box").focus();
}
const item2button = document.getElementById('item2');
item2button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item2button.innerHTML;
  $("#input_box").focus();
}
const item3button = document.getElementById('item3');
item3button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item3button.innerHTML;
  $("#input_box").focus();
}
const item4button = document.getElementById('item4');
item4button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item4button.innerHTML;
  $("#input_box").focus();
}
const item5button = document.getElementById('item5');
item5button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item5button.innerHTML;
  $("#input_box").focus();
}
const item6button = document.getElementById('item6');
item6button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item6button.innerHTML;
  $("#input_box").focus();
}
const item7button = document.getElementById('item7');
item7button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item7button.innerHTML;
  $("#input_box").focus();
}
const item8button = document.getElementById('item8');
item8button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item8button.innerHTML;
  $("#input_box").focus();
}
const item9button = document.getElementById('item9');
item9button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item9button.innerHTML;
  $("#input_box").focus();
}
const item10button = document.getElementById('item10');
item10button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item10button.innerHTML;
  $("#input_box").focus();
}
const item11button = document.getElementById('item11');
item11button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item11button.innerHTML;
  $("#input_box").focus();
}
const item12button = document.getElementById('item12');
item12button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item12button.innerHTML;
  $("#input_box").focus();
}
const item13button = document.getElementById('item13');
item13button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item13button.innerHTML;
  $("#input_box").focus();
}
const item14button = document.getElementById('item14');
item14button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item14button.innerHTML;
  $("#input_box").focus();
}
const item15button = document.getElementById('item15');
item15button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item15button.innerHTML;
  $("#input_box").focus();
}
const item16button = document.getElementById('item16');
item16button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item16button.innerHTML;
  $("#input_box").focus();
}
const item17button = document.getElementById('item17');
item17button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item17button.innerHTML;
  $("#input_box").focus();
}
const item18button = document.getElementById('item18');
item18button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item18button.innerHTML;
  $("#input_box").focus();
}
const item19button = document.getElementById('item19');
item19button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item19button.innerHTML;
  $("#input_box").focus();
}
const item20button = document.getElementById('item20');
item20button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value += item20button.innerHTML;
  $("#input_box").focus();
}

const example1button = document.getElementById('example1');
example1button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value = "捷運&北捷";
  $("#input_box").focus();
}
const example2button = document.getElementById('example2');
example2button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value = "捷運|北捷";
  $("#input_box").focus();
}
const example3button = document.getElementById('example3');
example3button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value = "北捷!台鐵!桃捷!中捷!高捷";
  $("#input_box").focus();
}
const example4button = document.getElementById('example4');
example4button.onclick = async () => { //按下關鍵字按鈕
  document.getElementById("input_box").value = '"台北捷運"';
  $("#input_box").focus();
}

$("#input_box").keydown(function(event) {
    if(event.keyCode == 13){
        $("#search-button").click();
    };
});

//搜尋按鈕：
const searchbutton = document.getElementById('search-button');
searchbutton.onclick = async () => { //按下Start按鈕

    begin = Date.now();
    // num = 10;

    //擷取輸入內容：
    input_box = $("#input_box").val();
    console.log('input_box:', input_box);

    if (input_box.trim() === "") {
      alert("請輸入文字");
      return;
    }

    //轉換成搜尋引擎可接受運算子
    input_box = input_box.replace("&"," ").replace("!"," -")

    //清空原先所有的表格
    // document.getElementById("output_box").innerHTML = "";
    document.getElementById("output_box_text").innerHTML = "";
    $("#news_box").remove();

    // messages_list.push({"role": "user", "content": user_input})
    // query = JSON.stringify(query) //轉成string格式，不能用.toString()
    // console.log("query:", query)
    console.log("num:", num);

    //搜尋關鍵字後讓後端傳回結果
    fetch('/web_run_google_custom_search', {
      method: 'POST',
      // headers: {'Content-Type': 'application/json; charset=utf-8'},
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      // body: messages_list
      // body: `query=${input_box}`  // 傳送字串
      body: `query=${input_box}&num=${num}`  // 傳送字串
    })
    .then(response => response.json())
    .then(data => { //typeof(data.reply_msg)) -> string
        reply_info = data.reply_info
        console.log("reply_info:", reply_info);
        // console.log("data.reply_msg:", data.reply_msg);
      if(typeof(data.reply_msg) == "undefined"){ //無搜尋結果
      // if(typeof(reply_msg) == "undefined"){ //無搜尋結果
        $('#clipboard-button').prop("disabled", true);
        $('#linebot-button').prop("disabled", true);
        console.log("無搜尋結果");
        document.getElementById("output_box_text").innerHTML = reply_info; //回傳整個字串
      }else{
        $('#clipboard-button').prop("disabled", false);
        $('#linebot-button').prop("disabled", false);
        // reply_msg = JSON.parse(data.reply_msg.replace(/'/g, '"')); // 將單引號替換為雙引號，並轉換成object
        reply_msg = JSON.parse(data.reply_msg.replace(/"/g, ' ').replace(/'/g, '"')); // 將標題可能有的雙引號變空格，單引號替換為雙引號，並轉換成object
        // reply_msg = data.reply_msg.replace(/"/g, ' '); // 將雙引號替換為空格，並轉換成object
        // reply_msg = reply_msg.replace(/'/g, '"'); // 將單引號替換為雙引號，並轉換成object
        // reply_msg = JSON.parse(reply_msg); // 轉換成object
        console.log("reply_msg:", reply_msg);

        // console.log("新聞搜尋返回結果:", data.reply_msg);  // 打印處理後的字串
        // document.getElementById("output_box_text").innerHTML = reply_info + reply_msg; //回傳整個字串
        // document.getElementById("output_box_text").innerHTML = reply_info; //回傳整個字串
        // document.getElementById("output_box_text").innerHTML = reply_info+'<br><b>新聞搜尋結果：</b><br>'; //回傳整個字串
        reply_info = reply_info+' 共'+(reply_msg.length).toString()+'筆'; //回傳整個字串
        // document.getElementById("output_box_text").innerHTML = reply_info+' 共'+(reply_msg.length).toString()+'筆'; //回傳整個字串
        document.getElementById("output_box_text").innerHTML = reply_info; //回傳整個字串
        document.getElementById("usage_div").innerHTML = data.usage; //更新usage
        // end = Date.now();
        // elapsedTime = (end-begin) / 1000;
        // console.log(`新聞搜尋 Time taken:: ${elapsedTime}s`);

        var news_box = document.createElement("table"); // 創建表格
        var news_tbody = document.createElement("tbody"); // 創建tbody
        news_box.setAttribute("id","news_box");
        news_box.style.width = "100%"
        news_box.style.borderCollapse = "collapse"
        news_box.style.display = "flex"
        news_box.style.position = "absolute"
        news_box.style.top = "6%"

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
          checkbox.style.backgroundColor = "#D9D9D9";
          td1.appendChild(checkbox);
          td1.setAttribute("name","checkbox-cell");
          td1.style.textAlign = "center";
          td1.style.backgroundColor = "#D9D9D9";
          // content2 = document.createTextNode(title+"<br>"+link); // 創建td內容
          // td2.appendChild(content2);
          // td2.innerHTML = title+"<br>"+link;
          a = document.createElement('a');
          linkText = document.createTextNode(link);
          a.appendChild(linkText);
          a.href = link;
          a.target = "_blank";
          // document.body.appendChild(a);
          td2.innerHTML = (i+1).toString()+"."+title+"<br>";
          td2.style.backgroundColor = "#D9D9D9";
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
    // var reply_msg_array = [reply_info]
    var reply_msg_array = []
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



