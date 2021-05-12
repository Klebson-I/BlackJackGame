import {UiSelectors} from './UiSelectors.js';
import {Weights,Types} from './Card.js';
import { Card } from './Card.js';


const ui=UiSelectors;

export class Board{
    constructor(player,dealer){
        this.playerCardBoard=null;
        this.dealerCardBoard=null;
        this.playerLimit=0;
        this.dealerLimit=0;

        this.player=player;
        this.dealer=dealer;

        this.playerCards=null;
        this.dealerCards=null;

        this.cards=[];
    }

    init(){
        this.playerCardBoard=ui.playerCardsSpan;
        this.dealerCardBoard=ui.opponentCardsSpan;
        this.playerCards=this.player.cards;
        this.dealerCards=this.dealer.cards;
    }

     startDeal(){
        this.createDeck();
        this.shuffle();

        this.giveCard(this.player);

        setTimeout(()=>{
            this.giveCard(this.player);
            setTimeout(()=>{
                this.giveCard(this.dealer);
                setTimeout(()=>{
                    this.giveCard(this.dealer);
                },1000)
            },1000)
        },1000)
    }

    createDeck(){
        Weights.forEach(weight => {
            Types.forEach(type=>{
                const card=new Card(weight,type);
                this.cards.push(card);
            })
        });
    }

    shuffle(){
        for(let i=this.cards.length-1;i>0;i--){
            const j=Math.floor(Math.random()*i);
            const temp=this.cards[i];
            this.cards[i]=this.cards[j];
            this.cards[j]=temp;
        } 
    }

    giveCard(player){
        const card=this.cards.pop();
        player.cards.push(card);
        const renderedCard=card.createCard();

        if(player.name=='player'){
            this.playerCardBoard.appendChild(renderedCard);
            renderedCard.style.left='100%';
            renderedCard.style.top='0%';
            this.moveCard(renderedCard,this.player);
        }
        if(player.name=='dealer'){
            this.dealerCardBoard.appendChild(renderedCard);
            renderedCard.style.left='100%';
            renderedCard.style.top='0%';
            this.moveCard(renderedCard,this.dealer);
        }

        
        
    }

    moveCard(card,player){
        let cardLeft=1382.5;
        if(player.name=='player'){
            const interval=setInterval(()=>{
                if(card.offsetLeft>this.playerLimit*172.75+20)
                {
                    card.style.left=`${cardLeft}px`;
                }
                else
                {
                    this.roateCard(card,this.player);
                    clearInterval(interval);
                }
                cardLeft-=10;
            },10);
        }

        if(player.name=='dealer'){
            const interval=setInterval(()=>{
                if(card.offsetLeft>this.dealerLimit*172.75+20)
                {
                    card.style.left=`${cardLeft}px`;
                }
                else
                {
                    this.roateCard(card,this.dealer);
                    clearInterval(interval);
                }
                cardLeft-=10;
            },10);
        }
       
    }

    roateCard(card,player){
        if(player.name=='player'){
            this.playerLimit++;
        card.classList.add('rotate');
        setTimeout(()=>{
           card.children[1].style.display='flex';
           card.children[2].style.display='flex';
           card.children[0].style.display='flex';
           card.style.background='white';
        },500)
        }

        if(player.name=='dealer'){
            this.dealerLimit++;
        card.classList.add('rotate');
        setTimeout(()=>{
           card.children[1].style.display='flex';
           card.children[2].style.display='flex';
           card.children[0].style.display='flex';
           card.style.background='white';
        },500)
        }
        
    }

}