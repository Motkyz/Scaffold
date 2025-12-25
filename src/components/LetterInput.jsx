import {useEffect, useRef, useState} from "react";
import {useCheckWordLetter} from "../data/hooks/useWordLetters.js";
import {LivesRemainsCounter} from "./LivesRemainsCounter.jsx";
import {useLivesRemains} from "../data/hooks/useLivesRemains.js";

export const LetterInput = () => {
    const [letter, setLetter] = useState('');
    const inputRef = useRef();

    const {mutate: onCheck} = useCheckWordLetter();
    const {data: items} = useLivesRemains();

    const onInputValueChanged = (event) => {
        if (items > 0) {
            let value = event.target.value;

            setLetter(value.charAt(value.length - 1).toUpperCase());
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }}, []);

    const onInputKeyDown = (event) => {
        if (event.key !== 'Enter' || items <= 0) {
            return;
        }

        if (letter === '') {
            alert("Сначала введите букву");
            return;
        }

        onCheck(letter);
        setLetter('');
    }

    return (
        <>
            <LivesRemainsCounter />
            <div>
                <input className = {`word-letter_input ${items > 0 ? 'input-unlocked' : 'input-locked'}`}
                    ref={inputRef}
                    onChange={onInputValueChanged}
                    onKeyDown={onInputKeyDown}
                    value={letter}
                />
            </div>
        </>
    )
}