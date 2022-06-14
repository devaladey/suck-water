const suckBtn = document.getElementById('suckBtn');
const luckyNumBtn = document.getElementById('luckyNumBtn');
const userLuckyNumber = document.getElementById('luckyNumberInput');
const gameContainer = document.querySelector('.game-container');
const gameResult = document.querySelector('.game-result-list');
const gameResultTwo = document.querySelector('.game-result-list-two');
const modalContainer = document.querySelector('.modal-container');

let playerInitialSuckAmount = 100;
let computerInitialSuckAmount = 100;
setBarValues(playerInitialSuckAmount, computerInitialSuckAmount);

luckyNumBtn.addEventListener('click', function () {
    disableUserLuckyNumberInput();
    this.disabled = true;
    gameContainer.style.display = "block";
});

suckBtn.addEventListener('click', suckingHandler);

function createRandomValue(num = 20, numEnd = 1) {
    return Math.floor(Math.random() * num) + numEnd;
}

function setBarValues(playerValue, computerValue) {
    const bars = document.querySelectorAll('.bar');

    bars.forEach(bar => {

        function updateChildBar(value) {
            bar.children[0].style.width = value + "%";
            bar.children[1].innerHTML = value + "%";
        }

        if (bar.classList.contains('bar-player')) {
            updateChildBar(playerValue);
        } else if (bar.classList.contains('bar-computer')) {
            updateChildBar(computerValue);
        }
    });
}

function checkWin() {

    function resetAllValues(winText) {

        suckBtn.removeEventListener('click', suckingHandler);

        modalContainer.querySelector('.game-result-modal-text').innerHTML = winText;

        modalContainer.style.display = "block";

        
        document.getElementById('modalBtn').addEventListener('click', function () {
            modalContainer.style.display = "none";
            luckyNumBtn.disabled = false;
            playerInitialSuckAmount = 100;
            computerInitialSuckAmount = 100;
            setBarValues(playerInitialSuckAmount, computerInitialSuckAmount);
            gameContainer.style.display = "none";
            gameResultTwo.innerHTML = "";
            disableUserLuckyNumberInput();
            suckBtn.addEventListener('click', suckingHandler);
        });
        
    }

    if (playerInitialSuckAmount <= 0 && playerInitialSuckAmount < computerInitialSuckAmount) {
        resetAllValues('Loose...');
    } else if (computerInitialSuckAmount <= 0 && computerInitialSuckAmount < playerInitialSuckAmount) {
        resetAllValues('Win...');
    }
}

function disableUserLuckyNumberInput() {
    userLuckyNumber.disabled = !userLuckyNumber.disabled;
}

function createTurnResult(resultText) {

    // const gameResultItem = document.createElement('LI');
    // gameResultItem.innerHTML = resultText;
    // gameResult.appendChild(gameResultItem);

    gameResultTwo.innerHTML = `<li>${resultText}</li>`;
}



function suckingHandler() {
    const computerLuckyNumber = 7;
    const checkVal = createRandomValue(10);

    
    let playerLuckyNumberAmount = 0;
    let computerLuckyNumberAmount = 0;
    let playerVomit = playerInitialSuckAmount;
    let computerVomit = computerInitialSuckAmount;
    let playerReservedWater = 0;
    let computerReservedWater = 0;

    if (checkVal == userLuckyNumber.value || checkVal == 5) {

        playerLuckyNumberAmount = createRandomValue(10);
        computerLuckyNumberAmount = createRandomValue(5);
        playerInitialSuckAmount += playerLuckyNumberAmount;
        // playerInitialSuckAmount = playerInitialSuckAmount > 100 ? 100 : playerInitialSuckAmount;

        if(playerInitialSuckAmount > 100) {
            playerReservedWater += (playerInitialSuckAmount - 100);
            playerInitialSuckAmount = 100;
            console.log('Player reserved water: ',playerReservedWater);
        }

        computerVomit -= computerInitialSuckAmount;
        computerInitialSuckAmount -= computerLuckyNumberAmount;

        createTurnResult(`
                Player drinks ${playerLuckyNumberAmount} litres --
                Computer vomits 
                ${computerVomit} litres
            `);

    } else if (checkVal == computerLuckyNumber || checkVal == 9) {

        playerLuckyNumberAmount = createRandomValue(5);
        computerLuckyNumberAmount = createRandomValue(10);
        computerInitialSuckAmount += computerLuckyNumberAmount;
        // computerInitialSuckAmount = computerInitialSuckAmount > 100 ? 100 : computerInitialSuckAmount;

        if(computerInitialSuckAmount > 100) {
            computerReservedWater += (computerInitialSuckAmount - 100);
            computerInitialSuckAmount = 100;
            console.log('Computer reserved water: ',computerReservedWater);
        }

        playerVomit -= playerInitialSuckAmount;
        playerInitialSuckAmount -= playerLuckyNumberAmount;

        createTurnResult(`
                Player vomits ${playerVomit} litres --
                Computer drinks 
                ${computerLuckyNumberAmount} litres
            `);

    } else {

        playerLuckyNumberAmount = createRandomValue(5);
        computerLuckyNumberAmount = createRandomValue(5);
        playerInitialSuckAmount -= playerLuckyNumberAmount;
        playerVomit -= playerInitialSuckAmount;
        computerInitialSuckAmount -= computerLuckyNumberAmount;
        computerVomit -= computerInitialSuckAmount;

        createTurnResult(`Player vomits ${playerVomit} litres -- Computer vomits ${computerVomit} litres`);
    }

    setBarValues(playerInitialSuckAmount, computerInitialSuckAmount);
    checkWin();

}
