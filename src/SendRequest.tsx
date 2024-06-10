import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackScreenProps } from "../navigation/Types";
import { useEffect, useState } from "react";
import supabase from "./SupabaseCLient";
import { useAppSelector } from "../redux/hook";
import { useNavigation } from "@react-navigation/native";
import ProfilePic from "../components/ProfilePic";
import { SafeAreaView } from "react-native-safe-area-context";
export type sendRequestParams = {
    userID: number,


}
export default function SendRequest({ route }: RootStackScreenProps<'SendRequest'>) {
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const navigation = useNavigation()
    const [pressable, setPressable] = useState(false)
    const [message, setMessage] = useState("")
    const [user, setUser] = useState<any>()

    const sendRequest = async () => {
        if (message != "") {
            const time = new Date()
            const newRequest = {
                sender: loggedUser?.id,
                receiver: route.params.userID,
                status: 'Pending',
                message: message,
                sentTime: time,
            }
            await supabase.from('msRequests').insert(newRequest)
            setMessage("")
            navigation.goBack()
        }
    }
    useEffect(() => {
        const getUser = async () => {
            const data = await supabase.from('msUsers').select('*').eq('id', route.params.userID)
            if (data.data?.length != 0) {
                setUser(data.data?.at(0))
            }
        }
        const checkPressable = async () => {
            const chats = await supabase.from("msRequests").select("id").filter('sender', 'in', `(${route.params.userID}, ${loggedUser?.id})`).filter('receiver', 'in', `(${route.params.userID}, ${loggedUser?.id})`)
            if (chats.data?.length == 0) {
                setPressable(true)
            }
        }
        checkPressable()
        getUser()
    }, [loggedUser])
    return (
        <SafeAreaView style={{ backgroundColor: '#20232A', width:'100%',height:'100%' }}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
                    <Image source={require("../assets/Arrow_left.png")} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.topText}>Send Request</Text>
            </View>
            {user ?
                <View style={{ padding: 20 }}>
                    <View style={styles.profile}>
                        <ProfilePic pfp={user.pfp} size={70} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.name}>{user.username}</Text>
                            <Text style={styles.studying}>Currently Studying:</Text>
                            <Text style={styles.studying}>{user.studysubject}</Text>
                        </View>
                    </View>
                    <Text style={styles.name}>About:</Text>
                    <Text style={styles.about}>{user.about}</Text>

                    <TextInput style={styles.textInput} onChangeText={(text) => setMessage(text)} placeholder="Hey! let's meet up bbg" />
                    {pressable ?
                        <TouchableOpacity style={styles.button} onPress={sendRequest}>
                            <Text style={styles.topText}>Send</Text>
                        </TouchableOpacity>
                        :
                       <></>
                    }
                </View>
                : <></>}


        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    name: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        marginBottom:10
    },
    about:{
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        marginBottom:20
    },
    studying: {
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        marginBottom:5
    },
    button: {
        backgroundColor: '#FF5513',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        elevation: 5,
    },
    textInput: {
        marginTop:10,
        backgroundColor: 'white',
        borderRadius: 50,
        width: "100%",
        height: 60,
        padding: 15,
        elevation: 5
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    top: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FF5513',
        backgroundColor: '#20232A',
        zIndex: 999
    },
    topText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        textAlign: 'center'
    },
    backButton: {
        width: 32,
        height: 32,
        marginRight: 10,
    },
    backContainer: {
        position: 'absolute',
        left: 20
    },
})