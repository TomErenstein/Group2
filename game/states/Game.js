var Game = function(game) {};

Game.prototype = {
    addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'red', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "red";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "black";
      //target.stroke = "rgba(200,200,200,0.5)";
      target.stroke = "red";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "red";
      target.stroke = "rgba(0,0,0,0)";
      target.stroke = "red";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

    update: function() {

    }, 
    preload: function () {
        this.optionCount = 1;
          game.load.spritesheet('cards',    'assets/images/cards8.png', 230, 325, 55);   //width / height
        //game.load.spritesheet("cards", "assets/images/cards8.png", 71, 95, 55);   
    },
    create: function () {
        console.log("------------START--------------")   //log
        this.stage.disableVisibilityChange = false;
        game.add.sprite(0, 0, 'menu-bg');         //insert background

        //Highscore text
        scoreText = this.game.add.text(1042, 572, 'Score: ', {font: '25px Arial',fill:'white'});
        labelScore = game.add.text(1120, 570, this.score, {font: '30px Arial',fill:'white'}); 
        
        endHighscore = game.add.text(600, 340, " ", {font: '30px Arial',fill:'red'});

        //VARS
        var player1Cards, root, base, deck, selected1;
        var chosen1 = false;
        var rootchosen = false;
        var round = 0;
        var score = 0;
        var highscore = 10000000;
        var scoreText, endHighscore;
        var cardchosenname, cardswappedname;

        var delay = 10;
        // DELAYS
        var playercardsdelay = 300;
        var basecardsdelay = 250;
        var rootcardsdelay = 250;
        var deckcardsdelay = 25;
        var choosedelay = 10;
        var updatedelay = 50;

        // POSTIONS
        var playercardsX = 800, playercardsY = 540;
        var basecardsX = 720, basecardsY = 180;
        var rootcardsX = 181, rootcardsY = 524;
        var deckcardsX = 181, deckcardsY = 524;
        var playercardSpread = 220, basecardSpread = 220, rootcardSpread = 0, deckcardSpread = 0;  //spread

        var scaleX = 1.1, scaleY = 1.1;

        // create card GROUPS
        player1Cards = game.add.group();
        deck = game.add.group();
        root = game.add.group();
        base = game.add.group();
        selected1 = game.add.group();

        var values1 =  [90,83,49,36,11,80,65,94,69,70,39,63,80,67,73,57,18,65,70,33,68,35,60,95,68,46,77,78,58,28,13,50,54,44,80,42,40,81,65,65,38,80,55,94,68,63,90,93,95,86,74,71,100,49,60,57,80,31,34,80,58,66,92,90,35,40,61,81,70];  //Hierarchical
        var values2 = [20,18,46,90,55,20,75,52,38,30,80,23,20,13,33,58,74,30,25,63,71,67,35,6,25,80,48,14,41,70,54,76,46,70,38,60,60,30,30,30,80,30,14,32,60,27,30,39,25,25,20,27,52,65,18,51,35,71,68,35,17,37,25,25,89,91,36,12,20];    //Ambitious
        var values3 = [80,20,56,61,79,55,54,32,49,40,52,28,66,64,40,57,16,65,45,26,43,66,57,37,57,88,56,46,43,68,47,70,95,9,52,19,50,69,40,40,14,60,50,64,64,31,42,36,60,43,48,19,100,63,39,42,10,5,70,52,45,45,27,50,66,62,38,73,40];    //Individuality

        //CREATE cards and assign them values
        for (var i = 0; i < 51; i++) {    //NUMBER of cards: 52
            var card = deck.create(50, 540, "cards");
                card.anchor.set(0.5, 0.5);
                card.frame = i;
                card.name = 'card_' + i;
                card.value1 = values1[i];    
                card.value2 = values2[i];
                card.value3 = values3[i];
        };

        // Some shuffling   / SHUFFLE
            /*
        for (i = 0; i < 51; i++) {
            deck.swap(deck.getRandom(), deck.getRandom());
        }
            */



         /*        CHOOSE root card
        var chooseRoot= function(card) {
        if (!rootchosen)
        {
            var startY = 170 - root.children.length * 50 * 0.5;
            game.add.tween(card).to({ y: startY + 3 * 50, 500:500 }, 500, Phaser.Easing.Quadratic.Out, true, 3*choosedelay);
            //disable after first click each round
            //better do it with highlighting the card

            card.scale.setTo(scaleX, scaleY);
         }
            var startX = 170 - root.children.length * 50 * 0.5;
            game.add.tween(card).to({ x: startX + 50, 500:500 }, 500, Phaser.Easing.Quadratic.Out, true, 3*choosedelay);
            //disable after first click each round
            card.scale.setTo(scaleX, scaleY);      //scale root
         }
        rootchosen = true;    //set to false at next round 
        round=1;
        };*/

        //CALCULATE the score
        var calcScore= function() {
            var rootValue1 = Math.abs(root.children[0].value1);
            var playerValue11 = Math.abs(player1Cards.children[0].value1);
            var playerValue12 = Math.abs(player1Cards.children[1].value1);
            var playerValue13 = Math.abs(player1Cards.children[2].value1);
            console.log("rootValue1: " +rootValue1 +" playerValue11: "+ playerValue11);     //log
            console.log("playerValue12: " +playerValue12 +" playerValue13: "+ playerValue13);
            var value1diff = Math.abs((rootValue1-playerValue11)+(rootValue1-playerValue12)+(rootValue1-playerValue13));

            var rootValue2 = Math.abs(root.children[0].value2);
            var playerValue21 = Math.abs(player1Cards.children[0].value2);
            var playerValue22 = Math.abs(player1Cards.children[1].value2);
            var playerValue23 = Math.abs(player1Cards.children[2].value2);
            var value2diff = Math.abs((rootValue2-playerValue21)+(rootValue2-playerValue22)+(rootValue2-playerValue23));

            var rootValue3 = Math.abs(root.children[0].value3);
            var playerValue31 = Math.abs(player1Cards.children[0].value3);
            var playerValue32 = Math.abs(player1Cards.children[1].value3);
            var playerValue33 = Math.abs(player1Cards.children[2].value3);            
            var value3diff = Math.abs((rootValue3-playerValue31)+(rootValue3-playerValue32)+(rootValue3-playerValue33));

            score = Math.abs((value1diff + value2diff + value3diff)/10);
            console.log((value1diff/10)+"+"+(value2diff/10)+"+"+(value3diff/10)+ "=SCORE: " +score + " ROUND: " + round);

            labelScore.setText(score);
        };

        //CHOOSE player card
        var chooseCard= function(card) {   //card is chosen player card
            if (card != null){
                if (!chosen1){
                    if (card.parent == player1Cards) {
                        /*
                        var startY = card.y - player1Cards.children.length * 50 * 0.5;   //MOVEMENT when chosen
                        game.add.tween(card).to({ y: startY + 1 * 50, 500: 500 }, 500, Phaser.Easing.Quadratic.Out, true, 1*choosedelay);
                        */
                        selected1.add(card);          //select card
                        player1Cards.remove(card);   //remove card out of players hand
                        chosen1 = true;
                        card.scale.setTo(scaleX, scaleY);    //scale
                        cardchosenname = card;
                        round++;                        //next round
                    }
                }
            }
        }; 

        //SWAP chosen player card for base card 
        var swapCard= function(card) {   //card is chosen base card 
            console.log("Card: " + card.name);   //log
            if (card != null){
                if (round<=2){ 
                    if (chosen1){
                        player1Cards.add(card);                  //add chosen card to player
                        base.add(selected1.removeChildAt(0));    //add swapped card to base
                        selected1.remove(card);                  //unselect card
                        console.log("Player1 Cards");
                        console.log(player1Cards.children); 

                        chosen1 = false;
                        card.scale.setTo(1,1);
                        revealCard();                                  //next base card
                        player1Cards.inputEnableChildren = true;       //enable input  
                    }
                    calcScore();                                //calculate score
                }  
                else if (round==3) {                          //END game  GLOBAL Highscore
                    player1Cards.add(card);
                    base.add(selected1.removeChildAt(0));     //move last card
                    selected1.remove(card);

                    updateCards();                                //update and
                    calcScore();                                  //calculate score  

                    player1Cards.inputEnableChildren = false;   //disable input
                    base.inputEnableChildren = false;

                    if (score < highscore) {
                        highscore = score;
                    }   
                    endHighscore.setText("GAMEOVER. Your Highscore is: " + highscore);
                    round++;

                    this.addMenuOption('Next >', function (e) {
                        this.game.state.start("GameOver");    //gameover screen
                    });
                }
            }
        };

        //MOVE all children with delay and keep them spread out horizontically
        var layoutGroup= function(group, x, y, spread, delay) {  //move X
            var startX = x - group.children.length * spread * 0.5;
            for (var i = 0; i < group.children.length; i++) {
                var child = group.children[i];
                game.add.tween(child).to({ x: startX + i * spread, y: y }, 500, Phaser.Easing.Quadratic.Out, true, i*delay);
            }
        };
        /*
        var layoutGroup2= function(group, x, y, spread, delay) {  //move Y   //remove
            var startY = y - group.children.length * spread * 0.5;
            for (var i = 0; i < group.children.length; i++) {
                var child = group.children[i];
                game.add.tween(child).to({ x: x, y: startY + i * spread }, 500, Phaser.Easing.Quadratic.Out, true, i*delay);
            }
        };  */

        var revealCard= function() {  //revealed and updated cards (gets called twice)
            var card = deck.removeChildAt(0);   
            base.add(card);     //add top card of deck to base group
            updateCards();
        };

        var updateCards= function() {         //MOVE player cards and base cards and SCALE chosen card
            cardchosenname.scale.setTo(1,1);    //scale card back
            layoutGroup(player1Cards, playercardsX, playercardsY, playercardSpread, updatedelay);
            layoutGroup(base, basecardsX, basecardsY, basecardSpread, updatedelay);   //move
        };

        //ACTIVATE INPUT
        //root.inputEnableChildren = true;
        //root.onChildInputDown.add(chooseRoot, this); 
        player1Cards.inputEnableChildren = true;
        base.inputEnableChildren = true;
        player1Cards.onChildInputDown.add(chooseCard, this);
        base.onChildInputDown.add(swapCard, this);
        
        
        //SETUP
        //setup ROOT cards
        var rootCard = deck.removeChildAt(0);
        root.add(rootCard);   
        /*for (var j = 0; j < 3; j++) {
            var card = deck.removeChildAt(0);
            root.add(card);
        }*/
        //setup BASE cards
        for (var k = 0; k < 3; k++) {
            var card = deck.removeChildAt(0);
            base.add(card);
        }
        //distribute 3 cards to each player
        for (var playerID = 0; playerID < 2; playerID++) {
            for (var i = 0; i < 3; i++) {
                var card = deck.removeChildAt(0);
                if (playerID == 0) {
                    player1Cards.add(card);
                }
            }
        }

        //MOVEMENT
        //ROOT card movement
        //layoutGroup(root, rootcardsX, basecardsY, rootcardSpread, rootcardsdelay);
        for (var i = 0; i < root.children.length; i++) {
            var child = root.children[i];
            game.add.tween(child).to({ x: rootcardsX, y: rootcardsY }, 0, Phaser.Easing.Quadratic.Out, true, i*rootcardsdelay);
            child.scale.setTo(scaleX, scaleY);    //scale
        }
        //DECK movement under ROOT card
        for (var i = 0; i < deck.children.length; i++) {
            var child = deck.children[i];
            game.add.tween(child).to({ x: deckcardsX, y: deckcardsY }, 0, Phaser.Easing.Quadratic.Out, true, i*deckcardsdelay);
        }
        //MOVE player cards and base cards to start positions
        layoutGroup(player1Cards, playercardsX, playercardsY, playercardSpread, playercardsdelay);
        layoutGroup(base, basecardsX, basecardsY, basecardSpread, basecardsdelay);
        calcScore();    //calc score
        console.log("END of CREATE");
    }     //END OF CREATE

};