import axios from "axios"
export const fetchUserProfile = async (username: string) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}`)
        
        return response.data
    } catch (error: unknown) {
       console.error('Error fetching user profile:', error)      
    }

}