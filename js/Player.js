import { UiSelectors } from "./UiSelectors.js";
const ui=UiSelectors;

export class Player{
    constructor(name){
        this.points=0;
        this.cards=[];
        this.playerCardBoard=ui.playerCardsSpan;
        this.dealerCardBoard=ui.opponentCardsSpan;
        this.name=name;
    }

}