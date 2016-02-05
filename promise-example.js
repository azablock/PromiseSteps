'use strict';

class Unit {
    constructor(options) {
        this.model = options.model;
    }

    step() {
        var self = this,
            promise = Q.Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    position: _.random(24)
                });
            }, self.model.speed);
        });
        return promise;
    }

    update() {
        var self = this;
        this.step().then(data => {
            var name = self.model.name,
                unitId = name + '-value',
                outputText = name + ' position: ' + data.position,
                $element = document.getElementById(unitId);

            self.model.position = data.position;
            $element.innerText = outputText;
            self.update();
        });
    }
};

var units = [
    new Unit({
        model: {
            speed: 1250,
            name: 'mariusz',
            position: 0 
        }
    }), 
    new Unit({
        model: {
            speed: 3000,
            name: 'pSzemek',
            position: 5            
        }
    })
];

_(units).each(unit => unit.update());



/*
function gameLoop() {
    async().then(data => {

        updateGrid(data.value);

        _.each(grid, e => console.info(e));
    }).then(gameLoop);
};
gameLoop();

*/