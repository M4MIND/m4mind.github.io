var main = (function () {
    var matrix = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    var score = 0;

    var snakeState = {
        alive: true,
        position: null,
        score: 0,
    }

    var snake = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }]
    var apple = { x: 4, y: 4 }

    var broccoliTick = 10
    var broccoli = {x: 5, y: 5}

    var state = "ArrowDown"
    
    document.addEventListener('keydown', function (e) {
        state = e.key
    })
    var move = function (d) {
        var head = snake[snake.length - 1]
        var headNew = { x: head.x + d.x, y: head.y + d.y }
        if (headNew.x >= 0 && headNew.x < matrix.length && headNew.y >= 0 && headNew.y < matrix[0].length && matrix[headNew.x][headNew.y] !== 1 && matrix[headNew.x][headNew.y] !== 3) {
            snake.push(headNew)
            snakeState.position = snake;
            matrix[headNew.x][headNew.y] = 1

            var emptys = transformMatrix()

            if (headNew.x === apple.x && headNew.y === apple.y) {
                apple = emptys[Math.floor(Math.random() * emptys.length)]
                matrix[apple.x][apple.y] = 2
                snakeState.score += 1;
            } else {
                var tail = snake[0]
                matrix[tail.x][tail.y] = 0
                snake.shift()
            }

            broccoliTick--
            
            if (broccoliTick === 0) {
                matrix[broccoli.x][broccoli.y] = 0
                broccoli = emptys[Math.floor(Math.random()*emptys.length)]
                matrix[broccoli.x][broccoli.y] = 3
                broccoliTick = 10
            }
        } else {
            snakeState.alive = false;
        }
    }
    function transformMatrix() {
        var emptyCells = []
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[x][y] === 0) {
                    emptyCells.push({ x: x, y: y })
                }
            }
        }
        return emptyCells;
    }
    return {
        onTick: function () {
            switch (state) {
                case "ArrowUp":
                    move({ x: -1, y: 0 })
                    break
                case "ArrowDown":
                    move({ x: 1, y: 0 })
                    break
                case "ArrowLeft":
                    move({ x: 0, y: -1 })
                    break
                case "ArrowRight":
                    move({ x: 0, y: 1 })
                    break
            }
        },
        getMatrix: function () {
            return matrix;
        },
        snake: function () {
            return snakeState
        }
    }
})();