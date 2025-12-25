import {useWordLetters} from "../data/hooks/useWordLetters.js";
import {Spinner} from "./Spinner";
import {WordLetter} from "./WordLetter.jsx";

export const WordLetters = () => {
    const {data: items, isLoading} = useWordLetters();

    if (isLoading || !items) {
        return <Spinner />
    }

    return (
        <>
            <div className="word-letters">
                {items.map(item => {
                    return <WordLetter key={item.id} item={item} />
                })}
            </div>
        </>
    );
}