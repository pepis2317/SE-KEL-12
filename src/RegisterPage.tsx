import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useEffect, useState } from "react"
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"
import { userLogin } from "../redux/slices/LoginSlice"
import { useAppSelector } from "../redux/hook"
export type user = {
    id: string,
    username: string,
    pass: string,
    email: string,
    rating: number,
    studysubject: string,
    about: string,
    latitude: number,
    longitude: number
}
const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [warning, setWarning] = useState(false)
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const registerUser = async () => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        try {
            if (username != "" && password != "" && validRegex.test(email)) {
                const res = await axios.post(`http://10.0.2.2:5082/api/User/${username.trim()}, ${email.trim()}, ${password.trim()}`)
                if (res.data != null) dispatch(userLogin(res.data))
                else setWarning(true)
            }
            else {
                setWarning(true)
            }
        } catch (error) {
            console.error(error)
            setWarning(true)
        }
    }
    useEffect(() => {
        if (loggedUser != null) navigation.navigate('Home')
    }, [loggedUser])
    return (
        <SafeAreaView style={{ backgroundColor: '#20232A' }}>
            <View style={{ marginTop: 10, paddingBottom: 600 }}>
                <View style={styles.top}>
                    <View style={styles.topButton}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('LoginPage')}}>
                            <Image style={{width:32,height:32}}source={require('../assets/Arrow_left.png')}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.topText}>Register</Text>

                    <TouchableOpacity style={styles.topButton}>
                        
                    </TouchableOpacity>
                </View>
                {warning == true ?
                    <View style={styles.warning}>
                        <Text style={{
                            fontFamily: 'Montserrat-Regular',
                            color: '#FF5513',
                            fontSize: 16,
                        }}>Input invalid</Text>
                    </View> : <></>}
                <TextInput style={styles.textInput} onChangeText={(text) => setUsername(text)} value={username} placeholder="Enter username" />
                <TextInput style={styles.textInput} onChangeText={(text) => setEmail(text)} value={email} placeholder="Enter email" keyboardType="email-address" />
                <TextInput style={styles.textInput} onChangeText={(text) => setPassword(text)} value={password} placeholder="Enter password" secureTextEntry={true} />
                <TouchableOpacity style={styles.registerButton} onPress={registerUser}><Text style={{
                    fontFamily: 'Montserrat-Bold',
                    color: 'white',
                    fontSize: 16,
                }}>Register</Text></TouchableOpacity>
                <View style={styles.line}></View>

            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Logout: {
        width: 32,
        height: 32,
        justifyContent:'center'
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
    },
    warning: {
        justifyContent: 'center',
        marginTop: 10,
        margin: 20,
        marginBottom: 10,
    },
    line: {
        height: 5,
        margin: 25,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#FF5513'
    },
    textInput: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 20,
        marginTop: 10,
        marginBottom: 10
    },
    registerButton: {
        backgroundColor: '#FF5513',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        marginTop: 10,
        marginBottom: 10,
        elevation: 5,

    },
})
export default RegisterPage