function get_nowtime() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
}

function timeDifference(start_time_str, end_time_str) {
    var startTime = new Date(start_time_str);
    var endTime = new Date(end_time_str);
    var timeDifference = endTime - startTime;
    var seconds = Math.floor(timeDifference / 1000);
    var hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;
    var days = Math.floor(hours / 24);
    hours %= 24;

    if (days > 0) {
        return `${days}日${hours}時間${minutes}分${seconds}秒`;
    } else if (hours > 0) {
        return `${hours}時間${minutes}分${seconds}秒`;
    } else if (minutes > 0) {
        return `${minutes}分${seconds}秒`;
    } else {
        return `${seconds}秒`;
    }
}


function wolfx_api() {
    const apiUrl = `https://api.wolfx.jp/jma_eew.json`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, false); // 同期リクエスト
    xhr.send();
    if (xhr.status === 200) {
        const wolfx_data = JSON.parse(xhr.responseText);
        const OriginalText = wolfx_data.OriginalText;
        const Title = wolfx_data.Title;
        const EventID = wolfx_data.EventID;
        const Serial = wolfx_data.Serial;
        const AnnouncedTime = wolfx_data.AnnouncedTime;
        const OriginTime = wolfx_data.OriginTime;
        const Hypocenter = wolfx_data.Hypocenter;
        const MaxIntensity = wolfx_data.MaxIntensity;
        const Magunitude = wolfx_data.Magunitude;
        const Depth = wolfx_data.Depth;
        const Latitude = wolfx_data.Latitude;
        const Longitude = wolfx_data.Longitude;
        const isFinal = wolfx_data.isFinal;
        const isCancel = wolfx_data.isCancel;
        const isWarn = wolfx_data.isWarn;
        const isAssumption = wolfx_data.isAssumption;
        const isSea = wolfx_data.isSea;

        // 追加の情報を含むオブジェクトを返す
        return {
            "OriginalText": OriginalText,
            "title": Title,
            "EventID": EventID,
            "Serial": Serial,
            "AnnouncedTime": AnnouncedTime,
            "OriginTime": OriginTime,
            "Hypocenter": Hypocenter,
            "MaxIntensity": MaxIntensity,
            "Magunitude": Magunitude,
            "Depth": Depth,
            "Latitude": Latitude,
            "Longitude": Longitude,
            "isFinal": isFinal,
            "isCancel": isCancel,
            "isWarn": isWarn,
            "isAssumption": isAssumption,
            "isSea": isSea
        };
    } else {
        console.error("APIリクエストに失敗しました。");
        return null;
    }
}

function scaleConversion(scaleData) {
    if (scaleData === "None") {
      return null;
    } else if (scaleData === -1) {
      return "不明";
    } else if (scaleData === 10) {
      return "1";
    } else if (scaleData === 20) {
      return "2";
    } else if (scaleData === 30) {
      return "3";
    } else if (scaleData === 40) {
      return "4";
    } else if (scaleData === 45) {
      return "5-";
    } else if (scaleData === 50) {
      return "5+";
    } else if (scaleData === 55) {
      return "6-";
    } else if (scaleData === 60) {
      return "6+";
    } else if (scaleData === 70) {
      return "7";
    }
  
    // マッチしない場合はデフォルトの色を返す
    return "不明";
  }
  
  function scaleColorConversion(scaleData) {
    if (scaleData === "None") {
      return null;
    } else if (scaleData === -1) {
      return "#69696f";
    } else if (scaleData === 10) {
      return "#29405e";
    } else if (scaleData === 20) {
      return "#1E82E6";
    } else if (scaleData === 30) {
      return " #78E6DC";
    } else if (scaleData === 40) {
      return " #FFFF96 ";
    } else if (scaleData === 45) {
      return " #FFD200";
    } else if (scaleData === 50) {
      return " #FF9600";
    } else if (scaleData === 55) {
      return " #F03200";
    } else if (scaleData === 60) {
      return "#BE0000 ";
    } else if (scaleData === 70) {
      return " #8C0028";
    }
  
    // マッチしない場合はデフォルトの色を返す
    return "#202022";
  }


  function get_QUAKEone() {
    var url = "http://files.quake.one/list.json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false); // 同期的なリクエストにするため、第3引数を false に設定
    xhr.send();

    if (xhr.status === 200) {
        var jsonData = JSON.parse(xhr.responseText);
        return jsonData;
    } else {
        throw new Error("Failed to fetch JSON data. HTTP Status Code: " + xhr.status);
    }
}

//function convertion() {
// const QUAKEone_json=get_QUAKEone()
// const QUAKEone_ID = Object.keys(QUAKEone_json);
// console.log(QUAKEone_ID)
//}