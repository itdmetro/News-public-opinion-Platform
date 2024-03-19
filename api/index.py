from flask import Flask, render_template, request, jsonify, abort
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage
#import speech_recognition及pydub套件
import speech_recognition as sr
# from pydub import AudioSegment
from threading import Thread
# from googlesearch import search
from serpapi import GoogleSearch
# import openai
import whisper
import tempfile
import requests
import datetime
import os

# line_bot_api = LineBotApi(os.getenv("LINE_CHANNEL_ACCESS_TOKEN"))
# line_handler = WebhookHandler(os.getenv("LINE_CHANNEL_SECRET"))
# working_status = os.getenv("DEFALUT_TALKING", default = "true").lower() == "true"

app = Flask(__name__)

# domain root
@app.route('/')
def home():
    #從前端接收到的關鍵字event_message_text
    #web_run_google_custom_search()
    # return 'Hello, World!'
    return render_template('indexflask.html')

@app.route('/web_run_google_custom_search', methods=['POST'])
def web_run_google_custom_search():
    query = request.form.get('query')  # 獲取傳送的字串 <'str'>
    print("query:", query)
    google_custom_search_result = google_custom_search(query)

    print("google_custom_search_result:", google_custom_search_result)
    # if True:
    if len(google_custom_search_result) == 0:
        print("無搜尋結果")
        reply_info = "時間範圍內無搜尋結果"
        return jsonify({"reply_info": str(reply_info)})
    else:
        print("結果如下")
        month = datetime.date.today().month
        day = datetime.date.today().day
        reply_info = str(month)+"月"+str(day)+"日 10:00 新聞輿情彙整"

        # print("result_list:", google_custom_search_result)
        # for i in google_custom_search_result:
        #     line_bot_api.reply_message(
        #         event.reply_token,
        #         TextSendMessage(text=i))
        # reply_msg = reply_msg+"\n\n"+google_custom_search_result
        reply_msg = google_custom_search_result
        #然後回傳的結果json要整理成表格，使用者選完後直接以json做修改？或是重組新的
        #key:value
        #title:名稱
        #link:名稱
        #[{"title":"v","link":"v"}, {"title":"v","link":"v"}]
        #[{"title1":"v1","link1":"v1"}, {"title2":"v2","link2":"v2"}]
        # return jsonify({"reply_msg": str(reply_msg)})
        return jsonify({"reply_info": str(reply_info), "reply_msg": str(reply_msg)})

@app.route("/webhook", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']
    # get request body as text
    body = request.get_data(as_text=True)
    body = json.loads(body)
    print("Request body: " + body)
    # app.logger.info("Request body: " + body)
    # handle webhook body
    try:
        line_handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)
    return 'OK'

def google_custom_search(query):
# def google_custom_search(api_key, cse_id, num_results, query):
    search = GoogleSearch({
        "q": query,
        "tbm": "nws",
        "tbs": "qdr:d",
        "safe": "active",
        "location": "Taipei City,Taiwan",
        "num": 50,
        "no_cache": True,
        "api_key": "d71b43b933dceed8799a237d2ae6ee5b09f4641d171185ae0fe0411336877a8c"
      })
    data = search.get_dict()
    # print(data)

    result_list = []
    # if False:
    if "news_results" in data:
        # for item in data["items"]:
        for i in range(len(data["news_results"])):
            temp_dict = {}
            title = data["news_results"][i]["title"]
            link = data["news_results"][i]["link"]
            temp_dict["title"] = title
            temp_dict["link"] = link
            result_list.append(temp_dict)
    # result_string = "\n".join(result_list)
    result_string = result_list
    # print("result_string:",result_string)
    return result_string

# @line_handler.add(MessageEvent)
# # @line_handler.add(MessageEvent, message=TextMessage)
# def handle_message(event):
#     global working_status
#     working_status = True

#     if event.message.type == "text":
#         print("text")
#         event_message_text = event.message.text

#     elif event.message.type == "audio":
#         print("audio")
#         audio_message = line_bot_api.get_message_content(event.message.id)
#         audio_data = audio_message.content

#         #進行語音轉文字處理
#         # r = sr.Recognizer()

#         # AudioSegment.converter = './ffmpeg/bin/ffmpeg.exe'#輸入自己的ffmpeg.exe路徑
#         # sound = AudioSegment.from_file_using_temporary_files(path)
#         # path = os.path.splitext(path)[0]+'.wav'
#         # sound.export(path, format="wav")
#         # with sr.AudioFile(file) as source:
#         #     audio = r.record(source)
#         # event_message_text = r.recognize_google(audio, language='zh-Hant')#設定要以什麼文字轉換

#         with tempfile.NamedTemporaryFile("w+b", suffix=".m4a") as fp:
#             # print("fp:", type(fp))
#             print("fp:", fp) #<class 'tempfile._TemporaryFileWrapper'>
#             # print("fp.name:", type(fp.name))
#             print("fp.name:", fp.name) #<class 'str'>
#             fp_name = fp.name
#             # print("fp_name:", fp_name)
#             for chuck in audio_message.iter_content():
#                 fp.write(chuck)
#             with open(fp_name, "rb") as tf:
#                 #使用OpenAI whisper方法：
#                 transcript = openai.Audio.transcribe("whisper-1", tf)
#                 # transcript = openai.Audio.transcribe("whisper-1", fp.name)
#                 print("transcript[\"text\"]")
#                 event_message_text = transcript["text"]
#                 print("event_message_text語音轉文字:", event_message_text)

#     else:
#         return
        
#     if working_status:
#         print("working_status")
#         print("event_message_text收到文字:", event_message_text)

#         reply_msg = event_message_text

#         line_bot_api.reply_message(
#             event.reply_token,
#             TextSendMessage(text=reply_msg))

if __name__ == "__main__":
    app.run()