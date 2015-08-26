function solve() {
    var isCalled = false,
        digits = [],
        callNumber = 1,
        theNumber;

    function init(playerName, endCallback) {
        isCalled = true;
        genereteNumber();
        theNumber = digits.join('');
        $('#input-name').hide();
        $('#input-label').text('Enter your guess number:').attr('for', 'guess-input').after($('<input />').attr('id', 'guess-input'));
        $('#start-button').text('Guess').unbind().click(function () {
            var guessNumber = $('#guess-input').val();
            if (validateGuessNumber(guessNumber)) {
                $('#guess-input').val('');
                var result = guess(guessNumber);
                if (result.rems === 4) {
                    saveBestScore(playerName, callNumber);
                    endCallback();
                }
            }
        });
    }

    function guess(number) {
        if (!isCalled) {
            throw 'Init must be called first';
        }
        console.log('Attempt ' + callNumber);
        callNumber++;
        console.log(number + ' rams: ' + showResult(number).rams + '; sheep: ' + showResult(number).sheep);
        $('#results').append($('<li />').text('Number: '+number + ' rams: ' + showResult(number).rams +' sheep: ' + showResult(number).sheep));
        return showResult(number);
    }

    function getHighScore(count) {
        return JSON.parse(localStorage.getItem('TheSheepGame')).slice(0, count);
    }

    function validateGuessNumber(guessNumber) {
        if (isNaN(guessNumber)
            || parseInt(guessNumber) < 1000
            || parseInt(guessNumber) > 9999
            || parseInt(guessNumber) !== parseInt(guessNumber) | 0) {
            return false;
        }

        for (var i = 0; i < guessNumber.length; i++) {
            for (var j = i + 1; j < guessNumber.length; j++) {
                if (guessNumber[j] === guessNumber[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    function showResult(guessNumber) {
        var rams = 0,
            sheep = 0,
            i, j;
        for (i = 0; i < theNumber.length; i++) {
            for (j = 0; j < theNumber.length; j++) {
                if (theNumber[i] === guessNumber[j]) {
                    if (i === j) {
                        rams++;
                        break;
                    } else {
                        sheep++;
                        break;
                    }
                }
            }
        }
        return {
            sheep: sheep,
            rams: rams
        };
    }

    function genereteNumber() {
        digits.push(Math.floor(Math.random() * 9) + 1);
        while (digits.length < 4) {
            var nextDigit = Math.floor(Math.random() * 10);
            if(digits.every(function(digit){
            return digit!=nextDigit;
            })) {
                digits.push(nextDigit);
            }
        }
    }

    function saveBestScore(playerName, score) {
        var playerScore=[],
            localStorageInput;

        playerScore.push({
            name: playerName,
            score:score
        });

        if (localStorage.TheSheepGame === undefined) {
            localStorage.setItem('TheSheepGame', JSON.stringify(playerScore));
        } else {
            localStorageInput = JSON.parse(localStorage.getItem('TheSheepGame'));
            localStorageInput.push({
                name: playerName,
                score:score
            });
            localStorageInput.sort(function (first, second) {
                return y.score - x.score;
            });
            localStorage.setItem('TheSheepGame', JSON.stringify(localStorageInput));
        }
    }

    return {
        init, guess, getHighScore
    };
}
    var game = solve();

    $('#start-button').click(function () {
        var playerName = $('#input-name').val();
        if (playerName && playerName.length > 0) {
            game.init(playerName, endGame);
        } else {
            alert('Enter tour name to start the game');
        }
    });

    function endGame() {
        console.log('Congratulations!');
        console.log('Top 10:');
        var topTen = game.getHighScore(10);

        for (var i = 0; i < topTen.length; i++) {
            console.log(topTen[i].name + ' : ' + topTen[i].score);
        }

        var startAgain = confirm('Try again?');
        if (startAgain) {
            this.location.reload();
        } else {
            window.close();
        }
    }

module.exports = solve;
