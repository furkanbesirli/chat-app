import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment"
import InputEmoji from "react-input-emoji"

const ChatBox = () => {
    const {user} = useContext(AuthContext)
    const {currentChat, messages, isMessagesLoading, sendTextMessage} = useContext(ChatContext)
    const {recipientUser} = useFetchRecipientUser(currentChat, user)
    const [textMessage, setTextMessage] = useState("")
    const scroll = useRef()

    console.log("text", textMessage)

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])


    if(!recipientUser) return(
        <p style={{textAlign: "center", width: "100%"}}>
            No conversation selected yet...
        </p>
    )

    if(isMessagesLoading) return(
        <p style={{textAlign: "center", width: "100%"}}>
            Loading Chat...
        </p>
    )

    return ( <Stack gap={4} className="chat-box">
        <div className="chat-header">
            <strong>{recipientUser?.name}</strong>
        </div>
        <Stack gap={3} className="messsages">
            {messages && messages.map((message, index) => (<Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message self align-self-start flex-grow-0"}`}
            ref = {scroll}>

                <span>{message.text}</span>
                <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                </Stack>
            ))}
        </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmoji value={textMessage} onChange={setTextMessage} fontFamily="nunito" borderColor="rgba(72,112,223,0.2)"/>
            
            <button className="send-btn" onClick={()=>sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-arrow-up-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54L13.026 8.03A4.5 4.5 0 0 0 8 12.5c0 .5 0 1.5-.773.36l-1.59-2.498L.644 7.184l-.002-.001-.41-.261a.5.5 0 0 1 .083-.886l.452-.18.001-.001L15.314.035a.5.5 0 0 1 .54.111M6.637 10.07l7.494-7.494.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154z" />
                    <path fillRule="evenodd" d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354a.5.5 0 0 0-.722.016l-1.149 1.25a.5.5 0 1 0 .737.676l.28-.305V14a.5.5 0 0 0 1 0v-1.793l.396.397a.5.5 0 0 0 .708-.708z" />
                </svg>
            </button>
            </Stack>

    </Stack>
     );
}
 
export default ChatBox;