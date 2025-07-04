import axios from "axios"
export const fetchUserProfile = async (username: string) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}`)

        return response.data
    } catch (error: unknown) {
        console.error('Error fetching user profile:', error)
    }

}

export const fetchChessGM = async (setChessGM: React.Dispatch<React.SetStateAction<string[]>>) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/titled/GM`)
        setChessGM(response.data.players)
    } catch (error: unknown) {
        console.error('Error fetching chess GM:', error)
    }
}