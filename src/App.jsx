import './App.css'
import {WordLetters} from "./components/WordLetters.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {LetterInput} from "./components/LetterInput.jsx";
import {NewWordButton} from "./components/NewWordButton.jsx";

const queryClient = new QueryClient();

function App() {

    return (
        <>
            <h1>Виселица</h1>

            <text className="description">
                Добро пожаловать в игру "Виселица"
                <br/>Правила очень просты: вам выдаётся слово, все его буквы скрыты и у вас
                будет всего 5 жизней, чтобы угадать их все
                <br/>"Счастливой вам игры и пусть удача всегда будет с вами"
            </text>

            <QueryClientProvider client={queryClient}>
                <NewWordButton />
                <WordLetters />
                <LetterInput />
            </QueryClientProvider>
        </>
    )
}

export default App
