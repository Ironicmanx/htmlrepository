document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const startStopBtn = document.getElementById('startStopBtn');
    const gridSize = 25;
    let snake = [{ x: 13, y: 13 }];
    let direction = 'right';
    let food = getRandomPosition();
    let score = 0;
    let gameInterval;

    function draw() {
        board.innerHTML = '';
        snake.forEach(segment => board.appendChild(createCell(segment.x, segment.y, 'snake')));
        board.appendChild(createCell(food.x, food.y, 'food'));

        if (score % 10 === 0 && score !== 0) {
            const specialFood = getRandomPosition();
            board.appendChild(createCell(specialFood.x, specialFood.y, 'special-food'));
        }

        scoreDisplay.textContent = `Score: ${score}`;
    }

    function createCell(x, y, className) {
        const cell = document.createElement('div');
        cell.className = `cell ${className}`;
        cell.style.gridColumn = x;
        cell.style.gridRow = y;
        return cell;
    }

    function getRandomPosition() {
        return { x: Math.floor(Math.random() * gridSize) + 1, y: Math.floor(Math.random() * gridSize) + 1 };
    }

    function move() {
        const head = { ...snake[0] };
        switch (direction) {
            case 'up': head.y = (head.y - 1 < 1) ? gridSize : head.y - 1; break;
            case 'down': head.y = (head.y + 1 > gridSize) ? 1 : head.y + 1; break;
            case 'left': head.x = (head.x - 1 < 1) ? gridSize : head.x - 1; break;
            case 'right': head.x = (head.x + 1 > gridSize) ? 1 : head.x + 1; break;
        }
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) score++, food = getRandomPosition();
        else snake.pop();

        const specialFoodElement = document.querySelector('.special-food');
        if (specialFoodElement && head.x === +specialFoodElement.style.gridColumn && head.y === +specialFoodElement.style.gridRow) {
            score += 5;
            specialFoodElement.remove();
        }
    }

    function checkCollision() {
        const head = snake[0];
        return (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) || snake.slice(1).some(s => head.x === s.x && head.y === s.y);
    }

    function toggleGame() {
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
            startStopBtn.textContent = 'Start Game';
        } else {
            gameInterval = setInterval(() => {
                move();
                if (checkCollision()) {
                    alert(`Game Over! Your score: ${score}`);
                    resetGame();
                } else draw();
            }, 100);
            startStopBtn.textContent = 'Stop Game';
        }
    }

    function resetGame() {
        clearInterval(gameInterval);
        snake = [{ x: 13, y: 13 }];
        direction = 'right';
        food = getRandomPosition();
        score = 0;
        draw();
        startStopBtn.textContent = 'Start Game';
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
            case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
            case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
            case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
        }
    });

    resetGame();
    startStopBtn.addEventListener('click', toggleGame);
});
