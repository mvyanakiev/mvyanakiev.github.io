let flashcards = [];
let currentIndex = 0;
let showingAnswer = false;

const flashcardLists = {
    'list1': 'https://raw.githubusercontent.com/mvyanakiev/mvyanakiev.github.io/refs/heads/master/flash/cards/flashcards.txt',
    'list2': 'https://raw.githubusercontent.com/mvyanakiev/mvyanakiev.github.io/refs/heads/master/flash/cards/initials.txt',
    'list3': 'https://raw.githubusercontent.com/mvyanakiev/mvyanakiev.github.io/refs/heads/master/flash/cards/qcodes.txt',
    'list4': 'https://raw.githubusercontent.com/mvyanakiev/mvyanakiev.github.io/refs/heads/master/flash/cards/shortens.txt',
    'list5': 'https://raw.githubusercontent.com/mvyanakiev/mvyanakiev.github.io/refs/heads/master/flash/cards/modes.txt'
};

document.getElementById('flashcardList').addEventListener('change', function() {
    const selectedList = this.value;
    if (selectedList) {
        loadFlashcards(flashcardLists[selectedList], selectedList === 'list1'); // Предаваме true, ако списъкът е flashcards (list1)
    }
});

function loadFlashcards(url, shouldReverse) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Грешка при зареждане на файла.');
            }
            return response.text();
        })
        .then(data => {
            processFlashcards(data, shouldReverse);
        })
        .catch(error => console.error('Грешка при зареждане на файла:', error));
}

function processFlashcards(content, shouldReverse) {
    const pairs = content.trim().split('\n\n');

    if (shouldReverse) {
        pairs.reverse(); // Обръщаме реда, ако списъкът се казва flashcards
    }

    flashcards = pairs.map(pair => {
        const [question, answer] = pair.split('\n');
        return { question, answer };
    });

    currentIndex = 0;
    showFlashcard();
}

function showFlashcard() {
    const flashcardDiv = document.getElementById('flashcard');
    const currentFlashcard = flashcards[currentIndex];
    showingAnswer = false;
    flashcardDiv.textContent = currentFlashcard.question;

    flashcardDiv.onclick = function() {
        if (!showingAnswer) {
            flashcardDiv.textContent = currentFlashcard.answer;
            showingAnswer = true;
        } else {
            flashcardDiv.textContent = currentFlashcard.question;
            showingAnswer = false;
        }
    };
}

document.getElementById('prevBtn').addEventListener('click', showPreviousCard);
document.getElementById('nextBtn').addEventListener('click', showNextCard);

function showPreviousCard() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : flashcards.length - 1;
    showFlashcard();
}

function showNextCard() {
    currentIndex = (currentIndex < flashcards.length - 1) ? currentIndex + 1 : 0;
    showFlashcard();
}
