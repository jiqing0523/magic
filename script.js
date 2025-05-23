// 故事資料都放在這裡
const storyData = {
    
    /*格式解釋:(可以直接複製底下的這個，【】的部分替換掉)
    **********************************************************

    【場景名稱】: {
      text: "【文字敘述】",
      options: [
        { text: "【選項文字】", next: "【下個跳轉場景的名稱】" },
        { text: "【選項文字】", next: "【下個跳轉場景的名稱】" }
      ]
    },

    **********************************************************
    */

    title: {
      text: "<h1>20250522</h1><br>試做",
      options: [
        { text: "開始遊戲", next: "start" }
      ]
    },

    
    start: {
      text: "一片黑暗籠罩，你只能面對眼前的一切。",
      options: [
        { text: "選擇光之試煉，與光作戰", next: "light" },
        { text: "選擇影之磨練，與黑暗作戰", next: "dark" }
      ]
    },


    light: {
      text: "現在你決定你要與光作戰，你進入銀光之殿，你看到空中散布著玻璃碎片，每一個碎片顯示著背叛的記憶。",
      options: [
        { text: "選擇回到過去，挽回一切", next: "back" },
        { text: "選擇忘掉懊悔，遮掩內心的愧疚", next: "front" }
      ]
    },
    back: {
      text: "你踏入悔悟之境，你一直逃避的過去讓你再次選擇，你的夥伴已經因你的法術受傷多次，卻仍幫助你。",
      options: [
        { text: "", next: "crossRiver" },
        { text: "沿河走", next: "followRiver" }
      ]
    },
    talkFox: {
      text: "狐狸告訴你森林裡藏著寶藏，你決定尋找它。",
      options: [{ text: "重新開始", next: "title" }]
    },
    deepForest: {
      text: "你越走越深，迷路了…",
      options: [{ text: "重新開始", next: "title" }]
    },
    crossRiver: {
      text: "你成功渡河，找到村莊。",
      options: [{ text: "重新開始", next: "title" }]
    },
    followRiver: {
      text: "你跟著河邊走，遇到了一隻巨大的鱷魚！",
      options: [{ text: "重新開始", next: "title" }]
    },
  };
  
    
    
    /**************分隔線，底下是一些設定**************/ 



  // 取得 DOM 元素
  const storyText = document.getElementById("story-text");
  const optionsDiv = document.getElementById("options");
  
  //打字機的效果 
  function typeHtml(html, element, callback) {
  element.innerHTML = ""; // 清空
  let i = 0;
  let isTag = false;
  let text = "";

  function type() {
    if (i < html.length) {
      let char = html[i];
      text += char;

      if (char === "<") isTag = true;
      if (char === ">") isTag = false;

      element.innerHTML = text;
      i++;

      setTimeout(type, isTag ? 0 : 30); // 遇到 HTML tag 不延遲，其他字延遲
    } else if (callback) {
      callback();
    }
  }

  type();
  }


  // 顯示故事函式
  function showStory(nodeId) {
  const node = storyData[nodeId];
  if (!node) return;

  optionsDiv.innerHTML = ""; // 清空舊按鈕

  // 打字機顯示 HTML（含 <p>, <b>, <i> 等）
  typeHtml(node.text, storyText, () => {
    node.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option.text;
      btn.onclick = () => showStory(option.next);
      optionsDiv.appendChild(btn);
    });
  });
  }

  
  // 頁面載入後，從 start 開始
  showStory("title");
  