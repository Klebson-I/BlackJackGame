import { UiSelectors } from "./UiSelectors.js";


const ui= UiSelectors;
export class Com{
    constructor(isLose,money,bank) {
        this.isWinElement=ui.winResoults;
        this.moneyResultsElement=ui.winValueResoults;
        this.moneyLeftElement=ui.moneyLeftResoults;
        this.playAgainButton=ui.playAgainButton;
        this.com=ui.comBoard;

        this.bank=bank;
        this.money=money;
        this.isLose=isLose;

        setTimeout(()=>{
            this.init();
        },500)
        
    }

    init(){
        this.com.style.display='flex';
        this.setValues();
    }

    setValues(){
        if(this.isLose=='lose'){
            this.isWinElement.textContent='You lose';
            this.moneyResultsElement.textContent=`Money lost : ${this.money}$`;
            this.moneyLeftElement.textContent=`You have : ${this.bank.ownMoney}$`;
        }
        if(this.isLose=='win'){
            this.isWinElement.textContent='You win';
            this.moneyResultsElement.textContent=`Money win : ${this.money}$`;
            this.moneyLeftElement.textContent=`You have : ${this.bank.ownMoney}$`;
        }
        if(this.isLose=='both'){
            this.isWinElement.textContent='Both win';
            this.moneyResultsElement.textContent=`Money win : none`;
            this.moneyLeftElement.textContent=`You have : ${this.bank.ownMoney}$`;
        }
    }
    hide(){
        this.com.style.display='none';
    }
}