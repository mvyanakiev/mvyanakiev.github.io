let flashcards = [];
let currentIndex = 0;
let showingAnswer = false;

// Зареждане на флаш карти от GitHub (замени този URL с истинския линк към суровия файл в твоя репозитори)
const flashcardsURL = 'https://raw.githubusercontent.com/mvyanakiev/mvyanakiev.github.io/refs/heads/master/flash/flashcards.txt';

window.onload = function() {
    fetch(flashcardsURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Грешка при зареждане на файла.');
            }
            return response.text();
        })
        .then(data => {
            processFlashcards(data);
        })
        .catch(error => console.error('Грешка при зареждане на файла:', error));
};

document.getElementById('prevBtn').addEventListener('click', showPreviousCard);
document.getElementById('nextBtn').addEventListener('click', showNextCard);

function processFlashcards(content) {
    const pairs = content.trim().split('\n\n'); // Разделяме по празен ред
    flashcards = pairs.map(pair => {
        const [question, answer] = pair.split('\n');
        return { question, answer };
    });

    currentIndex = 0; // Започваме от първата карта
    showFlashcard();
    updateButtons();
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

function showPreviousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        showFlashcard();
        updateButtons();
    }
}

function showNextCard() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        showFlashcard();
        updateButtons();
    }
}

function updateButtons() {
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === flashcards.length - 1;
}
