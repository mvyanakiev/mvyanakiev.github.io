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

// Event listener за избиране на списък с карти
document.getElementById('flashcardList').addEventListener('change', function() {
    const selectedList = this.value;
    if (selectedList) {
        loadFlashcards(flashcardLists[selectedList], selectedList === 'list1'); // Проверяваме дали списъкът е "flashcards"
    }
});

// Зареждане на флаш карти от избрания URL
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

// Обработка на картите (и обръщане на реда, ако е необходимо)
function processFlashcards(content, shouldReverse) {
    const pairs = content.trim().split('\n\n');

    if (shouldReverse) {
        pairs.reverse(); // Обръщане на реда, ако списъкът е "flashcards"
    }

    flashcards = pairs.map(pair => {
        const [question, answer] = pair.split('\n');
        return { question, answer };
    });

    currentIndex = 0; // Започваме от първата карта
    showFlashcard();
}

// Показване на текущата карта
function showFlashcard() {
    const flashcardDiv = document.getElementById('flashcard');
    const currentFlashcard = flashcards[currentIndex];
    showingAnswer = false; // Започваме с въпроса
    flashcardDiv.textContent = currentFlashcard.question;

    // При клик върху картата показваме отговор/въпрос
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

// Event listeners за бутоните "Предишна" и "Следваща"
document.getElementById('prevBtn').addEventListener('click', showPreviousCard);
document.getElementById('nextBtn').addEventListener('click', showNextCard);

// Показване на предишната карта
function showPreviousCard() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : flashcards.length - 1; // Кръгово преминаване
    showFlashcard();
}

// Показване на следващата карта
function showNextCard() {
    currentIndex = (currentIndex < flashcards.length - 1) ? currentIndex + 1 : 0; // Кръгово преминаване
    showFlashcard();
}
