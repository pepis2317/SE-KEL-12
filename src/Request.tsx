import { createClient } from "@supabase/supabase-js"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackParamList, RootStackScreenProps } from "../navigation/Types"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "../redux/hook"
import supabase from "./SupabaseCLient"
import ProfilePic from "../components/ProfilePic"

export const Request = ({ route }: RootStackScreenProps<'Request'>) => {
    const navigation = useNavigation()
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const [message, setMessage] = useState<any | null>()

    const respond = async (message: string) => {
        try {
            await supabase.from("msRequests").update({ status: message }).eq("receiver", loggedUser?.id).eq("sender", route.params.userID)
            if (message === "Accepted") {
                const ass = await supabase.from("availableForChatting").insert({
                    sender: route.params.userID,
                    receiver: loggedUser?.id
                })
                console.log(ass)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const buttonPress = async (message: string) => {
        await respond(message)
        navigation.navigate('RequestNotif')
    }
    useEffect(() => {
        const getMessage = async () => {
            try {
                const data = await supabase.from("msRequests").select("message").eq("sender", route.params.userID).eq("receiver", loggedUser?.id)
                if (data.data?.length != 0) {
                    setMessage(data.data?.at(0)?.message)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getMessage()
    }, [])
    return (
        <SafeAreaView style={{ minHeight: "100%", backgroundColor: '#20232A' }}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/Arrow_left.png")} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.topText}>Request from {route.params.username}</Text>
            </View>
            <View style={styles.messageContainer}>
                <ProfilePic pfp={route.params.pfp} size={70}/>
                <Text style={styles.message}>{message}</Text>
            </View>

            <TouchableOpacity onPress={() => { buttonPress("Accepted") }} style={styles.acceptButton}>
                <Text style={styles.text}>
                    Accept
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { buttonPress("Declined") }} style={styles.declineButton}>
                <Text  style={styles.text}>
                    Decline
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    declineButton:{
        padding:20,
        backgroundColor:'#5A5A5A',
        margin:20,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:0
    },
    acceptButton:{
        padding:20,
        backgroundColor:'#FF5513',
        margin:20,
        marginBottom:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    message:{
        padding: 20,
        backgroundColor: '#5A5A5A',
        borderRadius: 30,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 50,
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'white',
        
    },
    messageContainer:{
        padding:20,
        flexDirection:'row'
    },
    pfp: {
        width: 70,
        height: 70,
        backgroundColor: '#5A5A5A',
        borderRadius:100

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
    text:{
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
    },
    backButton: {
        width: 32,
        height: 32
    },
})