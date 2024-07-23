
let CheckCorvette = 1;
let ChecklitlleD = 1;
let Checkcapitain = 1;
let Checkwarriors = 1;
let CheckbigD = 1;
let nomBateau = ["corvette","bigD","capitain","littleD","warrios"];
let corvette = [];
let littleD = [];
let capitain = [];
let warriors = [];
let bigD = [];
let joueur = "Miora"; //Doit changer avant chaque partie
let tour = 0; // soit 0 ou 1 (depend de l'adversaire// )
let score = 0;
//==================== Declaration des Variables pour le son ===========================*/

let lance_rocket_1;
let lance_rocket_2;
let cible_atteinte_1;
let cible_manquee_1;
let cible_manquee_2;

/*=======================================*/

function getBateau(bateau,namebateau){ //cette fonction permet de prendre les donners stockers dans la session et la transformer en tableau
    // . J'ai ete obliger de le faire pour transmettre mes tableaux dans cette html
    let intermediaire = sessionStorage.getItem(namebateau);
    let caracter = "";
    for(let i=0 ;i<intermediaire.length;i++){
       if(intermediaire[i]===','){
           bateau.push(Number(caracter));
           caracter = "";
       }
       else{
           caracter = caracter + intermediaire[i];
       }
    }
    bateau.push(Number(caracter));
}

function MisAJourBateau(){//comme un gros boucle de getBateau
    getBateau(corvette,nomBateau[0])
    getBateau(bigD,nomBateau[1])
    getBateau(capitain,nomBateau[2])
    getBateau(littleD,nomBateau[3])
    getBateau(warriors,nomBateau[4])
}

function placerBateau(parent){// place mes 5 bateaux sur le div

    for(let i=0;i<corvette.length;i++){
        parent.children[corvette[i]].className = "corvette position" + corvette[i];
    }
    for(let i=0;i<littleD.length;i++){
        parent.children[littleD[i]].className = "littleD position" + littleD[i];
    }
    for(let i=0;i<bigD.length;i++){
        parent.children[bigD[i]].className = "bigD position" + bigD[i];
    }
    for(let i=0;i<warriors.length;i++){
        parent.children[warriors[i]].className = "warriors position" + warriors[i];
    }
    for(let i=0;i<capitain.length;i++){
        parent.children[capitain[i]].className = "capitain position" + capitain[i];
    }
}

function RecoitTire(boite,position,ws){//cette fonction s'applique sur mon terrain lorsque l'advesaire lance un attaque
    // il regarde la position du tir et mets a jour la boite toucher. Il renvoy aussi l'etat de la case toucher a mon adversaire
    let pos = Number(position);
    let enfant = boite.children[pos];
    let etat = enfant.className.replace(/(\w+)\s(\w{8})(\d+)/, "$1");
    ws.send(JSON.stringify({
        "position":pos,
        "bateau":"null",
        "etat":etat,
        "joueur":joueur
    }))
    if (etat === "case") {
        enfant.className = enfant.className.replace(/(\w+)\s(\w{8})(\d+)/, "eau $2$3");
    }
    else if ((etat !== "eau" && etat !== "feu") && etat !== "red") {
        enfant.className = enfant.className.replace(/(\w+)\s(\w{8})(\d+)/, "feu $2$3");
    }
}

function ModifierTerrainAdv(boite,etat,position){//cette fonction s'applique sur le terrainAdversaire de mon ecran
    // il met a jour cette div a chaque fois que j'ai terminer de tirer
    let enfant = boite.children[position];
    if (etat === "case") {
        enfant.className = enfant.className.replace(/(\w+)\s(\w{8})(\d+)/, "eau $2$3");
        cibleManquee_1();
    } else if ((etat !== "eau" && etat !== "feu") && etat !== "red") {
        enfant.className = enfant.className.replace(/(\w+)\s(\w{8})(\d+)/, "feu $2$3");
        cibleAtteinte_1();
        score = score + 5;
        document.getElementById("score").innerHTML = "score: " + score;
    }
}

function EnvoyeTire(boite,ws){//envoye la position que j'ai tirer a mon adversaire
    let position = boite.className.replace(/(\w+)\s(\w{8})(\d+)/,"$3");
    ws.send(JSON.stringify({
        "position": position,
        "bateau":"null",
        "etat": "null",
        "joueur" : joueur
    }))
    //return position;
}

