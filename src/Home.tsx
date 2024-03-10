import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../components/Header"
import RecentChats from "../components/RecentChats"
import Services from "../components/Services"
import Promotional from "../components/Promotional"

const Home = () => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.background}>
                <View style={styles.top}>
                    <View style={styles.Nothing}>

                    </View>
                    <Text style={styles.topText}>Home</Text>

                    <TouchableOpacity style={styles.topButton}>
                        <Image source={require('../assets/Info.png')} />
                    </TouchableOpacity>
                </View>
                <Header username="Username" />
                <RecentChats />
                <Services />
                <Promotional />
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Nothing: {
        width: 32,
        height: 32,

    },
    background: {
        backgroundColor: '#20232A'
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25,
        paddingTop: 20,
        paddingBottom: 20
    },
    topButton: {
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,

    },
    topText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        textAlign: 'center'
    }
})
export default Home