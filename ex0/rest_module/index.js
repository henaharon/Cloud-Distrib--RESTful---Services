var events       = require('events'),
    eventsConfig = require('./config').events;

const maxTables=5;

class restaurant extends events.EventEmitter{
    constructor(){
        super();            //call prototype(parent) to copy props+methods
        this.numOfTabels=0; //number of used tables
        this.msgLog=[];     //holds all the logs
        this.allOrders=[];  //holds all orders
    }

    newOrder(num) {
        if(this.numOfTabels+num >=  maxTables)
        {
            this.emit('restFull')
            return;   
        }
        ++this.numOfTabels;
        this.emit('newTable')
    }

    cancleOrder(num) {
        if(this.numOfTabels>num)
        {
            this.emit('endTable')
            this.numOfTabels-=num;
            return;
        }
        this.emit('endError')
    }

    ResetAllOrder() {
        this.emit('restEmpty')
        this.numOfTabels=0;
    }

    fRestFull() {
        this.msgLog.push('Sorry, there is no availble tables right now');
        console.log('Sorry, there is no availble tables right now');
    }

    fOrderTable() {
        this.msgLog.push('Your order has been successfully placed. have fun :)');
        console.log('Your order has been successfully placed. have fun :)');
    }

    fEndOrder() {
        this.msgLog.push('Your order was successfully canceled.')
        console.log('Your order was successfully canceled.')
    }
    
    fErrorEnd() {
        this.msgLog.push('There is a mistake, the order can not be canceled')
        console.log('There is a mistake, the order can not be canceled')
    }

    fResetAll() {
        this.msgLog.push('The restaurant is empty. All tables are available')
        console.log('The restaurant is empty. All tables are available')
    }
}

module.exports=restaurant;