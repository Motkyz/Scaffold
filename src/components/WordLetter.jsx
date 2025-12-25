export const WordLetter = ({item}) => {
    return (
        <div className={`word-letter ${item.isRight ? 'word-letter_right' : 'word-letter_hidden'}`}>
            {item.title}
        </div>
    )
}