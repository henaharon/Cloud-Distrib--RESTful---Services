var events      = require('events'),
    express     = require('express'),
    restaurant  = require('./rest_module/index'),
    config      = require('./rest_module/config').events;


    var myRestaurant = new restaurant(),
        app          = express(),
        port         = process.env.PORT || 8080;

    app.get('/', (req,res) => {
        myRestaurant.newOrder(1);
        myRestaurant.newOrder(3);
        myRestaurant.newOrder(5);
        myRestaurant.cancleOrder(2);
        myRestaurant.cancleOrder(1);
        myRestaurant.ResetAllOrder();

        res.send(JSON.stringify(myRestaurant.msgLog));
        res.end();
    })
    
    app.listen(port, () =>{
        console.log(`Listening to port ${port}`);
    })


myRestaurant
    .on(config.NEW, myRestaurant.fOrderTable)
    .on(config.END, myRestaurant.fEndOrder)
    .on(config.END_ERROR, myRestaurant.fErrorEnd)
    .on(config.FULL, myRestaurant.fRestFull )
    .on(config.EMPTY, myRestaurant.fResetAll );

