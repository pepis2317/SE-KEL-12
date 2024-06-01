import { SafeAreaView } from "react-native-safe-area-context"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import supabase from "../src/SupabaseCLient"
import { useAppSelector } from "../redux/hook"
import ProfilePic from "./ProfilePic"


const RecentChats = () => {
    const navigation = useNavigation()
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const [RecentChats, setRecents] = useState<any[]>([])
    const getRecents = async () => {
        try {
            const data = await supabase.from("availableForChatting").select("availableForChatting_receiver_fkey(id, username, pfp), availableForChatting_sender_fkey(id, username, pfp), id, room").or(`sender.eq.${loggedUser?.id}, receiver.eq.${loggedUser?.id}`).order("time", { ascending: false })
            const chats: any = []

            data.data?.map((chat) => {
                if (chat.availableForChatting_sender_fkey.id == loggedUser?.id) {
                    const user = {
                        id: chat.availableForChatting_receiver_fkey.id,
                        username: chat.availableForChatting_receiver_fkey.username,
                        pfp: chat.availableForChatting_receiver_fkey.pfp,
                        room: chat.room
                    }
                    chats.push(user)
                } else {
                    const user = {
                        id: chat.availableForChatting_sender_fkey.id,
                        username: chat.availableForChatting_sender_fkey.username,
                        pfp: chat.availableForChatting_sender_fkey.pfp,
                        room: chat.room
                    }
                    chats.push(user)
                }
            })
            setRecents(chats.flat())
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getRecents()
    }, [])
    const handleInserts = (payload: any) => {
        getRecents()
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
        <SafeAreaView style={styles.RecentsContainer}>
            <Text style={styles.text}>Recent Chats</Text>
            {RecentChats.length != 0 ?
                <ScrollView style={styles.chatsContainer} horizontal={true} contentContainerStyle={{ paddingRight: 25 }} showsHorizontalScrollIndicator={false} >
                    {RecentChats?.map((x) => (
                        <View key={x.id} style={styles.ChatContainer}>
                            <TouchableOpacity style={styles.pfp} onPress={() => navigation.navigate('Chat', { userID: x.id, username: x.username, pfp: x.pfp, room: x.room })}>
                                <ProfilePic pfp={x.pfp} size={90} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{x.username}</Text>
                        </View>
                    ))}
                </ScrollView> :
                <View style={styles.noChatsContainer}>
                    <Text style={styles.noChats}>Nobody wants you lil bro</Text>
                </View>
            }

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    noChatsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    noChats: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: 'white',

    },
    ChatContainer: {
        width: 97,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    pfp: {
        width: 90,
        height: 90,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#5A5A5A',
        elevation: 5
    },
    pfpimg: {
        width: 90,
        height: 90,
    },
    name: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10
    },
    RecentsContainer: {
        backgroundColor: '#3B414A',
        borderRadius: 10,
        marginBottom: 25,
        elevation: 3
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: 'white',
        marginTop: 20,
        marginLeft: 25
    },
    chatsContainer: {
        marginTop: 25,
        paddingLeft: 10,
        marginBottom: 25
    }
})
export default RecentChats