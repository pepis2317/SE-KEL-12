import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "../redux/hook"
import supabase from "./SupabaseCLient"

const RequestNotif = () => {
    const [requests, setRequests] = useState<any[] | null>()
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const navigation = useNavigation()
    useEffect(() => {
        const getRequests = async () => {
            try {
                const data = await supabase.from('msRequests').select("id, msUsers!msRequests_sender_fkey(id, username, pfp), message").eq("status", "Pending").eq("receiver", loggedUser?.id).order("sentTime")

                setRequests(data.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getRequests()
    })
    return (
        <SafeAreaView style={{ backgroundColor: '#20232A', minHeight: '100%' }}>
            <View style={styles.top}>
                <Text style={styles.topText}>Chat Requests</Text>
            </View>
            {requests?.length == 0 ?
            <View style={styles.noRequestContainer}>
                <Image source={require('../assets/noRequests.png')} style={{width:300, height:300}}/>
                <Text style={styles.noRequestText}>
                    Nobody wants you lil nigga
                </Text>
            </View> : <></>}
            {requests?.map((request) => (
                <TouchableOpacity key={request.id} style={styles.request} onPress={() => { navigation.navigate('Request', { userID: request.msUsers.id, username: request.msUsers.username , pfp: request.msUsers.pfp}) }}>
                    {request.msUsers.pfp == "" ?
                        <Image source={require('../assets/Header/CornerDecor.png')} style={styles.pfp} />
                        :
                        <Image source={{ uri: request.msUsers.pfp }} style={styles.pfp} />
                    }

                    {
                        request.message == "" ?
                            <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>New request from {request.msUsers.username}</Text>
                            :
                            <View>
                                 <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>New request from {request.msUsers.username}</Text>
                                 <Text style={styles.message} numberOfLines={1} ellipsizeMode='tail'>{request.message}</Text>
                            </View>
                    }
                </TouchableOpacity>
            ))}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    noRequestContainer:{
        alignItems:'center',
        justifyContent:'center',
        minHeight:'80%'
    },
    message: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        paddingLeft: 20,
        paddingRight:60
    },
    text: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        paddingLeft: 20,
        marginBottom: 10,
    },
    noRequestText:{
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        margin:30
    },
    request: {
        padding: 20,
        alignItems: 'center',

        flexDirection: 'row'
    },
    pfp: {
        width: 70,
        height: 70,
        backgroundColor: '#5A5A5A',
        borderRadius: 100

    },
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
export default RequestNotif