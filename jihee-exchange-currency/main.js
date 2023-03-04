// 1. 박스 2개 만들기
// 2. 드랍다운 리스트 만들기 
// 3. 환율정보 들고오기
// 4. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
// 5. 금액을 입력하면 환전이 된다.
// 6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨
// 7. 숫자를 한국어로 읽는법
// 8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다!
const currencyRatio = {
    USD:{
        KRW:1303.94,
        USD:1,
        JPY:135.6,
        unit:"달러",
        img: "image/usa.png",
    },
    KRW:{
        KRW:1,
        USD:0.00077,
        JPY:0.1,
        unit:"원",
        img: "image/korea.png",
    },
    JPY:{
        KRW:9.62,
        USD:0.0074,
        JPY:1,
        unit:"엔",
        img: "image/japan.png",
    }
};

//1. console.log(currencyRatio.USD.unit);

//console.log(currencyRatio['USD']['unit']);
var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let fromButton = document.getElementById("from-button");
let toButton = document.getElementById("to-button")
let fromCurrency = "USD";
let toCurrency = "USD";

document
    .querySelectorAll("#from-currency-list li")
    .forEach(function(item) { 
        item.addEventListener("click",function(){
        //add이벤트 주는 함수, 한번에 여러개 줄때!
        //1. 버튼을 가져온다.
        fromCurrency = this.id;
        fromButton.innerHTML = `<img class="flag-img" src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
        convert("from");
        //2. 버튼에 값을 바꾼다.
        //3. 선택된 currency값을 변수에 저장해준다.
    });
});

document
    .querySelectorAll("#to-currency-list li")
    .forEach(function(item){ item.addEventListener("click",function(){
        toCurrency = this.id;
        toButton.innerHTML = `<img class="flag-img" src="${currencyRatio[toCurrency].img}">${toCurrency}`;
        convert("from");
    });
});

//공부할것
/**객체란?
 * 함수란?
 * document란?
 * querySelectorAll이란?
 * getElementById란?
 */

//1. 키를 입력하는 순간
//2. 환전이 되서
//3. 환전된 값이 보인다.
function convert(type){
    console.log("key up event issue");
    let amount = 0;
    if (type == "from"){
        //입력값 받기
        amount = document.getElementById("fromAmount").value;
        //환전하기
        let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
        //환전한값 보여주기
        document.getElementById("toAmount").value = convertedAmount;
        //환전한값 한국어로
        readerKoreanNumber(amount, convertedAmount);
    } else {
        amount = document.getElementById("toAmount").value;
        let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
        document.getElementById("fromAmount").value = convertedAmount;
        renderKoreanNumber(convertedAmount, amount);
      }
    }

// 1.드랍다운 리스트에 값이 바낄때마다
// 2.환전을 다시한다.
function reconvert(){
    let amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    
    document.getElementById("from-input").value = convertedAmount;
}

function readerKoreanNumber(from, to){
    document.getElementById("fromNumToKorea").textContent=
    readNum(from)+ currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent=
    readNum(to)+ currencyRatio[toCurrency].unit;
}

//숫자단위
function readNum(num){
    let resultString ="";
    let resultArray = [];

    //만단위로 끊어내는 for문
    for(let i=0; i<unitWords.length; i++){
        let unitResult = (num%Math.pow(splitUnit, i+1))/Math.pow(splitUnit, i);
        unitResult=Math.floor(unitResult);
        if(unitResult>0){
            resultArray[i] =unitResult;
        }
    }
    for(let i=0;i<resultArray.length;i++){
        if(!resultArray[i]) continue;
        resultString=String(resultArray[i])+unitWords[i]+resultString;
    }
    return resultString;
}
