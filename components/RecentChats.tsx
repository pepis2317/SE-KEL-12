import { SafeAreaView } from "react-native-safe-area-context"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"


const RecentChats = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.RecentsContainer}>
            <Text style={styles.text}>Recent Chats</Text>
            <ScrollView style={styles.chatsContainer} horizontal={true} contentContainerStyle={{ paddingRight: 25 }} showsHorizontalScrollIndicator={false}>
                <View style={styles.ChatContainer}>
                    <TouchableOpacity style={styles.pfp} onPress={() => navigation.navigate('Test', { userID: "ASS" })}>
                        <Image source={require('../assets/Header/CornerDecor.png')} style={styles.pfpimg} />
                    </TouchableOpacity>
                    <Text style={styles.name}>ASS</Text>
                </View>
                <View style={styles.ChatContainer}>
                    <TouchableOpacity style={styles.pfp} onPress={() => navigation.navigate('Test', { userID: "FUCK" })}>
                        <Image source={require('../assets/Header/CornerDecor.png')} style={styles.pfpimg} />
                    </TouchableOpacity>
                    <Text style={styles.name}>FUCK</Text>
                </View>
                <View style={styles.ChatContainer}>
                    <TouchableOpacity style={styles.pfp} onPress={() => navigation.navigate('Test', { userID: "BITCH" })}>
                        <Image source={require('../assets/Header/CornerDecor.png')} style={styles.pfpimg} />
                    </TouchableOpacity>
                    <Text style={styles.name}>BITCH</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    ChatContainer: {
        width: 97,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    pfp: {
        width: 90,
        height: 90,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#5A5A5A',
        elevation: 5
    },
    pfpimg: {
        width: 90,
        height: 90,
    },
    name: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10
    },
    RecentsContainer: {
        backgroundColor: '#3B414A',
        borderRadius: 10,
        marginBottom: 25,
        elevation: 3
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: 'white',
        marginTop: 20,
        marginLeft: 25
    },
    chatsContainer: {
        marginTop: 25,
        paddingLeft: 10,
        marginBottom: 25
    }
})
export default RecentChats