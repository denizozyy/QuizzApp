function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function (cevap) {
    return cevap === this.dogruCevap
}

let sorular = [
    new Soru("1- 5 tane makine yaklaşık 5 dakika içerisinde 5 düğme üretir. Buna göre 100 tane makine 100 tane düğmeyi kaç dakikada üretir?", { a: "100", b: "25", c: "5", d: "50" }, "c"),
    new Soru("2-Evin bahçesindeki çimenler her gün bir önceki günün iki katı kadar büyüyor. Çimenler 10 günde bahçenin tamamını kapladığına göre kaçıncı günde yarısını kaplayacak kadar büyür?", { a: "5", b: "7", c: "6", d: "9" }, "d"),
    new Soru("3-Doktorunuz size 3 hap verir ve bunları yarımşar saat arayla almanızı tavsiye ederse, ilaçların tamamını bitirmeniz ne kadar sürer?", { a: "2.5 saat", b: "1 saat", c: "1.5 saat", d: "2 saat" }, "b"),
    new Soru("4-Bir adam, karısı ve oğulları bir trafik kazası geçirir. Hepsi hastaneye götürülür ve doktor, “Onu ameliyat edemem, o benim oğlum.” der. Doktor kimdir?", { a: "Adamın babası", b: "Adamın dedesi", c: "Çocukların amcası" }, "a")

];