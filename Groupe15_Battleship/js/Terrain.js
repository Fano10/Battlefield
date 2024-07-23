

function creerTerrain() {
    let Parent = document.createElement("div")
    Parent.className = "carre"
    document.body.append(Parent)
    let div;
    for (let i = 0; i < 196; i++) {
        div = document.createElement("div")
        div.className = "boite position" + i;
        Parent.appendChild(div)
    }
}


function VerificationPlace(boite,numeroBoite,directionBateau,longeurBateau,longeurTerrain){// --> & (haut en bas)
    let autoriser = true;
    let matriceLongeur = longeurTerrain * longeurTerrain
    let Parent = boite.parentNode
    let etatBoite
    if(directionBateau === "horizontal") { // verification horizontal
        for (let i = numeroBoite; i < (numeroBoite + longeurBateau); i++) {
            if(i< matriceLongeur) {
                etatBoite = Parent.children[i].className.replace(/(\w+)\s(\w{8})(\d+)/, "$1");
                if(etatBoite!=="boite"){
                    autoriser = false;
                }
            }
            if (i !== numeroBoite && i % longeurTerrain === 0) {
                autoriser = false;
            }
        }
    }
    if(directionBateau ==="vertical") { //Verification vertical
        let i = numeroBoite;
        for (let a = 0; a < longeurBateau; a++) {
            if(i<matriceLongeur) {
                etatBoite = Parent.children[i].className.replace(/(\w+)\s(\w{8})(\d+)/, "$1");
                if(etatBoite!=="boite"){
                    autoriser = false;
                }
            }
            if (i > matriceLongeur-1){
                autoriser = false
            }
            i = i + longeurTerrain;
        }
    }
    return autoriser
}

function removeProposition(Parent,longeurTerrain){
    for(let i=0;i<(longeurTerrain*longeurTerrain);i++){
        Parent.children[i].style.removeProperty("background-color")

    }
}

function proposition(boite,directionBateau,longeurBateau,longeurTerrain){//propose au joueur ou mettre son bateau
    let numeroBoite = Number((boite.className).replace(/(\w+)\s(\w{8})(\d+)/,"$3"));
    let autorisation = VerificationPlace(boite,numeroBoite,directionBateau,longeurBateau,longeurTerrain)
    let Parent = boite.parentNode
    removeProposition(Parent,longeurTerrain)
    if (autorisation !== false){
        if(directionBateau ==="horizontal"){
            for(let i= 0;i<(longeurBateau);i++){
                Parent.children[numeroBoite + i].style.backgroundColor = "red"
            }
        }
        if(directionBateau ==="vertical"){
            let i=0
            for(let a=0;a<longeurBateau;a++){
                Parent.children[numeroBoite + i].style.backgroundColor = "red"
                i = i + longeurTerrain;
            }
        }
    }
}
function InstallerBateau(boite,directionBateau,longeurBateau,nomBateau,longeurTerrain){
    if(nomBateau !=="") {
        let numeroBoite = Number((boite.className).replace(/(\w+)\s(\w{8})(\d+)/, "$3"));
        let autorisation = VerificationPlace(boite, numeroBoite, directionBateau, longeurBateau, longeurTerrain)
        if (autorisation === false) {
            return 0;
        } else {
            let Parent = boite.parentNode
            let BateauInstaller = (document.querySelector("." + nomBateau))
            if (directionBateau === "horizontal") {
                for (let i = 0; i < (longeurBateau); i++) {
                    Parent.children[numeroBoite + i].className = (Parent.children[numeroBoite + i].className).replace(/(\w+)\s(\w{8})(\d+)/, nomBateau + i + " position$3")
                }
            }
            if (directionBateau === "vertical") {
                let i = 0
                for (let a = 0; a < longeurBateau; a++) {
                    Parent.children[numeroBoite + i].className = (Parent.children[numeroBoite + i].className).replace(/(\w+)\s(\w{8})(\d+)/, nomBateau + a + " position$3")
                    Parent.children[numeroBoite + i].style.transform = "rotate(90deg)";
                    i = i + longeurTerrain;
                }
            }
            BateauInstaller.style.display = "none";
            return 1;

        }
    }
    else {
        return 0;
    }
}

export {creerTerrain,InstallerBateau,VerificationPlace,proposition,removeProposition}
