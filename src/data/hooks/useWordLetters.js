import {
    useMutation,
    useQuery, useQueryClient
} from '@tanstack/react-query'
import {
    checkWordLetterInLocalStorage, createWordLettersInLocalStorage,
    getWordLettersFromLocalStorage
} from "../services/LocalStorage.js";

export const useWordLetters = () => {

    return useQuery({
        queryKey: ['word_letters'],
        queryFn: () => {
            return getWordLettersFromLocalStorage()
        },
        gcTime: 0,
        staleTime: 60000
    })
}

export const useCheckWordLetter = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (letter) => {
            return checkWordLetterInLocalStorage(letter);
        },
        onSuccess: () => {
            client.invalidateQueries(['word_letters'])
        }
    })
}

export const useCreateWordLetters = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: () => createWordLettersInLocalStorage(),
        onSuccess: () => {
            client.invalidateQueries(['word_letters'])
        }
    })
}