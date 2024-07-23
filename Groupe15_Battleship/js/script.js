import {creerTerrain, InstallerBateau, proposition, removeProposition} from './Terrain.js';
import {AfficherBateau, Background, Bateau, ChangerDirection, ChoixBateau} from "./Bateau.js";


function init(){
    /**Variable*/
    let selectionBateau = "";
    let directionBateau;
    let longeurBateau;
    let ready = 0;
    let divReady = document.querySelector(".Not.Ready");
    let readyCorvette = [];
    let readylittleD = [];
    let readyBigD = [];
    let readyWarriors = [];
    let readycapitain = [];
    /**A propos du bateau*/
    let corvette = new Bateau(4,"corvette","horizontal")
    let littleD = new Bateau(3,"littleD","horizontal")
    let bigD = new Bateau ( 5,"bigD","horizontal")
    let warrios = new Bateau(6,"warrios","horizontal")
    let capitain = new Bateau(4,"capitain","horizontal")

    /**Afficher bateau et terrain*/
    AfficherBateau(corvette,littleD,bigD,warrios,capitain)
    creerTerrain()

    /**Quand les bateaux sont selectionner*/
    let littleDSelect = document.querySelector(".littleD")
    littleDSelect.onclick = function (evt){
        selectionBateau = littleD.getInfo()[0]
        Background(littleD,corvette,warrios,capitain,bigD)
    }
    let corvetteSelect = document.querySelector(".corvette")
    corvetteSelect.onclick = function (evt){
        selectionBateau = corvette.getInfo()[0]
        Background(corvette,littleD,warrios,bigD,capitain)

    }
    let bigDSelect = document.querySelector(".bigD")
    bigDSelect.onclick = function (evt){
        selectionBateau = bigD.getInfo()[0]
        Background(bigD,corvette,littleD,warrios,capitain)
    }
    let warriosSelect = document.querySelector(".warrios")
    warriosSelect.onclick = function (evt){
        selectionBateau = warrios.getInfo()[0]
        Background(warrios,capitain,corvette,littleD,bigD)
    }
    let capitainSelect = document.querySelector(".capitain")
    capitainSelect.onclick = function (evt){
        selectionBateau = capitain.getInfo()[0]
        Background(capitain,warrios,corvette,littleD,bigD)
    }

    /**Controler la direction du bateau*/
    let BotTop = document.querySelector(".BotTop")
    let RightLeft = document.querySelector(".RightLeft")
    BotTop.onclick = function (evt){
        ChangerDirection(corvette,littleD,bigD,warrios,capitain,"vertical",selectionBateau)
    }
    RightLeft.onclick = function (evt){
        ChangerDirection(corvette,littleD,bigD,warrios,capitain,"horizontal",selectionBateau)
    }

    /**Installer les bateaux sur le terrain*/
    let boite = document.querySelector(".carre")
    boite.onclick = function (evt){
        longeurBateau = ChoixBateau(selectionBateau,littleD,corvette,bigD,warrios,capitain)[0]
        directionBateau = ChoixBateau(selectionBateau,littleD,corvette,bigD,warrios,capitain)[1]
        ready = ready + InstallerBateau(evt.target,directionBateau,longeurBateau,selectionBateau,14)
        selectionBateau = "";
        removeProposition(boite,14)
        if(ready ===5){
            divReady.className = "Ready";
            document.getElementById("gauche_peut_ajouter_bateau").innerText = "Cliquez sur play pour commencer la partie";
        }
    }
    boite.onmouseover = function (evt){
        if(selectionBateau!=="") {
            longeurBateau = ChoixBateau(selectionBateau, littleD, corvette, bigD, warrios, capitain)[0]
            directionBateau = ChoixBateau(selectionBateau, littleD, corvette, bigD, warrios, capitain)[1]
            proposition(evt.target, directionBateau, longeurBateau, 14)
        }
    }
    boite.onmouseout = function (evt){
        removeProposition(boite,14)
    }
    /**Lorsque on est pret*/
    divReady.onclick = function(evt){
        console.log("Je suis quand meme renter");
        let nameBateau;
        let posBateau
        for(let i =0; i<196;i++){
            nameBateau = boite.children[i].className.replace(/(\w{4})\w+\s\w+/,"$1")
            posBateau = boite.children[i].className.replace(/(\w+)\s(\w{8})(\d+)/,"$3")
            if(nameBateau ==="bigD"){
                readyBigD.push(posBateau);
            }
            if(nameBateau ==="litt"){
                readylittleD.push(posBateau);
            }
            if(nameBateau ==="corv"){
                readyCorvette.push(posBateau)
            }
            if(nameBateau ==="warr"){
                readyWarriors.push(posBateau)
            }
            if(nameBateau ==="capi"){
                readycapitain.push(posBateau)
            }
        }
        sessionStorage.setItem("bigD",readyBigD);
        sessionStorage.setItem("warrios",readyWarriors);
        sessionStorage.setItem("capitain",readycapitain);
        sessionStorage.setItem("corvette",readyCorvette);
        sessionStorage.setItem("littleD",readylittleD);
        //window.location.href = "http://www.w3schools.com";
    }
}

window.onload = init;