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
      text: "。",
      options: [
        { text: "", next: "leftPath" },
        { text: "走右邊的河邊", next: "rightPath" }
      ]
    },


    leftPath: {
      text: "你沿著左邊小徑走，遇見一隻友善的狐狸。",
      options: [
        { text: "和狐狸聊天", next: "talkFox" },
        { text: "繼續往前走", next: "deepForest" }
      ]
    },
    rightPath: {
      text: "你走到河邊，看到一隻小船在等你。",
      options: [
        { text: "坐船渡河", next: "crossRiver" },
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
  