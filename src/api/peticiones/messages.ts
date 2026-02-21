import apiMessage from "../axiosMessages"

export async function fetchMessagesById(){
    const {data} = await apiMessage.get(`/messages/user`)
    return data
}