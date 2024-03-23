const calculateBtn = document.querySelector('.calculate-btn');
calculateBtn.addEventListener("click", calculateBtnClick);

function calculateBtnClick() {
    const text = document.querySelector('#text-counter')
    ?.value
    // romoving all symbols from text
    ?.replace(/[`0-9|~@#$%^&*()_|+\-=;'",<>\{\}\[\]\\\/]/gi, '')
    ?.trim();

console.log({text});
    if (!text) {
        showError();
        return;
    }

    const { sentences, words, letters } = getTextInfo(text);

    setUpdateTextQuantities(sentences, words, letters);
}

function showError() {
    const textError = document.querySelector('.text-error');
    textError.classList.add("show-error");

    setTimeout(() => {
        textError.classList.remove("show-error");
    }, 5000);
}

function getTextInfo(text) {
    // symbols for separating sentences are '.' , '?', '!'
    const sentenceRegExp = new RegExp('[.|?|!|:]\\s+');
    const sentences = text.split(sentenceRegExp);
    const { words, letters } = getWordsQuantities(sentences);

    return {
        words,
        letters,
        sentences: sentences.length,
    };
}

function getWordsQuantities(sentences) {
    // symbols for separating words are ' ' , ',', '\n'
    const wordRegExp = new RegExp(',\\s+|\\s+|\\n');

    return sentences.reduce((acc, val) => {
        const words = val.split(wordRegExp);
        const letters = getLettersQuantities(words);

        return {
            words: acc.words + words.length,
            letters: acc.letters + letters,
        };
    },
    {
        words: 0,
        letters: 0
    });
}

function getLettersQuantities(words) {
    return words.reduce((acc, val) => acc + val.length, 0);
}

function setUpdateTextQuantities(sentences, words, letters) {
    const sentencesCount = document.querySelector('.sentences-count');
    const wordsCount = document.querySelector('.words-count');
    const lettersCount = document.querySelector('.letters-count');

    sentencesCount.innerHTML = sentences || '0';
    wordsCount.innerHTML = words || '0';
    lettersCount.innerHTML = letters || '0';
}

// random background functionality
const randomBgBtn = document.querySelector('.random-bg-btn');
randomBgBtn.addEventListener("click", setRandomBackground);

function setRandomBackground() {
    const mainContainer = document.querySelector('.main-container');
    mainContainer.style.backgroundImage = `url('https://source.unsplash.com/random/1200x800?sig=${randomInt()}')`;
}

function randomInt(min = 1, max = 15) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}