import { UiSelectors } from "./UiSelectors.js";
import { Bank } from "./Bank.js";
import { Player } from "./Player.js";
import { Board } from "./Board.js";

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
    }

    newGame(){
        this.startButton=ui.startButton;
        this.hitButton=ui.hitButton;
        this.standButton=ui.standButton;
        this.betSection=ui.betSection;
        this.resetButton=ui.resetButton;
        this.pointsSection=ui.pointsSection;
        this.player=new Player('player');
        this.dealer=new Player('dealer');
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
            if(this.bank.betMoney){
                this.changeView();
                this.board.startDeal();
            }
            else{
                alert('First bet money!');
            }
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

}

const ui=UiSelectors;
const game=new Game();
game.newGame();