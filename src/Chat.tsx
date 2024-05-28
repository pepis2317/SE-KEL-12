import { Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackScreenProps } from "../navigation/Types"
import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hook"
import supabase from "./SupabaseCLient"
import { useNavigation } from "@react-navigation/native"
import ProfilePic from "../components/ProfilePic"

export type ChatParams = {
    userID: number,
    username: string,
    pfp: string
}

const Test = ({ route }: RootStackScreenProps<'Chat'>) => {
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const [messages, setMessages] = useState<any[] | null>()
    const [message, setMessage] = useState("")
    const navigation = useNavigation()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    const sendMessage = async () => {
        if (message != "") {
            const newMessage = {
                sender: loggedUser?.id,
                receiver: route.params.userID,
                message: message
            }
            const time = new Date()
            await supabase.from('msChats').insert(newMessage)
            await supabase.from('availableForChatting').update({
                sender: loggedUser?.id,
                receiver: route.params.userID,
                latestChat: message, time: time
            }).or(`sender.eq.${loggedUser?.id}, receiver.eq.${loggedUser?.id}`).or(`sender.eq.${route.params.userID}, receiver.eq.${route.params.userID}`)
            setMessage("")
        }
    }
    useEffect(() => {
        const getMessages = async () => {
            try {
                const data = await supabase.from("msChats").select("*").filter('sender', 'in', `(${route.params.userID}, ${loggedUser?.id})`).filter('receiver', 'in', `(${route.params.userID}, ${loggedUser?.id})`)
                if (data.data?.length != 0) {
                    setMessages(data.data)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getMessages()
    },[])
    return (
        <SafeAreaView style={{ minHeight: "100%", backgroundColor: '#20232A' }}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/Arrow_left.png")} style={styles.backButton} />
                </TouchableOpacity>
                <ProfilePic pfp={route.params.pfp} size={50} />
                <Text style={styles.topText}>{route.params.username}</Text>
            </View>
            <ScrollView ref={ref => { this.ScrollView = ref }} onContentSizeChange={() => this.ScrollView.scrollToEnd({ animated: false })} style={isKeyboardVisible ? styles.shrunkChatDisplay : styles.chatDisplay}>
                {messages?.map((message) => {
                    if (message.sender == loggedUser?.id) {
                        return (
                            <Text key={message.id} style={styles.sentMessage} >{message.message}</Text>
                        )
                    }
                    return (
                        <Text key={message.id} style={styles.receivedMessage} >{message.message}</Text>
                    )
                })}

            </ScrollView>
            <View style={styles.chatBox}>
                <TextInput style={styles.textInput} onChangeText={(text) => setMessage(text)} value={message} placeholder="Enter message" />
                <TouchableOpacity style={styles.sendButton} onPress={() => { sendMessage() }}>
                    <Image source={require('../assets/Send_fill.png')} style={styles.sendIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    shrunkChatDisplay: {
        paddingTop: 10,
        maxHeight: '73.4%',
    },
    pfpSmall: {
        width: 43,
        height: 43,
        backgroundColor: '#5A5A5A',
        borderRadius: 100,
        marginLeft: 10,
        marginBottom: 10
    },
    receivedContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    sendIcon: {
        width: 40,
        height: 40
    },
    pfp: {
        width: 50,
        height: 50,
        backgroundColor: '#5A5A5A',
        borderRadius: 100,
        marginLeft: 20
    },
    backButton: {
        width: 32,
        height: 32,
        marginRight: 10
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
        paddingTop: 20,
        paddingBottom: 15,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FF5513'
    },
    topText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 20
    },
    chatDisplay: {
        paddingTop: 10,
        maxHeight: '82.5%',
    },
    sendButton: {
        backgroundColor: '#FF5513',
        height: 60,
        width: 60,
        borderRadius: 100,
        marginLeft: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'

    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: "83%",
        height: 60,
        padding: 15,

    },
    chatBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 10,
    },
    sentMessage: {
        alignItems: 'flex-end',
        padding: 20,
        backgroundColor: '#FF5513',
        borderRadius: 25,
        marginLeft: 40,
        marginBottom: 10,
        marginRight: 10,
        alignSelf: 'flex-end',
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
    },
    receivedMessage: {
        padding: 20,
        backgroundColor: '#5A5A5A',
        borderRadius: 25,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 80,
        alignSelf: 'flex-start',
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
    }
})
export default Test