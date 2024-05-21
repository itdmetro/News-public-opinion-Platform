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

line_bot_api = LineBotApi(os.getenv("LINE_CHANNEL_ACCESS_TOKEN"))
line_handler = WebhookHandler(os.getenv("LINE_CHANNEL_SECRET"))
serpapikey = os.getenv("serpapikey")
serpapikey1 = os.getenv("serpapikey1")
serpapikey2 = os.getenv("serpapikey2")
serpapikey3 = os.getenv("serpapikey3")

app = Flask(__name__)

@app.route('/usage')
# @app.route('/usage', methods=['POST'])
def usage():
    apikey_list = [serpapikey, serpapikey1, serpapikey2, serpapikey3]
    usage_count = 0
    for i in range(len(apikey_list)):
        search = GoogleSearch({"api_key": apikey_list[i]})
        account_usage = search.get_account()["this_month_usage"]
        # print(account_usage)
        usage_count += account_usage
    # print("usage_count:", usage_count)
    usage_status = "剩餘"+str(100*len(apikey_list) - usage_count)+"次搜尋"
    # usage_status = str(usage_count)+"/"+str(100*len(apikey_list))+"次搜尋"
    # print("usage_status:", usage_status)
    return jsonify({"usage_status": str(usage_status)})
    # return usage_status

# domain root
@app.route('/')
def home():
    #從前端接收到的關鍵字event_message_text
    #web_run_google_custom_search()
    # return 'Hello, World!'
    return render_template('indexflask.html')
    # return render_template('indexflask.html', usage=usage_status)

@app.route('/web_run_google_custom_search', methods=['POST'])
def web_run_google_custom_search():
    query = request.form.get('query')  # 獲取傳送的字串 <'str'>
    num = request.form.get('num')  # 獲取傳送的字串 <'str'>
    print("query:", query)
    print("num:", num)
    
    # google_custom_search_result = google_custom_search(query)
    google_custom_search_result = google_custom_search(query, num)
    google_custom_search_result = str(google_custom_search_result).replace(" minute ago","分鐘前").replace(" minutes ago","分鐘前").replace(" hour ago","小時前").replace(" hours ago","小時前")

    print("google_custom_search_result:", google_custom_search_result)
    # if True:
    # if len(google_custom_search_result) == 0:
    if google_custom_search_result == "[]":
        print("無搜尋結果")
        reply_info = "時間範圍內無搜尋結果"
        return jsonify({"reply_info": str(reply_info)})
    elif google_custom_search_result == "已超過API可用次數，請報修":
        print("已超過API可用次數，請報修")
        reply_info = "已超過API可用次數，請報修"
        return jsonify({"reply_info": str(reply_info)})
    else:
        print("結果如下")
        # now_time = datetime.datetime.now() #now_time
        now_time = datetime.datetime.now() + datetime.timedelta(hours = 8) #utc8_time
        # duration_time = datetime.datetime.now() - datetime.timedelta(days = 1) #duration_time
        duration_time = datetime.datetime.now() - datetime.timedelta(hours = 16) #utc8_time
        # reply_info = str(month)+"月"+str(day)+"日 10:00 新聞輿情彙整"
        # reply_info = str(now_time.month).zfill(2)+"月"+str(now_time.day).zfill(2)+"日 "+str(now_time.hour).zfill(2)+":"+str(now_time.minute).zfill(2)+" 新聞輿情彙整"
        reply_info = str(duration_time.month).zfill(2)+"月"+str(duration_time.day).zfill(2)+"日"+str(duration_time.hour).zfill(2)+":"+str(duration_time.minute).zfill(2)+" ~ "+str(now_time.month).zfill(2)+"月"+str(now_time.day).zfill(2)+"日"+str(now_time.hour).zfill(2)+":"+str(now_time.minute).zfill(2)+" 新聞輿情彙整"

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

        #再跑一次usage
        apikey_list = [serpapikey, serpapikey1, serpapikey2, serpapikey3]
        usage_count = 0
        for i in range(len(apikey_list)):
            search = GoogleSearch({"api_key": apikey_list[i]})
            account_usage = search.get_account()["this_month_usage"]
            # print(account_usage)
            usage_count += account_usage
        # print("usage_count:", usage_count)
        usage_status = "剩餘"+str(100*len(apikey_list) - usage_count)+"次搜尋"
        # usage_status = str(usage_count)+"/"+str(100*len(apikey_list))+"次搜尋"

        # return jsonify({"reply_msg": str(reply_msg)})
        # return jsonify({"reply_info": str(reply_info), "reply_msg": str(reply_msg)})
        return jsonify({"reply_info": str(reply_info), "reply_msg": str(reply_msg), "usage": usage_status})

def google_custom_search(query, num):
    apikey_list = [serpapikey, serpapikey1, serpapikey2, serpapikey3]
    apikey_status = True
    n = 0
    result_list = []
    while apikey_status:
        search = GoogleSearch({
            "q": query,
            "tbm": "nws",
            "tbs": "qdr:d",
            "safe": "active",
            "location": "Taipei City,Taiwan",
            "num": 50,
            "num": num,
            "no_cache": True,
            "api_key": apikey_list[n]
          })
        data = search.get_dict()
        # print(data)

        # if False:
        if "news_results" in str(data):
            print("news_results")
            # for item in data["items"]:
            for i in range(len(data["news_results"])):
                temp_dict = {}
                title = data["news_results"][i]["title"]
                link = data["news_results"][i]["link"]
                date = data["news_results"][i]["date"]
                temp_dict["title"] = title
                temp_dict["link"] = link
                temp_dict["date"] = date
                result_list.append(temp_dict)
            # result_string = "\n".join(result_list)
            result_list = sorted(result_list, key=lambda x: float(eval(x["date"].replace(" minute ago","/60").replace(" minutes ago","/60").replace(" hour ago","").replace(" hours ago",""))))
            result_string = result_list
            # print("result_string:",result_string)
            print("result_list ok")
            apikey_status = False
            return result_string
        elif "Your account has run out of searches" in str(data):
            print("Your account has run out of searches")
            n+=1
            if n == len(apikey_list):
                result_string = "已超過API可用次數，請報修"
                apikey_status = False
                return result_string
        else:
            print("else")
            result_string = result_list
            apikey_status = False
            return result_string

# @line_handler.add(MessageEvent)
# # @line_handler.add(MessageEvent, message=TextMessage)
# def handle_message(event):
# def handle_message():
@app.route('/send_to_linebot', methods=['POST'])
def send_to_linebot():
    select_news = request.form.get('select_news')  # 獲取傳送的字串 <'str'>
    print("select_news:", select_news)

    reply_msg = select_news
    # line_bot_api.push_message('U55f37dcb182c4c815d3c7cf4d5069755', TextSendMessage(text=reply_msg))
    line_bot_api.broadcast(TextSendMessage(text=reply_msg))

    return jsonify({"send_to_linebot": "send_to_linebot end"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)