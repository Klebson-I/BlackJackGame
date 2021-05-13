import {UiSelectors} from './UiSelectors.js';
import {Weights,Types} from './Card.js';
import { Card } from './Card.js';


const ui=UiSelectors;

export class Board{
    constructor(player,dealer){
        this.playerCardBoard=null;
        this.dealerCardBoard=null;
        this.bigBoard=null;

        this.playerLimit=0;
        this.dealerLimit=0;

        this.player=player;
        this.dealer=dealer;

        this.playerCards=null;
        this.dealerCards=null;

        this.cards=[];

        this.opponentCardToReaveal=null;
        this.opponentCardToReavealObject=null;
        this.isGameToStart=false;
    }

    init(){
        this.playerCardBoard=ui.playerCardsSpan;
        this.dealerCardBoard=ui.opponentCardsSpan;
        this.playerCards=this.player.cards;
        this.dealerCards=this.dealer.cards;
        this.bigBoard=ui.board;
    }

     startDeal(){
        this.createDeck();
        this.shuffle();

        this.giveCardToPlayer();
        setTimeout(()=>{
            this.giveCardToDealer();
                setTimeout(()=>{
                    this.giveCardToPlayer();
                    setTimeout(()=>{
                        this.giveCardToDealer();
                    },1000);
                },1000);
        },1000);
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

    giveCardToPlayer(){
        const card=this.cards.pop();
        this.player.cards.push(card);
        const renderedCard=card.createCard();

        this.playerCardBoard.appendChild(renderedCard);
        renderedCard.style.left='100%';
        renderedCard.style.top='0%';
        this.moveCardPlayer(renderedCard,card);
    }

    giveCardToDealer(){
        const card=this.cards.pop();
        this.dealer.cards.push(card);
        const renderedCard=card.createCard();

        this.dealerCardBoard.appendChild(renderedCard);
        renderedCard.style.left='100%';
        renderedCard.style.top='0%';
        this.moveCardDealer(renderedCard,card);
    }

    moveCardPlayer(card,cardObj){
        let cardLeft=this.bigBoard.offsetWidth;
        const cardWidth=card.offsetWidth;
        const margin=this.playerCardBoard.children.length*20;
        

        
        const interval=setInterval(()=>{
            if(card.offsetLeft>this.playerLimit*cardWidth+margin)
            {
                card.style.left=`${cardLeft}px`;
            }
            else
            {
                this.rotateCardPlayer(card,cardObj);
                clearInterval(interval);
            }
            cardLeft-=10;
        },10);
    }

    moveCardDealer(card,cardObj){
        let cardLeft=this.bigBoard.offsetWidth;
        const cardWidth=card.offsetWidth;
        const margin=this.dealerCardBoard.children.length*20;
        

        const interval=setInterval(()=>{
            if(card.offsetLeft>this.dealerLimit*cardWidth+margin)
            {
                card.style.left=`${cardLeft}px`;
            }
            else
            {
                this.rotateCardDealer(card,cardObj);
                clearInterval(interval);
            }
            cardLeft-=10;
        },10);
    }

    rotateCardPlayer(card,cardObj){
        this.playerLimit++;
        card.classList.add('rotate');
        cardObj.isReaveal=true;
        setTimeout(()=>{
           card.children[0].style.display='flex';
           card.children[1].style.display='flex';
           card.children[2].style.display='flex';
           card.style.background='white';
           
        },500)
    }

    rotateCardDealer(card,cardObj){
        this.dealerLimit++;
        if(this.dealerCardBoard.children.length==2){
           this.setCardToReveal(card,cardObj);
           this.startGame();
        }
        else{
            card.classList.add('rotate');
            cardObj.isReaveal=true;
            setTimeout(()=>{
                card.children[0].style.display='flex';
                card.children[1].style.display='flex';
                card.children[2].style.display='flex';
                card.style.background='white';
                
             },500)
        }
    }

    rotateLastDealerCard(card){
        
        card.classList.add('rotate');
        this.opponentCardToReavealObject.isReaveal=true;
        setTimeout(()=>{
            card.children[0].style.display='flex';
            card.children[1].style.display='flex';
            card.children[2].style.display='flex';
            card.style.background='white';
                
        },500)
    }

    setCardToReveal(card,cardObj){
        this.opponentCardToReaveal=card;
        this.opponentCardToReavealObject=cardObj;
    }
    
    startGame(){
        this.isGameToStart=true;
        this.player.evaluatePoints();
        this.dealer.evaluatePoints();
    }

   

}