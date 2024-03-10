import { Image, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Promotional = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image source={require("../assets/Promo.png")} />
                <View style={styles.promoText}>
                    <Text style={styles.promoLine}>My Kids Are Starving</Text>
                    <Text style={styles.promoPoints}>- Ad free experience</Text>
                    <Text style={styles.promoPoints}>- Reach more people</Text>
                    <Text style={styles.promoPoints}>- Get verified</Text>
                    <Text style={styles.promoPoints}>- SBF Plus Matchmaking</Text>
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingBottom:350
    },
    promoText:{
        width:'50%',
        marginTop:10,
        marginLeft:15
    },
    promoLine:{
        fontFamily:'Montserrat-ExtraBold',
        fontSize:24,
        color:'white'
    },
    promoPoints:{
        fontFamily:'Montserrat-Regular',
        fontSize:16,
        color:'white'
    }
})
export default Promotional