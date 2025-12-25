import { WordLetter } from "../entities/WordLetter.js";

const WORD_LETTERS_LOCAL_STORAGE_KEY = 'WORD_LETTERS_LOCAL_STORAGE_KEY';
const LIVES_REMAINS_LOCAL_STORAGE_KEY = 'LIVES_REMAINS_LOCAL_STORAGE_KEY';

const words = [
    "ТЕХНОЛОГИЯ",
    "КОШКА",
    "СТАНЦИЯ",
    "ТЕЛЕФОН",
    "КРУЖКА",
    "НОУТБУК",
    "ЛАМПА",
    "СИНТЕЗАТОР",
    "КАРТА",
    "ПОДСТАВКА"
]

export const createWordLettersInLocalStorage = () => {
    return new Promise((resolve, reject) => {
        const wordLetters = [];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        for (let i = 0; i < randomWord.length; i++) {
            wordLetters.push(new WordLetter(i, randomWord.charAt(i), false));
        }


        setWordLettersToLocalStorage(wordLetters);
        setLivesRemainsToLocalStorage(5);
        resolve();
    });
}

export const getWordLettersFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
        const defaultWordLetters = [];
        const rawData = localStorage.getItem(WORD_LETTERS_LOCAL_STORAGE_KEY);

        if (!rawData) {
            resolve(defaultWordLetters);
            return;
        }

        const data = JSON.parse(rawData);

        if (!Array.isArray(data)) {
            resolve(defaultWordLetters);
            return;
        }

        resolve(data);
    });
}

const setWordLettersToLocalStorage = (data) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(data)) {
            throw new Error('setWordLettersToLocalStorage(): data must be an array!');
        }

        localStorage.setItem(WORD_LETTERS_LOCAL_STORAGE_KEY, JSON.stringify(data));
        resolve();
    })
}

export const checkWordLetterInLocalStorage = (letter) => {
    return getLivesRemainsFromLocalStorage().then((count) => {
        if (count > 0) {
            return getWordLettersFromLocalStorage().then((wordLetters) => {
                let isRight = false;
                const newWordLetters = wordLetters.map(wordLetter => {
                    if (wordLetter.letter === letter) {
                        isRight = true;
                        return new WordLetter(wordLetter.id, wordLetter.letter, true);
                    }
                    return wordLetter;
                })

                if (!isRight) {
                    takeOneLifeFromLocalStorage();
                }
                setWordLettersToLocalStorage(newWordLetters);
            });
        }
    });
}

export const setLivesRemainsToLocalStorage = (count) => {
    return new Promise((resolve, reject) => {
        localStorage.setItem(LIVES_REMAINS_LOCAL_STORAGE_KEY, JSON.stringify(count));
        resolve();
    })
}

export const getLivesRemainsFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
        const defaultLivesRemains = 0;
        const rawData = localStorage.getItem(LIVES_REMAINS_LOCAL_STORAGE_KEY);

        if (!rawData) {
            resolve(defaultLivesRemains);
            return;
        }

        const data = JSON.parse(rawData);

        resolve(data);
    })
}

const takeOneLifeFromLocalStorage = () => {
    return getLivesRemainsFromLocalStorage().then((count) => {
        let newCount = count;
        if (newCount > 0) {
            newCount--;
        }

        setLivesRemainsToLocalStorage(newCount)
    });
}