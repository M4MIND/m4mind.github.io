var gameMatrixScreen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

var gameConstructorObject = (function () {
    return {
        emptyBlock: function () {
            var element = document.createElement('div');
            element.classList.add('emptyBlock');

            return element;
        },
    }
})();


var screenGame = document.getElementsByClassName('container')[0];
var score = document.getElementById('score').getElementsByTagName('span')[0];

var render = (function () {
    var idInterval;

    return {
        screenRender: function () {
            for (var y = 0; y < gameMatrixScreen.length; y++) {
                for (var x = 0; x < gameMatrixScreen[y].length; x++) {
                    gameMatrixScreen[y][x] = gameConstructorObject.emptyBlock();
                    screenGame.appendChild(gameMatrixScreen[y][x]);
                }
            }
        },
        gameRender: function () {
            idInterval = setInterval(function () {
                main.onTick();

                if (!main.snake().alive) {
                    clearInterval(idInterval)
                    for (var y = 0; y < gameMatrixScreen.length; y++) {
                        for (var x = 0; x < gameMatrixScreen[y].length; x++) {
                            if (gameMatrixScreen[y][x].classList.contains('snakeBlock') || gameMatrixScreen[y][x].classList.contains('headBlock')) {
                                gameMatrixScreen[y][x].className = 'boom'
                            }
                        }
                    }

                    new Audio('/02633.mp3').play();

                    setTimeout(function () {
                        if (window.localStorage.getItem('score') > main.snake().score) {
                            window.localStorage.setItem('score', main.snake().score);
                        }

                        alert(window.localStorage.getItem('score') > main.snake().score ? window.localStorage.getItem('score') : main.snake().score);
                    }, 1000)

                    return;
                }

                var matrixOut = main.getMatrix();

                for (var y = 0; y < matrixOut.length; y++) {
                    for (var x = 0; x < matrixOut[y].length; x++) {
                        if (matrixOut[y][x] === 0) {
                            gameMatrixScreen[y][x].className = 'emptyBlock';
                        }
                        if (matrixOut[y][x] === 1) {
                            gameMatrixScreen[y][x].className = 'snakeBlock';
                        }
                        if (matrixOut[y][x] === 2) {
                            gameMatrixScreen[y][x].className = 'eatBlock';
                        } if (matrixOut[y][x] === 3) {
                            gameMatrixScreen[y][x].className = 'broccoli';
                        }
                    }
                }

                var snakePosition = main.snake().position;

                gameMatrixScreen[snakePosition[snakePosition.length - 1].x][snakePosition[snakePosition.length - 1].y].className = 'headBlock';

                score.innerText = main.snake().score;
            }, 250);
        }
    }
})();

render.screenRender();

document.addEventListener('DOMContentLoaded', function () {
    if (confirm('GO?')) {
        render.gameRender();
    }
    else {
        location.reload();
    }
});