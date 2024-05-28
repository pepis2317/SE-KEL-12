import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "../redux/hook"
import supabase from "./SupabaseCLient"
import ChatContainer from "../components/ChatContainer"


const Chats = () => {
    const [chats, setChats] = useState<any[] | null>()
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    useEffect(() => {
        const getChats = async () => {
            try {
                const chats = await supabase.from("availableForChatting").select("id, availableForChatting_receiver_fkey(id, username, pfp), availableForChatting_sender_fkey(id, username, pfp), latestChat").or(`sender.eq.${loggedUser?.id}, receiver.eq.${loggedUser?.id}`).order("time", { ascending: false })
                if (chats.data?.length != 0) {
                    setChats(chats.data)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getChats()
    },[])

    return (
        <SafeAreaView style={{ backgroundColor: '#20232A', minHeight: '100%' }}>
            <View style={styles.top}>
                <Text style={styles.topText}>Chats</Text>
            </View>
            {chats?.map((chat) => (
                <View key={chat.id}>
                    {chat.availableForChatting_sender_fkey.id == loggedUser?.id ?
                        <ChatContainer id={chat.availableForChatting_receiver_fkey.id} sender={loggedUser?.id} username={chat.availableForChatting_receiver_fkey.username} pfp={chat.availableForChatting_receiver_fkey.pfp} message={chat.latestChat} /> :
                        <ChatContainer id={chat.availableForChatting_sender_fkey.id} sender={chat.availableForChatting_sender_fkey.id} username={chat.availableForChatting_sender_fkey.username} pfp={chat.availableForChatting_sender_fkey.pfp} message={chat.latestChat} />
                    }
                </View>
            ))}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FF5513'
    },
    topText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        textAlign: 'center'
    }
})
export default Chats