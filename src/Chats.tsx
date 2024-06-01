import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "../redux/hook"
import supabase from "./SupabaseCLient"
import ChatContainer from "../components/ChatContainer"


const Chats = () => {
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const [chats, setChats] = useState<any[] | null>()
    const getChats = async () => {
        try {
            const chats = await supabase.from("availableForChatting").select("id, availableForChatting_receiver_fkey(id, username, pfp), availableForChatting_sender_fkey(id, username, pfp), latestChat, room")
                .or(`sender.eq.${loggedUser?.id}, receiver.eq.${loggedUser?.id}`).order("time", { ascending: false })
            if (chats.data?.length != 0) {
                setChats(chats.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getChats()
    }, [])
    const handleInserts = (payload: any) => {
        getChats()
    };

    useEffect(() => {
        const channel = supabase
            .channel(`${loggedUser?.id}-chats`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'availableForChatting',
            }, handleInserts)
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, []);
    return (
        <SafeAreaView style={{ backgroundColor: '#20232A', minHeight: '100%' }}>
            <View style={styles.top}>
                <Text style={styles.topText}>Chats</Text>
            </View>
            <ScrollView style={{ marginBottom: 120 }}>
                {chats?.map((chat) => (
                    <View key={chat.id}>
                        {chat.availableForChatting_sender_fkey.id == loggedUser?.id ?
                            <ChatContainer id={chat.availableForChatting_receiver_fkey.id} sender={loggedUser?.id} username={chat.availableForChatting_receiver_fkey.username} pfp={chat.availableForChatting_receiver_fkey.pfp} message={chat.latestChat} room={chat.room} /> :
                            <ChatContainer id={chat.availableForChatting_sender_fkey.id} sender={chat.availableForChatting_sender_fkey.id} username={chat.availableForChatting_sender_fkey.username} pfp={chat.availableForChatting_sender_fkey.pfp} message={chat.latestChat} room={chat.room} />
                        }
                    </View>
                ))}
            </ScrollView>

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