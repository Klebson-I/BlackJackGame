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

    changeView(num){
        if(num==1){
            this.startButton.style.display='none';
            this.standButton.style.display='block';
            this.hitButton.style.display='block';
            this.betSection.style.display='none';
            this.resetButton.style.display='none';
            this.pointsSection.style.display='flex';
        }
        if(num==2){
            this.startButton.style.display='block';
            this.standButton.style.display='none';
            this.hitButton.style.display='none';
            this.betSection.style.display='flex';
            this.resetButton.style.display='flex';
            this.pointsSection.style.display='none';
        }
        
    }

    startButtonClick(){
        if(this.bank.betMoney){
            this.changeView(1);
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
            this.isLose='lose';
            this.endGame();
        }
    }
    
    checkScore(){
        if(this.dealer.points>21){
            this.isLose='win';
            this.endGame();
            return;
        }
        if(this.dealer.points>this.player.points){
            this.isLose='lose';
            this.endGame();
            return;
        }

        if(this.dealer.points<this.player.points){
            this.board.giveCardToDealer();
            setTimeout(()=>{
                this.dealer.evaluatePoints();
                this.checkScore();
            },2000)
        }

        if(this.dealer.points==this.player.points&&this.player.points<21&&this.getRisk()==true){
            console.log('risk');
            this.board.giveCardToDealer();
            setTimeout(()=>{
                this.dealer.evaluatePoints();
                this.checkScore();
            },2000)
            return;
        }

        if(this.player.points==this.dealer.points){
            this.isLose='both';
            this.endGame();
            return;
        }
    }

    getRisk(){
        const random=Math.floor(Math.random()*10+1);
        if(random%5==0)return true;
        else return false;
    }


    endGame(){
        this.giveCardsBack();
        this.hitButton.setAttribute('disabled','');
        this.standButton.setAttribute('disabled','');

        if(this.isLose=='lose'){
            let lostMoney=this.bank.betMoney;
            this.bank.betMoney=0;
            this.bank.updateMoneySpans();
            this.com=new Com('lose',lostMoney,this.bank);
            this.addListenerToCom();
        }
        if(this.isLose=='win'){
            let wonMoney=this.bank.betMoney*2;
            this.bank.betMoney=0;
            this.bank.ownMoney+=wonMoney;
            this.bank.updateMoneySpans();
            this.com=new Com('win',wonMoney,this.bank);
            this.addListenerToCom();
        }
        if(this.isLose=='both'){
            let wonMoney=this.bank.betMoney;
            this.bank.betMoney=0;
            this.bank.ownMoney+=wonMoney;
            this.bank.updateMoneySpans();
            this.com=new Com('both',wonMoney,this.bank);
            this.addListenerToCom();
        }
        
    }

    addListenerToCom(){
        this.com.playAgainButton.addEventListener('click',()=>{
            this.com.hide();
            this.startGame();
        })
    }

    giveCardsBack(){
        this.player.cards.forEach((card)=>{
            this.board.cards.push(card);
        })

        this.dealer.cards.forEach((card)=>{
            this.board.cards.push(card);
        })

        this.board.shuffle();

        this.player.cards=[];
        this.dealer.cards=[];
        this.player.points=0;
        this.dealer.points=0;
    }

    startGame(){

        while(this.board.dealerCardBoard.firstChild){
            this.board.dealerCardBoard.lastChild.remove();
        }
        while(this.board.playerCardBoard.firstChild){
            this.board.playerCardBoard.lastChild.remove();
        }

        this.player.updatePlayerPoints();
        this.dealer.updatePlayerPoints();

        this.hitButton.removeAttribute('disabled');
        this.standButton.removeAttribute('disabled');

        this.board.playerLimit=0;
        this.board.dealerLimit=0;

        this.isLose=null;

        this.changeView(2);
    }

}

const ui=UiSelectors;
const game=new Game();
game.newGame();