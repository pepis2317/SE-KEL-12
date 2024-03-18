import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { useAppSelector } from "../redux/hook"
import { userLogin } from "../redux/slices/LoginSlice"
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
const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [warning, setWarning] = useState(false)
    const navigation = useNavigation()
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const dispatch = useDispatch()


    const getUser = async () => {
        try {
            const res = await axios.get(`http://10.0.2.2:5082/api/User/${encodeURIComponent(email)}, ${encodeURIComponent(password)}`)
            if (res.data != null) dispatch(userLogin(res.data))
            else setWarning(true)
        } catch (error) {
            setWarning(true)
        }
    }
    useEffect(() => {
        if (loggedUser != null) navigation.navigate('Home')
    }, [loggedUser])
    return (
        <SafeAreaView style={styles.LoginPageContainer}>
            <ScrollView>
                <View style={styles.decor}>
                    <Text style={styles.title}>Welcome to Study Buddy Finder</Text>
                    <Text style={styles.subtitle}>сука блять иди нахуй</Text>
                    <View style ={styles.circle}><Image style={{width:200,height:200, marginLeft:-8}}source={require('../assets/Logo.png')}/></View>
                </View>
                {warning == true ?
                    <View style={styles.warning}>
                        <Text style={{
                            fontFamily: 'Montserrat-Regular',
                            color: '#FF5513',
                            fontSize: 16,
                        }}>User not found</Text>
                    </View> : <></>}
                <TextInput style={styles.textInput} onChangeText={(text) => setEmail(text)} value={email} placeholder="Enter email" keyboardType="email-address" />
                <TextInput style={styles.textInput} onChangeText={(text) => setPassword(text)} value={password} placeholder="Enter password" secureTextEntry={true} />

                <TouchableOpacity style={styles.loginButton} onPress={getUser}>
                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'white',
                        fontSize: 16,

                    }}>login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => { navigation.navigate('RegisterPage') }}>
                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'black',
                        fontSize: 16,

                    }}>Register</Text>
                </TouchableOpacity>
                <View style={styles.line}></View>
            </ScrollView>


        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    circle:{
        backgroundColor:'#3B414A',
        borderRadius:1000,
        marginTop:50,
        height:350,
        width:350,
        alignItems:'center',
        justifyContent:'center'
    },
    line: {
        height: 5,
        margin: 25,
        marginTop: 20,
        marginBottom: 170,
        backgroundColor: '#FF5513'
    },
    warning: {
        justifyContent: 'center',
        marginTop: 10,
        margin: 20,
        marginBottom: 10,
    },
    decor: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
        margin: 20
    },
    subtitle: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 21,
        marginTop: 0,
        textAlign: 'center'
    },
    title: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        marginTop: 20,
        textAlign: 'center',
    },
    LoginPageContainer: {
        backgroundColor: '#20232A',
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
    loginButton: {
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
    registerButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        marginTop: 10,
        marginBottom: 10,
        elevation: 5
    }
})
export default LoginPage
