const quiz = new Quiz(sorular);


document.querySelector(".btn_start").addEventListener("click", function () {
    document.querySelector(".quiz_box").classList.add("active");
    startTimer(15);
    startTimerLine();
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    document.querySelector(".next-btn").classList.remove("show");
})

document.querySelector(".next-btn").addEventListener("click", function () {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(15);
        startTimerLine(),
        soruGoster(quiz.soruGetir());
        soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        document.querySelector(".next-btn").classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        document.querySelector(".quiz_box").classList.remove("active");
        document.querySelector(".score_box").classList.add("active");
        skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }

});

const option_list = document.querySelector(".option_list");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>' 

function soruGoster(soru) {
    let question = `<span>${soru.soruMetni} </span>`;
    let options = '';

    for (let cevap in soru.cevapSecenekleri) {
        options +=
            `<div class="option">
                <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
            </div>`;
    }

    
    document.querySelector(".question_text").innerHTML = question;
    option_list.innerHTML = options;
    
    const option = option_list.querySelectorAll(".option");

    for(let opt of option){
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}

document.querySelector(".btn_quit").addEventListener("click", function () {
    window.location.reload();
});
document.querySelector(".btn_replay").addEventListener("click", function () {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    document.querySelector(".btn_start").click();
    document.querySelector(".score_box").classList.remove("active");

});


function optionSelected(option) {
    clearInterval(counter);
    clearInterval(counterLine);
    let cevap = option.querySelector("span b").textContent;
    let soru= quiz.soruGetir();
    
    if(soru.cevabiKontrolEt(cevap)){
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
    }

    for(let i=0; i < option_list.children.length; i++) {
        option_list.children[i].classList.add("disabled");
    }
    
    document.querySelector(".next-btn").classList.add("show");

}

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer(){
        document.querySelector(".time_second").textContent = time;
        time--;
        if (time < 0){
            clearInterval(counter);
            document.querySelector(".time_text").textContent = "Süre Bitti";

            let cevap = quiz.soruGetir().dogruCevap;
            for(let option of document.querySelector(".option_list").children){

                if(option.querySelector("span b").textContent == cevap){
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", correctIcon);
                }

                option.classList.add("disabled");
            }
            document.querySelector(".next-btn").classList.add("show");
        }
    }
}

let counterLine;
function startTimerLine(){
    let line_width = 0;

    counterLine = setInterval(timer, 150);
    function timer(){
        line_width += 5.5;
        document.querySelector(".time_line").style.width = line_width + "px";

        if (line_width > 548) {
            clearInterval(counterLine);
        }
    }
}

function soruSayisiniGoster(soruSirasi, toplamSoru){
    let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
}

function skoruGoster(toplamSoru, dogruCevap) {
    let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
    document.querySelector(".score_box .score_text").innerHTML = tag;
}