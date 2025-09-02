const quizData = JSON.parse(
    `[
        {
            "type":"choose",
            "Q":"クレープの起源とされるそば粉の食べ物は？",
            "options":["ガレット","ブリニ","パンケーキ"],
            "A":"ガレット"
        },
        {
            "type":"choose",
            "Q":"クレープの語源は？",
            "options":["ちりめん","そば","膜"],
            "A":"ちりめん"
        },
        {
            "type":"choose",
            "Q":"【最終問題】クレープ美味しかった？",
            "options":["はい","いいえ","パンケーキ"],
            "A":"はい"
        }
    ]`
)
console.log(quizData)
function menu_onclick(){
    all_close()
    const message_p = document.getElementById("message")
    message_p.textContent="⇩⇩⇩⇩⇩⇩☟めにゅ～"
    
    const menu_div = document.getElementById("menu_info")
    menu_div.style.display="block"
    scrollTo(0,0)
}
function allergen_onclick(){
    all_close()
    const message_p = document.getElementById("message")
    message_p.textContent="⇩⇩⇩⇩⇩⇩☟アレルギー情報"
    
    const allergen_div = document.getElementById("allergen_info")
    allergen_div.style.display="block"
    allergen_div.scrollIntoView({  
        behavior: 'smooth'  
    });
}
function costPrice_onclick(){
    all_close()
    const message_p = document.getElementById("message")
    message_p.textContent="⇩⇩⇩⇩⇩⇩☟原価だよー"
    
    const costPrice_div = document.getElementById("costPrice_info")
    costPrice_div.style.display="block"
    scrollTo(0,0)
}
function letsQuiz_onclick(){
    all_close()
    deleteQuiz()
    addQuiz(0)
    const message_p = document.getElementById("message")
    message_p.textContent="⇩⇩⇩⇩⇩⇩☟クイズに挑戦しよう！"
    
    const costPrice_div = document.getElementById("Quiz")
    costPrice_div.style.display="block"
    scrollTo(0,0)
}
function all_close(){
    const divs = document.getElementsByClassName("additionalInfo")
    for(let div of divs){
        div.style.display = "none"
    }
}
function countdown_display(){
    const now = new Date()
    const day1_open = new Date('2025-09-06T10:30+09:00')
    const day2_open = new Date('2025-09-07T10:30+09:00')

    const countdown_el = document.getElementById("countdown")
    if(now < day1_open || now.getDate() == 6){
        countdown_el.textContent = `[あと${Math.floor((day1_open.getTime() - now.getTime()) / (1000 * 60))}分だよ！]`
    }
    else{
        countdown_el.textContent = `[あと${Math.floor((day2_open.getTime() - now.getTime()) / (1000 * 60))}分だよ！]`
    }
}
countdown_display()
setInterval(
    countdown_display,
    60*1000
)

async function getDataFromSpreadSheet() {
  const url = "https://script.google.com/macros/s/AKfycbyfJIWpAkweQExpPOOuPl0Xm4XwWdBHhV3fjp9ufTAuH4f-Hq7bKqyM3kT_OPok8qTyXA/exec";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }
    console.log(response)
    const json = await response.json();
    console.log(json);
    return json
  } catch (error) {
    console.error(error.message);
    return "failure!"
  }
}
async function writingNumber(){
    const dataFromSS = await getDataFromSpreadSheet();
    document.getElementById("salesNumberDisplay").textContent = dataFromSS.sales;
}
writingNumber()
/**
 * 
 * @param {Array} arr 
 */
 const shuffleArray = (array) => {
    const cloneArray = [...array]

    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1))
      // 配列の要素の順番を入れ替える
      let tmpStorage = cloneArray[i]
      cloneArray[i] = cloneArray[rand]
      cloneArray[rand] = tmpStorage
    }

    return cloneArray
  }

let number_CA = 0
/**
 * クイズを追加する関数
 * @param {number} n 追加するクイズの番号
 */
function deleteQuiz(){
    const divs = document.getElementsByClassName("quizBoard")
    for(let div of divs){
        div.remove()
    }
    number_CA = 0
}
function addQuiz(n){
    const quizDatum = quizData[n]
    const options = shuffleArray(quizDatum.options)
    console.log(options)
    const buttons = options.map((x, i) => `<button class="quiz_option" onclick="answerCheck(${n} ,'${options[i]}', '${quizDatum.A}' )"> ${x} </button>`)
    console.log(buttons)
    const el = `
    <div id="${n}thQuiz" class="quizBoard">
        <p id="${n}th_quizQ">${quizDatum.Q}</p>
        ${buttons.join("")}
        <p id="${n}th_quizA">_______</p>
    </div>
    `
    console.log(el)
    const element = new DOMParser().parseFromString(el, "text/html").body.firstElementChild
    document.getElementById("Quiz").appendChild(element)
}
function answerCheck(stage, input, answer){
    const isFinal = stage == quizData.length - 1
    if(input == answer){
        //正解
        if(isFinal){
            document.getElementById(`${stage}th_quizA`).textContent = `${input}：正解！`
        }
        else{
            document.getElementById(`${stage}th_quizA`).textContent = `${input}：正解！次の問題に進む？`
            document.getElementById(`${stage}thQuiz`).appendChild(
            new DOMParser().parseFromString(
                `<button onclick="addQuiz(${stage + 1})">進む</button>`,
                "text/html").body.firstElementChild
            )
        }
        number_CA++
    }
    else{
        if(isFinal){
            document.getElementById(`${stage}th_quizA`).textContent = `${input}：残念！こたえは${answer}でした！`
        }
        else{
            document.getElementById(`${stage}th_quizA`).textContent = `${input}：残念！こたえは${answer}でした！次に進む？`
            document.getElementById(`${stage}thQuiz`).appendChild(
            new DOMParser().parseFromString(
                `<button onclick="addQuiz(${stage + 1})">進む</button>`,
                "text/html").body.firstElementChild
            )
        }
    }
    if(isFinal){
        //最終問題解答後
        document.getElementById("Quiz").appendChild(
            new DOMParser().parseFromString(
                `
                <div id="quiz_Result">
                    <p>結果発表！</p>
                    <p>${number_CA == quizData.length ? "全問正解！！ すごい！" : `全問正解ならず、、（${quizData.length}問中${number_CA}問正解！）`}
                </div>
                `,
                "text/html"
            ).body.firstElementChild
        )
    }
}