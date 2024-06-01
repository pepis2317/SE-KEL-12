import { useNavigation } from "@react-navigation/native"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useAppSelector } from "../redux/hook"

const ChatContainer = ({ id, sender, username, pfp, message, room }: { id: number, sender: number | undefined, username: string, pfp: string, message: string, room:string }) => {
    const navigation = useNavigation()
    const loggedUser = useAppSelector((state) => state.login.loggedUser)

    return (
        <TouchableOpacity style={styles.chatContainer} onPress={() => navigation.navigate('Chat', { userID: id, username: username, pfp: pfp, room:room })}>
            <View style={styles.chat}>
                <View style={{ elevation: 3, borderRadius: 100, overflow: 'hidden' }}>
                    {pfp == "" ? <Image source={require('../assets/Header/CornerDecor.png')} style={styles.pfp} /> : <Image source={{ uri: pfp }} style={styles.pfp} />}

                </View>
                {message == "" ?
                    <Text style={styles.text}>
                        {username}
                    </Text> :
                    <View>
                        <Text style={styles.text}>
                            {username}
                        </Text>

                        {sender == loggedUser?.id ?
                            <Text style={styles.recent} numberOfLines={1} ellipsizeMode='tail'>
                                You: {message}
                            </Text> :
                            <Text style={styles.recent} numberOfLines={1} ellipsizeMode='tail'>
                                {message}
                            </Text>
                        }
                    </View>
                }


            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    recent: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        paddingLeft: 20
    },
    text: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        paddingLeft: 20,
        marginBottom: 10
    },

    chatContainer: {
        padding: 20,

    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pfp: {
        width: 70,
        height: 70,
        backgroundColor: '#5A5A5A',

    },
})
export default ChatContainer