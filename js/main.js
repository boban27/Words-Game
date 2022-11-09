(function(){
    let startBtn =$('.start-btn');
    let mainInput = $('.main-input');
    let allLine = $('.line');
    let allText  =[];
    let score = 0;
    let displayResult = $('.result-number')
   startBtn.on('click',startGame);
   function startGame() {
    $(this).hide();
    mainInput.focus();
    
    //setup
    let speed = 1;
    let textLength = 3;
    let typingWords = words.filter(word => word.length == textLength);
    let lvl= 6;
    let speedup = setInterval(function(){
        textLength++;
         typingWords = words.filter(word => word.length == textLength);


    },20000)
    mainInput.on('keyup',checkInputTyping);
    function checkInputTyping() {
        let inputVal =$(this).val();
        let self =$(this);
        if(allText.includes(inputVal)){
            let index = allText.indexOf(inputVal);
            allText.splice(index,1);
            $('span').filter(function () {
                return $(this).text() == inputVal;
            }).css('background','blue').fadeOut(100,function () {
                $(this).remove();
            })
            self.val("");
            score++;
            displayResult.html(score);
        }
        
    }
// insert sapns
function insertSpan(){
    for (let i = 0; i < allLine.length; i++) {
        let rand = Math.floor(Math.random()* 20);
        if(rand <= lvl){
            let text = choseText();
            allText.push(text);
            $(allLine[i]).append(`<span>${text}</span>`);
        }
       
    }
    setTimeout(insertSpan,7000)
}
insertSpan();
function choseText() {
    let rand = Math.floor(Math.random()*typingWords.length);
    let savedText = typingWords[rand];
    typingWords.splice(rand,1)
    return savedText;
    
}
//animacija spanova
let moveAll = setInterval(function () {
    let allSpans = $('span');
    allSpans.css({
        left : '+=' +speed

    })
    //testiranje
    $.each(allSpans,(index,el)=>{
        let position =$(el).position().left;
        if(position > 850){
            clearIntervals();
        }else if(position > 700 && position<710){
            $(el).addClass('danger');

        }
    })
    
},1000)
function clearIntervals() {
    clearInterval(moveAll);
    
}

   } 
})();