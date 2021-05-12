import { UiSelectors } from "./UiSelectors.js";

export const Weights=[
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A"
    ];
    
    export const Types=[
        'spades',
        'hearts',
        'diamonds',
        'clubs'
    ];
    
    export class Card{
        constructor(weight,type){
            this.weight=weight;
            this.type=type;
        }
    
        createCard(){
            let card=document.createElement('div');
            
            card.classList.add('card');
            card.innerHTML=`<div class="upSign">
                <span>${this.weight}</span>
                <img src="img/${this.type}.png">
            </div>

            <div class="midSign">
                <img src="img/${this.type}.png">
            </div>

            <div class="downSign">
                <span>${this.weight}</span>
                <img src="img/${this.type}.png">
            </div>`;

            return card;
        }
    }
    