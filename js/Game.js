import { UiSelectors } from "./UiSelectors.js";
import { Bank } from "./Bank.js";
import { Player } from "./Player.js";
import { Board } from "./Board.js";
import { Com } from "./Com.js";

class Game{

    constructor(){
        this.bank=null;
        this.startButton=null;
        this.standButton=null;
        this.hitButton=null;
        this.resetButton=null;
        this.player=null;
        this.dealer=null;
        this.board=null;
        this.betSection=null;
        this.pointsSection=null;
        this.isLose=null;
        this.com=null;
    }

    newGame(){
        this.startButton=ui.startButton;
        this.hitButton=ui.hitButton;
        this.standButton=ui.standButton;
        this.betSection=ui.betSection;
        this.resetButton=ui.resetButton;
        this.pointsSection=ui.pointsSection;
        this.player=new Player('player',ui.playerPointsSpan);
        this.dealer=new Player('dealer',ui.dealerPointsSpan);
        this.initBoard();
        this.initBank();
        this.addListeners();
    }

    initBank(){
        this.bank=new Bank();
        this.bank.init();
        this.bank.updateMoneySpans();
    }

    initBoard(){
        this.board=new Board(this.player,this.dealer);
        this.board.init();
    }

    addListeners(){
        this.startButton.addEventListener('click',()=>{
           this.startButtonClick();
        })
        this.hitButton.addEventListener('click',()=>{
            this.hitButtonClick();
        })
        this.standButton.addEventListener('click',()=>{
            this.standButtonClick();
        })
    }

    changeView(){
        this.startButton.style.display='none';
        this.standButton.style.display='block';
        this.hitButton.style.display='block';
        this.betSection.style.display='none';
        this.resetButton.style.display='none';
        this.pointsSection.style.display='flex';
    }

    startButtonClick(){
        if(this.bank.betMoney){
            this.changeView();
            this.board.startDeal();
        }
        else{
            alert('First bet money!');
        }
    }

    hitButtonClick(){
        if(this.board.isGameToStart==true&&this.board.playerLimit<=7){

            this.makeHitButtonDisable();
            this.board.giveCardToPlayer();

            setTimeout(()=>{
                this.player.evaluatePoints();
                this.checkIfOver21();
            },2000)
        }
    }

    makeHitButtonDisable(){
        this.hitButton.setAttribute('disabled','true');
        setTimeout(()=>{
            this.hitButton.removeAttribute('disabled');
        },2000)

        
    }

    standButtonClick(){
        if(this.board.isGameToStart==true){
            this.makeStandButtonDisable();
            this.board.rotateLastDealerCard(this.board.opponentCardToReaveal);
            setTimeout(()=>{
                this.dealer.evaluatePoints();
                this.checkScore();
            },2000)
            this.hitButton.setAttribute('disabled',''); 
        }
    }


    makeStandButtonDisable(){
        this.standButton.setAttribute('disabled','');
    }

    checkIfOver21(){
        if(this.player.points>21){
            this.isLose=true;
            this.endGame();
        }
    }
    
    checkScore(){
        if(this.player.points<this.dealer.points&&this.dealer.points<=21){
            this.isLose=true;
            this.endGame();
        }

        if(this.player.points>this.dealer.points&&this.player.points){
            this.board.giveCardToDealer();
            setTimeout(()=>{
                this.dealer.evaluatePoints();
                this.checkScore();
            },2000)
        }

        if(this.dealer.points>21){
            this.isLose=false;
            this.endGame();
        }

        if(this.dealer.points==this.player.points){
            this.isLose=0;
            this.endGame();
        }
    }




    endGame(){
        this.giveCardsBack();
        this.hitButton.setAttribute('disabled','');
        this.standButton.setAttribute('disabled','');

        if(this.isLose==true){
            let lostMoney=this.bank.betMoney;
            this.bank.betMoney=0;
            this.bank.updateMoneySpans();
            this.com=new Com(true,lostMoney,this.bank);
            console.log(this.board.cards);
        }
        if(this.isLose==false){
            let wonMoney=this.bank.betMoney;
            this.bank.betMoney=0;
            this.bank.ownMoney+=2*wonMoney;
            this.bank.updateMoneySpans();
            this.com=new Com(true,lostMoney,this.bank);
        }
    }

    giveCardsBack(){
        this.player.cards.forEach((card)=>{
            this.board.cards.push(card);
        })

        this.dealer.cards.forEach((card)=>{
            this.board.cards.push(card);
        })

        this.board.shuffle();
    }

}

const ui=UiSelectors;
const game=new Game();
game.newGame();