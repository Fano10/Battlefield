/**Il y a normalement 6 mais on va prendre 5 bateaux de guerre de longeur : 3,6,4,4,5 */




export class Bateau {
    longeur;
    nomBateau;
    direction;
    corps;
    div;
    constructor(long,nomBateau,direction) {
        this.longeur = long;
        this.nomBateau = nomBateau;
        this.corps = document.createElement("div");
        this.div = [];
        this.direction = direction;
    }
    getInfo() {
        return [this.nomBateau, this.longeur, this.direction];

    }
    Affichage(){
        this.corps.className = this.nomBateau;
        for(let i=0;i<this.longeur;i++){
            this.div[i] = document.createElement("div");
            this.div[i].className = this.nomBateau + i;
            this.corps.appendChild(this.div[i]);
        }
        document.body.append(this.corps);
    }
    setDirection(newDirection,name){
        if(name === this.nomBateau){
            this.direction = newDirection
        }
    }
    setBackground(){
        //this.div[0].style.backgroundImage = "url('../img/ship/corvette/corvette0Select.png')"
        this.div[0].style.backgroundImage = "url('../img/ship/" + this.nomBateau + '/'+this.nomBateau + "0Select.png')"
    }
    setDefaultBackground(){
        this.div[0].style.removeProperty("background-image")
    }
}

export function AfficherBateau(corvette,littleD,bigD,warrios,capitain){
    corvette.Affichage()
    littleD.Affichage()
    bigD.Affichage()
    warrios.Affichage()
    capitain.Affichage()
}

export function Background(shipSelect,shipOther1,shipOther2,shipOther3,shipOther4){
    shipSelect.setBackground()
    shipOther1.setDefaultBackground()
    shipOther2.setDefaultBackground()
    shipOther3.setDefaultBackground()
    shipOther4.setDefaultBackground()
}

export function ChangerDirection(corvette,littleD,bigD,warrios,capitain,direction,selectionBateau){
    littleD.setDirection(direction,selectionBateau)
    corvette.setDirection(direction,selectionBateau)
    bigD.setDirection(direction,selectionBateau)
    warrios.setDirection(direction,selectionBateau)
    capitain.setDirection(direction,selectionBateau)
}

export function ChoixBateau(nameSelected,littleD,corvette,bigD,warrios,capitain){
    let value = []
    if(nameSelected ==="littleD"){
        value[0] = littleD.getInfo()[1]
        value[1] = littleD.getInfo()[2]
    }
    if(nameSelected ==="corvette"){
        value[0] = corvette.getInfo()[1]
        value[1] = corvette.getInfo()[2]
    }
    if(nameSelected ==="bigD"){
        value[0] = bigD.getInfo()[1]
        value[1] = bigD.getInfo()[2]
    }
    if(nameSelected ==="warrios"){
        value[0] = warrios.getInfo()[1]
        value[1] = warrios.getInfo()[2]
    }
    if(nameSelected ==="capitain"){
        value[0] = capitain.getInfo()[1]
        value[1] = capitain.getInfo()[2]
    }
    return value
}

