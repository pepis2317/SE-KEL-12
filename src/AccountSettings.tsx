import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar, { NeedsUser } from "../components/Navbar"
import { RootStackScreenProps } from "../navigation/Types"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "../redux/hook"
import { useEffect, useState } from "react"
import supabase from "./SupabaseCLient"
import ProfilePic from "../components/ProfilePic"

const AccountSettings = () => {
    const navigation = useNavigation()
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    const [user, setUser] = useState<any | undefined>()
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [about, setAbout] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [warning, setWarning] = useState<string>('')

    useEffect(() => {
        const getUser = async () => {
            if (!loggedUser?.id) return;
            const { data, error } = await supabase.from('msUsers').select("*").eq('id', loggedUser.id);

            if (error) {
                console.error('Error fetching user data:', error);
                return;
            }

            if (data?.length) {
                const userdata = data[0];
                setUser(userdata);
                setUsername(userdata.username);
                setEmail(userdata.email);
                setPassword(userdata.pass);
                setAbout(userdata.about);
                setSubject(userdata.studysubject);
            }
        };
        getUser();
    }, [loggedUser?.id]);
    const handleUpdate = async () => {
        if (email != loggedUser?.email) {
            const data = await supabase.from('msUsers').select('email').eq('email', email)
            if (data.data?.length != 0) {
                setWarning('Email already used')
            }
            else {
                await supabase.from('msUsers').update({
                    username: username,
                    email: email,
                    pass: password,
                    about: about,
                    studysubject: subject,
                }).eq('id', loggedUser?.id)
                console.log('yay')
                setWarning('Data updated successfully')
            }
        }
        else {
            await supabase.from('msUsers').update({
                username: username,
                email: email,
                pass: password,
                about: about,
                studysubject: subject,
            }).eq('id', loggedUser?.id)
            setWarning('Data updated successfully')
            console.log(username, email, password, about, subject)

        }


    }
    if (user) {
        return (
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: '#20232A' }}>
                <ScrollView style={{ marginBottom: 60 }}>

                    <View style={styles.top}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backContainer}>
                            <Image source={require("../assets/Arrow_left.png")} style={styles.backButton} />
                        </TouchableOpacity>
                        <Text style={styles.topText}>Account Settings</Text>
                    </View>
                    <View style={styles.topedit}>
                        <Text style={styles.sorry}>Pfp editing coming 31st February 2025</Text>

                        <ProfilePic pfp={user?.pfp} size={100} />
                        <TextInput style={styles.topinput} onChangeText={(text) => setUsername(text)} placeholder={user.username} placeholderTextColor='#3B414A' />
                        <TextInput style={styles.topinput} onChangeText={(text) => setEmail(text)} placeholder={user.email} placeholderTextColor='#3B414A' />
                        <TextInput style={styles.topinput} onChangeText={(text) => setPassword(text)} placeholder={user.pass} placeholderTextColor='#3B414A' />
                        <View style={styles.line} />
                    </View>
                    <View style={{ padding: 20, paddingTop: 0, position: 'relative' }}>
                        <Text style={styles.infotext}>Profile info</Text>
                        <View style={styles.info}>
                            <Text style={styles.infotext}>About:</Text>
                            <TextInput style={styles.bottominput} onChangeText={(text) => setAbout(text)} placeholder={user.about} placeholderTextColor='#3B414A' />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infotext}>Study Subject</Text>
                            <TextInput style={styles.bottominput} onChangeText={(text) => setSubject(text)} placeholder={user.studysubject} placeholderTextColor='#3B414A' />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.pressable} onPress={() => handleUpdate()}>
                        <Text style={styles.topText}>Save info</Text>
                    </TouchableOpacity>
                    <Text style={styles.topText}>{warning}</Text>
                </ScrollView>

            </SafeAreaView>
        )
    }

}
export default AccountSettings
const styles = StyleSheet.create({
    nptext: {
        color: 'grey',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        textAlign: 'center'
    },
    sorry:{
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        marginBottom:30,
        marginLeft:20,
        marginRight:20,
        textAlign:'center'
    },
    pressable: {
        backgroundColor: '#FF5513',
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        elevation: 5,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    infotext: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
    },
    info: {
        marginTop: 20
    },
    topedit: {
        alignItems: 'center',
        marginTop: 30
    },
    bottominput: {
        borderRadius: 15,
        padding: 10,
        borderWidth: 2,
        fontSize: 16,
        borderColor: '#3B414A',
        marginTop: 15,
        color: 'white'
    },
    topinput: {
        borderRadius: 15,
        padding: 10,
        borderWidth: 2,
        textAlign: 'center',
        fontSize: 16,
        borderColor: '#3B414A',
        marginTop: 15,
        width: 200,
        color: 'white'
        // backgroundColor:'#3B414A'
    },
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
        top: 0,
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
    line: {
        backgroundColor: '#FF5513',
        height: 2,
        width: 410,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20

    }
})