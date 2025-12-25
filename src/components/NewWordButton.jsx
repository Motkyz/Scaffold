import {useCreateWordLetters} from "../data/hooks/useWordLetters.js";

export const NewWordButton = () => {
    const {mutate: onCreateClick} = useCreateWordLetters();

    return (
        <>
            <button onClick={() => onCreateClick()}>Получить новое слово</button>
        </>
    )
}