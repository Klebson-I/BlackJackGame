import { UiSelectors } from "./UiSelectors.js";
const ui=UiSelectors;

export class Player{
    constructor(name,pointsSpan){
        this.points=0;
        this.cards=[];
        this.firstCard=[];
        this.playerCardBoard=ui.playerCardsSpan;
        this.dealerCardBoard=ui.opponentCardsSpan;
        this.name=name;

        this.pointsSpan=pointsSpan;
    }

    updatePlayerPoints(){
        if(this.name=='player'){
            this.pointsSpan.textContent=`Player points : ${this.points}`;
        }
        if(this.name=='dealer'){
            this.pointsSpan.textContent=`Dealer points : ${this.points}`;
        }
        
    }

    evaluatePoints(){
        this.points=this.getStrength();
        this.updatePlayerPoints();
    }


    getStrength(){
        let sum=0;
        console.log(this.cards);
        if(this.countCardsByWeight('A')==2&&this.cards.length==2){
            return 21;
        }
        const cards=this.cards.map(card=>{
            
            if(['K','Q','J'].includes(card.weight)&&card.isReaveal==true){
                console.log('1');
                return 10;
            }
            if(this.cards.length==2&&card.weight=='A'&&card.isReaveal==true){
                console.log('2');
                return 11;
            }
            if(this.cards.length>2&&card.weight=='A'&&card.isReaveal==true){
                console.log('3');
                return 1;
            }
            if(card.isReaveal==true){
                console.log('4');
                return parseInt(card.weight);
            }
            
        })

        for(let i=0;i<cards.length;i++){
            if(!isNaN(cards[i])){
                sum+=parseInt(cards[i]);
            }
        }
        return sum;
    }

    countCardsByWeight(weight){
        return this.cards.filter(card=>card.weight==weight).length;
    }

}