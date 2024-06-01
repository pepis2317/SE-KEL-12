import { Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar, { NeedsUser } from "../components/Navbar"
import MapView, { Marker, Region } from "react-native-maps"
import { useEffect, useState } from "react"
import supabase from "./SupabaseCLient"
import { useAppSelector } from "../redux/hook"
import { userLogin } from "../redux/slices/LoginSlice"

import GetLocation from 'react-native-get-location'
import { mapStyle } from "./mapStyle"
import { useNavigation } from "@react-navigation/native"
const SetupStudyLocation = () => {
    const navigation = useNavigation()
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const [isPressable, setPressable] = useState(true)
    const [lat, setLat] = useState<any>(-6.222982)
    const [long, setLong] = useState<any>(106.648965)

    const handleRegionChangeComplete = (region: Region) => {
        setLat(region.latitude)
        setLong(region.longitude)
    };
    const handleButtonPress = async () => {
        console.log(loggedUser?.id)
        await supabase.from('msUsers').update({
            location: `POINT(${long} ${lat})`
        }).eq('id', loggedUser?.id),
            setPressable(false)
    }
    return (
        <SafeAreaView>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backContainer}>
                    <Image source={require("../assets/Arrow_left.png")} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.topText}>Set Study Location</Text>
            </View>
            <View style={{ position: 'relative' }}>
                <View style={styles.marker}>
                    <Image style={{ width: 50, height: 50, position: 'relative', bottom: 17 }} source={require('../assets/Pin_fill.png')} />
                </View>
                {isPressable ?
                    <TouchableOpacity style={styles.saveButton} onPress={handleButtonPress}>
                        <Text style={styles.set}>Set</Text>
                    </TouchableOpacity> : <></>}
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    onRegionChangeComplete={handleRegionChangeComplete}
                    customMapStyle={mapStyle}
                    initialRegion={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}>
                </MapView>
                {!isPressable ?
                    <View style={styles.popup}>
                        <Image source={require('../assets/yay.png')} style={{width:300, objectFit:'contain', marginTop:-70, marginBottom:20}}/>
                        <Text style={styles.updateText}>Location Updated!</Text>
                        <TouchableOpacity style={styles.backToHome} onPress={()=>navigation.navigate('Home')}>
                            <Text style={styles.set}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                    : <></>}

            </View>


        </SafeAreaView>
    )
}
export default SetupStudyLocation

const styles = StyleSheet.create({
    updateText:{
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 16,
    },
    popup: {
        width: 400,
        height: 700,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#20232A',
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 999,
        transform: [
            { translateX: -200 },
            { translateY: -350 }
        ],
        borderRadius: 10,
        elevation:5
    }
    ,
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
        position: 'absolute',
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
    set: {
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        fontSize: 16,
    },
    marker: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 999,
        transform: [
            { translateX: -25 }, // Half of the width
            { translateY: -25 }, // Half of the height
        ],
    },
    saveButton: {
        position: 'absolute',
        zIndex: 999,
        width: 400,
        height: 80,
        borderRadius: 10,
        left: '50%',
        transform: [
            { translateX: -200 }
        ],
        bottom: 80,
        backgroundColor: '#FF5513',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        elevation: 5,
    },
    backToHome: {
        position: 'absolute',
        zIndex: 999,
        width: 350,
        height: 80,
        borderRadius: 10,
        left: '50%',
        transform: [
            { translateX: -175 }
        ],
        bottom: 20,
        backgroundColor: '#FF5513',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        elevation: 5,
    }
})

function dispatch(arg0: any) {
    throw new Error("Function not implemented.")
}
