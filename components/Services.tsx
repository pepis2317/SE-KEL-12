import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/core"

const Services = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.services}>Services</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('SetupStudyLocation')}>
                        <Image source={require('../assets/Services/SetupLocation.png')} style={styles.setupImage} />
                        <Text style={styles.buttonText}>Setup Study Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('AccountSettings')}>
                        <Image source={require('../assets/Services/AccountSettings.png')} style={styles.accountImage} />
                        <Text style={styles.buttonText}>Account Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.serviceButton} onPress={() => navigation.navigate('PrivacySettings')}>
                        <Image source={require('../assets/Services/PrivacySettings.png')} style={styles.privacyImage} />
                        <Text style={styles.buttonText}>Privacy Settings</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    line: {
        height: 5,
        margin: 25,
        marginTop: 10,
        backgroundColor: '#FF5513'
    },
    services: {
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        fontSize: 20,
        marginLeft: 25
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
        width: '100%',
    },
    serviceButton: {
        width: '31%',
        backgroundColor: '#3B414A',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        elevation: 3
    },
    setupImage: {
        width: 90,
        height: 90,
        position: 'relative',
        right: 3
    },
    accountImage: {
        width: 90,
        height: 90,
        position: 'relative',
        left: 2
    },
    privacyImage: {
        width: 80,
        height: 80
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        marginTop: 15
    }
})
export default Services