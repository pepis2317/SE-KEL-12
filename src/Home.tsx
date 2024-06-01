import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../components/Header"
import RecentChats from "../components/RecentChats"
import Services from "../components/Services"
import Promotional from "../components/Promotional"
import { useCallback, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector } from "../redux/hook"
import { useDispatch } from "react-redux"
import { userLogout } from "../redux/slices/LoginSlice"
import supabase from "./SupabaseCLient"
import React from "react"

const Home = () => {
    const loggedUser = useAppSelector((state)=>state.login.loggedUser)
    const [name, setName]= useState('')
    const [refreshing, setRefreshing] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const logoutButton = ()=>{
        dispatch(userLogout())
        navigation.navigate('LoginPage')
    }
    const getname = async ()=>{
        const data = await supabase.from('msUsers').select('username').eq('id',loggedUser?.id )
        if(data.data?.length!=0){
            setName(data.data?.at(0)?.username)
        }
    }
    useEffect(()=>{
        
        getname()
    },[])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getname()
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
    return (
        <SafeAreaView>
            <ScrollView style={styles.background} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } >
                <View style={styles.top}>
                    <View style={styles.Logout}>
                        <TouchableOpacity style={styles.LogoutButton} onPress={logoutButton}>
                            <Text style={{color:'black', textAlign:'center'}}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.topText}>Home</Text>

                    <TouchableOpacity style={styles.topButton}>
                        <Image source={require('../assets/Info.png')} />
                    </TouchableOpacity>
                </View>
                <Header username={loggedUser== null? "Username":name}/>
                <RecentChats/>
                <Services />
                <Promotional />
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    LogoutButton:{
        position:'absolute',
        backgroundColor:'white',
        padding:8,
        borderRadius:10,
        width:64
    },
    Logout: {
        width: 32,
        height: 32,
        justifyContent:'center'
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