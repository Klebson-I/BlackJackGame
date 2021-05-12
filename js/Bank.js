import { UiSelectors } from "./UiSelectors.js";

const Ui=UiSelectors;

export class Bank{
    constructor(){
        this.ownMoney=100;
        this.betMoney=0;

        this.cap10=Ui.cap10;
        this.cap50=Ui.cap50;
        this.cap100=Ui.cap100;
        this.resetButton=Ui.resetButton;

        this.moneySpan=Ui.ownedMoneySpan;
        this.betSpan=Ui.betValueSpan;
    }

    init(){
        this.addListeners();
    }

    addListeners(){
        this.cap10.addEventListener('click',()=>{
            this.addDollars(10);
        });
        this.cap50.addEventListener('click',()=>{
            this.addDollars(50);
        });
        this.cap100.addEventListener('click',()=>{
            this.addDollars(100);
        });
        this.resetButton.addEventListener('click',()=>{
            this.resetBet();
        });
    }

    addDollars(value){
        if(this.ownMoney>=value){
            this.ownMoney-=value;
            this.betMoney+=value;
        }
        else{
            alert('You dont have enought money');
        }
        this.updateMoneySpans();
    }

    resetBet(){
        this.ownMoney+=this.betMoney;
        this.betMoney=0;

        this.updateMoneySpans();
    }

    updateMoneySpans(){
        this.moneySpan.textContent=`${this.ownMoney} $`;
        this.betSpan.textContent=`${this.betMoney} $`;
    }

}