document.getElementById('predictor-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const latestOdd = parseFloat(document.getElementById('latest-odd').value);
    const latestTime = document.getElementById('latest-time').value;

    if (!latestOdd || !latestTime) {
        alert('Please enter both the latest odd and time.');
        return;
    }

    const results = calculatePredictions(latestOdd, latestTime);

    displayResults(results);
});

function calculatePredictions(latestOdd, latestTime) {
    const predictions = {
        pink: [],
        blue: [],
        purple: []
    };

    const baseTime = new Date();
    const [hours, minutes] = latestTime.split(':');
    baseTime.setHours(hours, minutes, 0, 0);

    if (latestOdd >= 10 && latestOdd < 15) {
        const nextHugePinkTime = new Date(baseTime);
        nextHugePinkTime.setMinutes(baseTime.getMinutes() + 20);

        predictions.pink.push(formatTime(nextHugePinkTime));
        addIntervalPredictions(predictions.pink, nextHugePinkTime);
    } else if (latestOdd >= 15) {
        addIntervalPredictions(predictions.pink, baseTime);
    }

    if (latestOdd >= 1.5) {
        predictions.blue.push('Next blue will be over 5x (70% accurate)');
    } else if (latestOdd < 1.5 && latestOdd >= 1.0) {
        predictions.blue.push('There is a high chance of a jackpot coming (60% accurate)');
    }

    if (latestOdd >= 2.0 && latestOdd < 2.5) {
        predictions.purple.push('JP coming (odds above 50x)');
    } else if (latestOdd >= 4.0) {
        predictions.purple.push('Blues or clustered pinks coming');
    }

    return predictions;
}

function addIntervalPredictions(predictionsArray, baseTime) {
    const intervals = [1, 1, 2, 3];
    let currentTime = new Date(baseTime);

    intervals.forEach(interval => {
        currentTime.setMinutes(currentTime.getMinutes() + interval);
        predictionsArray.push(formatTime(currentTime));
    });
}

function formatTime(date) {
    return date.toTimeString().split(' ')[0].substring(0, 5);
}

function displayResults(results) {
    document.getElementById('pink-predictions').innerHTML = '<h3>Pink Predictions</h3><ul>' + results.pink.map(time => `<li>${time}</li>`).join('') + '</ul>';
    document.getElementById('blue-predictions').innerHTML = '<h3>Blue Predictions</h3><ul>' + results.blue.map(text => `<li>${text}</li>`).join('') + '</ul>';
    document.getElementById('purple-predictions').innerHTML = '<h3>Purple Predictions</h3><ul>' + results.purple.map(text => `<li>${text}</li>`).join('') + '</ul>';
}