function CheckVieBateau(parent,ws){//check le vie de mes bateaux et envoye soit mon bateau si mon bateau a couler,soit une message victoire pour dire que mon adversaire a gagne
    let vieCorvette = 0;
    let vielittleD = 0;
    let vieWarriors = 0;
    let vieCapitain = 0;
    let vieBigD = 0;
    let etat;
    for(let i=0;i<196;i++){
        etat = parent.children[i].className.replace(/(\w+)\s(\w{8})(\d+)/,"$1");
        if(etat ==="corvette"){vieCorvette = vieCorvette+ 1;}
        if(etat ==="littleD"){vielittleD = vielittleD+ 1;}
        if(etat ==="bigD"){vieBigD = vieBigD+ 1;}
        if(etat ==="warriors"){vieWarriors = vieWarriors+ 1;}
        if(etat ==="capitain"){vieCapitain = vieCapitain+ 1;}
    }
    if(vieCorvette ===0 && CheckCorvette===1){
        ws.send(JSON.stringify({
            "position":"null",
            "bateau":corvette,
            "etat": "null",
            "joueur" : joueur
        }))
        CheckCorvette = 0;
        for (let i=0 ;i<corvette.length;i++){
            parent.children[corvette[i]].className = parent.children[corvette[i]].className.replace(/(\w+)\s(\w{8})(\d+)/,"red $2$3")
        }
    }
    if(vielittleD ===0 && ChecklitlleD===1){
        ws.send(JSON.stringify({
            "position":"null",
            "bateau":littleD,
            "etat": "null",
            "joueur" : joueur
        }))
        ChecklitlleD = 0;
        for (let i=0 ;i<littleD.length;i++){
            parent.children[littleD[i]].className = parent.children[littleD[i]].className.replace(/(\w+)\s(\w{8})(\d+)/,"red $2$3")
        }
    }
    if(vieBigD ===0 && CheckbigD===1){
        ws.send(JSON.stringify({
            "position":"null",
            "bateau":bigD,
            "etat": "null",
            "joueur" : joueur
        }))
        CheckbigD = 0;
        for (let i=0 ;i<bigD.length;i++){
            parent.children[bigD[i]].className = parent.children[bigD[i]].className.replace(/(\w+)\s(\w{8})(\d+)/,"red $2$3")
        }
    }
    if(vieWarriors ===0 && Checkwarriors===1){
        ws.send(JSON.stringify({
            "position":"null",
            "bateau":warriors,
            "etat": "null",
            "joueur" : joueur
        }))
        Checkwarriors = 0;
        for (let i=0 ;i<warriors.length;i++){
            parent.children[warriors[i]].className = parent.children[warriors[i]].className.replace(/(\w+)\s(\w{8})(\d+)/,"red $2$3")
        }
    }
    if(vieCapitain ===0 && Checkcapitain===1){
        ws.send(JSON.stringify({
            "position":"null",
            "bateau":capitain,
            "etat": "null",
            "joueur" : joueur
        }))
        Checkcapitain = 0;
        for (let i=0 ;i<capitain.length;i++){
            parent.children[capitain[i]].className = parent.children[capitain[i]].className.replace(/(\w+)\s(\w{8})(\d+)/,"red $2$3")
        }
    }
    if((CheckCorvette + ChecklitlleD + CheckbigD + Checkwarriors+ Checkcapitain)===0){
        ws.send(JSON.stringify({
            "position":"null",
            "bateau":"null",
            "etat":"victoire",
            "joueur" : joueur
        }))
    }

}

function BateauCouler(parent,bateau){//mets a jour le terrain adversaire de mon ecran lorsque un bateau a couler chez mon adversaire
    for(let i=0 ;i < bateau.length;i++){
        parent.children[bateau[i]].className = parent.children[bateau[i]].className.replace(/(\w+)\s(\w{8})(\d+)/,"red $2$3")
    }
    cibleCoulee();
}

/*=======================    Tireer Rockets     ===============================*/
function tireRocket_1()
{
    lance_rocket_1.play();
}
function tireRocket_2()
{
    lance_rocket_2.play();
}
//===============================
function cibleAtteinte_1()
{
    cible_atteinte_1.play();
}
//===============================
function cibleManquee_1()
{
    cible_manquee_1.play();
}
function cibleCoulee()
{
    cible_manquee_2.play();
}
/*=============================================================================*/

function websocket(parentAdv , parentMoi){//fonction websocket
    let ws = new WebSocket("ws://kevin-chapron.fr:8090/ws")
    ws.onopen = function(event){
        ws.send(JSON.stringify({//Athentification au serveur
            "app":"BattleShip"
        }))
            parentAdv.onclick = function (evt) {//Lorsqu'on appuie sur le terrain d'adversaire
               if ((tour % 2) === 0) {//Le type de tour
                    tireRocket_1()
                    EnvoyeTire(evt.target, ws)
                    tour = tour + 1
                   ready()
               }
            }
    }
    ws.onmessage = function (event){
        let data = JSON.parse(event.data)
        console.log(data)
        if(data.joueur !== joueur) {
            if (data.joueur) { // si je recois un donne apart la connection
                if(data.etat==="null" && data.position!=="null" && data.bateau==="null") {
                    console.log("e")
                    RecoitTire(parentMoi, data.position, ws)
                    CheckVieBateau(parentMoi, ws)
                    tour = tour + 1
                    ready()
                }
                else {
                    if (data.bateau === "null" && data.position!=="null" && data.etat !=="null") {
                        console.log("a")
                        ModifierTerrainAdv(parentAdv, data.etat, data.position)
                    }
                    if(data.bateau !=="null" && data.position==="null" && data.etat ==="null"){
                        console.log("b")
                        BateauCouler(parentAdv, data.bateau)
                    }
                    if (data.etat === "victoire") {
                        console.log("d")
                        window.alert("Victoire")
                    }
                }
            }
        }
    }
}
function ready(){
    if(tour % 2 ===0){
        document.querySelector(".tour").className = "tour green";
    }
    else{
        document.querySelector(".tour").className = "tour red";
    }
}

function init(){//fonction principale
    MisAJourBateau();

    lance_rocket_1   = new Audio('../sound/lance-rocket_1.wav');
    lance_rocket_2   = new Audio('../sound/lance-rocket_2.wav');
	cible_atteinte_1 = new Audio('../sound/cible-atteinte_1.wav');
    cible_manquee_1  = new Audio('../sound/cible-manquee_1.wav');
    cible_manquee_2  = new Audio('../sound/cible-manquee_2.wav');

    let parentAdv = document.querySelector(".Adversaire");
    let parentMoi = document.querySelector(".MonTerrain");

    for(let i=0 ; i<196 ; i++){
        let divAdv = document.createElement("div");
        let divMoi = document.createElement("div");
        divAdv.className = "case position" + i;
        divMoi.className = "case position" + i;
        parentAdv.appendChild(divAdv);
        parentMoi.appendChild(divMoi);
    }

    placerBateau(parentMoi);
    websocket(parentAdv,parentMoi);
    ready()
}

window.onload = init;
