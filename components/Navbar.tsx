import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/core"
import { useState } from "react"


const Navbar = () => {
    const navigation = useNavigation()
    const [selectedButton, setSelectedButton] = useState('Home')

    const navButtonPress = (buttonName:string)=>{
        setSelectedButton(buttonName)
        navigation.navigate(buttonName)
    }

    return (
        <SafeAreaView>
            <View style={styles.navbarContainer}>
                <TouchableOpacity style={styles.navButton} onPress={()=>navButtonPress('Home')}>
                    <Image source={require('../assets/Navbar/Home.png')} />
                    <View style={selectedButton == 'Home'? styles.selected:styles.unselected}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={()=>navButtonPress('FindBuddy')}>
                    <Image source={require('../assets/Navbar/Find.png')} />
                    <View style={selectedButton == 'FindBuddy'? styles.selected:styles.unselected}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={()=>navButtonPress('RequestNotif')}>
                    <Image source={require('../assets/Navbar/Requests.png')} />
                    <View style={selectedButton == 'RequestNotif'? styles.selected:styles.unselected}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={()=>navButtonPress('Chats')}>
                    <Image source={require('../assets/Navbar/Chats.png')} />
                    <View style={selectedButton == 'Chats'? styles.selected:styles.unselected}></View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    unselected:{
        display:'none'
    },
    selected:{
        width:35,
        height:35,
        backgroundColor:'grey',
        position:'absolute',
        borderRadius:10,
        zIndex:-1
    }
    ,
    navbarContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#3B414A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25,
        paddingTop: 15,
        paddingBottom: 15,
        elevation: 10

    },
    navButton: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default Navbar