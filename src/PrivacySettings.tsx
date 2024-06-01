import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar, { NeedsUser } from "../components/Navbar"
import { useEffect, useState } from "react"
import supabase from "./SupabaseCLient"
import { useAppSelector } from "../redux/hook"
import { useNavigation } from "@react-navigation/native"

const PrivacySettings = () => {
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const navigation = useNavigation()
    const [isVisible, setVisible] = useState<any>(true)
    const buttonPress = async (val: boolean) => {
        await supabase.from('msUsers').update({ visible: val }).eq('id', loggedUser?.id)
        setVisible(val)
    }
    useEffect(() => {
        const getPrivacySetting = async () => {
            const data = await supabase.from('msUsers').select('visible').eq('id', loggedUser?.id)
            if (data.data?.length != 0) {
                setVisible(data.data?.at(0)?.visible)
            }
        }
        getPrivacySetting()
    }, [])
    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: '#20232A', alignItems: 'center', justifyContent:'center' }}>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backContainer}>
                    <Image source={require("../assets/Arrow_left.png")} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.topText}>Privacy Setting(s)</Text>
            </View>
            <View style={styles.circle}>
                <Image source={require('../assets/dd.png')} />
            </View>
            <Text style={styles.imcooked}>Still needs more time, have this instead</Text>

            {isVisible ?
                <TouchableOpacity style={styles.invbutton} onPress={() => buttonPress(false)}>
                    <Text style={styles.topText}>Set Invisible</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.vbutton} onPress={() => buttonPress(true)}>
                    <Text style={styles.topText}>Set Visible</Text>
                </TouchableOpacity>
            }


        </SafeAreaView>
    )
}
export default PrivacySettings

const styles = StyleSheet.create({
    imcooked:{
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 21,
        textAlign: 'center'
    },
    backContainer: {
        position: 'absolute',
        left: 20
    },
    backButton: {
        width: 32,
        height: 32,
        marginRight: 10,
    },
    top: {
        width: '100%',
        position:'absolute',
        top:0,
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
    circle: {
        backgroundColor: '#3B414A',
        borderRadius: 1000,
        height: 300,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    invbutton: {
        backgroundColor: '#3B414A',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        elevation: 5,
    },
    vbutton: {
        backgroundColor: '#FF5513',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        elevation: 5,
    }
})