import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, PermissionsAndroid, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import supabase from "./SupabaseCLient";
import { useAppSelector } from "../redux/hook";
import GetLocation from "react-native-get-location";

export default function SelectFindingMethod() {
    const loggedUser = useAppSelector((state) => state.login.loggedUser)

    const navigation = useNavigation()
    const [userLat, setUserLat] = useState<any>()
    const [userLong, setUserLong] = useState<any>()
    const getCoordinates = async () => {
        const userCoordinatesData = await supabase.from('msUsers').select('location, visible').eq('id', loggedUser?.id)
        if (userCoordinatesData.data?.length != 0) {
            const userCoordinates = userCoordinatesData.data?.at(0)?.location
            console.log(userCoordinates)
            let { data: translatedCoordinates, error: coordinatesError } = await supabase.rpc('get_coordinates', { location: userCoordinates })
            if (coordinatesError) console.error(coordinatesError)
            else {
                navigation.navigate('FindBuddy', { lat: translatedCoordinates.latitude, long: translatedCoordinates.longitude })

            }
        }
    }
    const getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        }).then(location => {
            setUserLat(location.latitude)
            setUserLong(location.longitude)
            navigation.navigate('FindBuddy', { lat: location.latitude, long: location.longitude })

        })
    }
    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'Give me your location mmf',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getCurrentLocation()
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    return (
        <SafeAreaView>
            <View style={styles.top}>
                <Text style={styles.topText}>Find Study Buddy</Text>
            </View>

            <View style={styles.selectcontainer}>
                <View style={styles.decor}>
                    <View style={styles.circle}><Image style={{ width: 200, height: 200, marginLeft: -8 }} source={require('../assets/Logo.png')} /></View>
                </View>
                <Text style={styles.select}>Select Finding Method</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    getCoordinates()
                }}>
                    <Text style={styles.topText} >Based on Study Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    requestPermission()
                }}>
                    <Text style={styles.topText} >Based on Current Location</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    decor: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    circle: {
        backgroundColor: '#3B414A',
        borderRadius: 1000,
        marginTop: 50,
        height: 300,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#FF5513',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        elevation: 5,
    },
    select: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 21,
        textAlign: 'center',
        marginBottom:20,
        marginTop:25
    },
    selectcontainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#20232A',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:-10
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
})