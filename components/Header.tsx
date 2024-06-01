import { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native"

const Header = ({username}:{username:string}) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    useEffect(() => {
        let secTimer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }))
        }, 1000)
        return () => clearInterval(secTimer);
    }, [])
    return (
        <SafeAreaView style={styles.header}>
            <View style={styles.textWrapper}>
                <Image source={require("../assets/Header/DotGrid.png")} style={styles.dots} />
                <Text style={styles.welcome}>Welcome,</Text>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.help}>How can we help you today?</Text>
            </View>
            <Image source={require("../assets/Header/CornerDecor.png")} style={styles.cornerDecor} />
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{time}</Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    cornerDecor: {
        position: 'absolute',
        right: 10,
        top: 0,
        width: '25%',
        height: '100%'
    },
    dots: {
        position: 'absolute',
        top: -5,
        left: -10,
        width: 100,
        height: 100
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:25,
        backgroundColor: '#FF5513',
        alignItems: 'center',
        overflow: 'hidden'

    },
    textWrapper: {
        padding: 25
    },
    welcome: {
        fontFamily: 'Montserrat-ExtraBold',
        color: 'white',
        marginTop: -13,
        marginBottom: -5,
        fontSize: 40,

    },
    username: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        fontSize: 32,
    },
    help: {
        fontFamily: 'Montserrat-Regular',
        color: 'white',
        marginTop: 15,
        fontSize: 16
    },
    timeContainer: {
        padding: 10,
        backgroundColor: '#3B414A',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '90deg' }, { translateX: 15 }],
        transformOrigin: 'top right',
        position: 'absolute',
        top: '100%',
        right: 0,
    },
    time: {
        letterSpacing: 8,
        fontSize: 16,
        color: 'white',

    }
})
export default Header