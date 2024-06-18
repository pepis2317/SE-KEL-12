import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hook"
import supabase from "./SupabaseCLient"
import { useNavigation } from "@react-navigation/native"
import MapView, { Marker } from "react-native-maps"
import { mapStyle } from "./mapStyle"
import { RootStackScreenProps } from "../navigation/Types"
import ProfilePic from "../components/ProfilePic"
export type findParams = {
  lat: number,
  long: number,
  isCurrentLocation: boolean
}
const FindBuddy = ({ route }: RootStackScreenProps<'FindBuddy'>) => {
  const loggedUser = useAppSelector((state) => state.login.loggedUser)
  const navigation = useNavigation()
  const [userLat, setUserLat] = useState<any>(route.params.lat)
  const [userLong, setUserLong] = useState<any>(route.params.long)
  const [foundUsers, setFoundUsers] = useState<any>([])
  const [isPressed, setPressed] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>()
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const getVisibility = async () => {
      const data = await supabase.from('msUsers').select('visible').eq('id', loggedUser?.id)
      if (data.data?.length != 0) {
        setVisible(data.data?.at(0)?.visible)
      }
    }
    const getCoordinates = async () => {
      let { data: nearbyUsers, error: nearbyError } = await supabase.rpc('find_nearby_users', { lat: userLat, long: userLong, max_dist: 500 })
      if (nearbyError) console.error(nearbyError)
      else {
        setFoundUsers(nearbyUsers)
        getVisibility()
      }
    }
    getCoordinates()
  }, [])
  if (!userLat && !userLong) {
    return (

      <SafeAreaView style={styles.notsetwrapper}>
        <View style={styles.top}>
          <Text style={styles.topText}>Find Study Buddy</Text>
        </View>
        <View style={styles.notsetcontainer}>
          <Text style={styles.notText}>You have not set your study location vro</Text>
          <TouchableOpacity style={styles.notButton} onPress={() => navigation.navigate('SetupStudyLocation')}>
            <Text style={styles.buttonText}>Set Study Location</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView>
      <View style={styles.top}>
        <Text style={styles.topText}>Find Study Buddy</Text>
      </View>
      {(userLat && userLong) ?
        <MapView style={{ width: '100%', height: '100%' }} customMapStyle={mapstyle} initialRegion={{ latitude: userLat, longitude: userLong, latitudeDelta: 0.005, longitudeDelta: 0.005 }}>
          <Marker coordinate={{ latitude: userLat, longitude: userLong }}>
            <Image source={require('../assets/sillyfella.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
          </Marker>
          {foundUsers ? foundUsers.map((u: any) => (
            <Marker image={require('../assets/Pin_fill.png')} key={u.id} coordinate={{ longitude: u.long, latitude: u.lat }} title={u.username}
              onPress={() => {
                setSelectedUser(u)
                setPressed(true)
              }} tappable={false} />)) : <></>}
        </MapView> : <></>
      }
      {isPressed ?
        <View style={styles.popup}>
          <TouchableOpacity onPress={() => {
            setSelectedUser(null)
            setPressed(false)
          }}><Text style={styles.close}>x</Text></TouchableOpacity>
          <View style={styles.profile}>
            <ProfilePic pfp={selectedUser.pfp} size={60} />
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.name}>{selectedUser.username}</Text>
              <Text style={styles.studying}>Currently Studying:</Text>
              <Text style={styles.studying}>{selectedUser?.studysubject}</Text>
            </View>
          </View>
          {isVisible && !route.params.isCurrentLocation ?
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SendRequest', { userID: selectedUser.id })}>
              <Text style={styles.buttonText}>Request {selectedUser?.username}</Text>
            </TouchableOpacity> : <Text style={styles.vwarning}>Sending requests is currently disabled.</Text>}

        </View>
        : <></>}

    </SafeAreaView>
  )
}
export default FindBuddy
const styles = StyleSheet.create({
  vwarning:{
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    marginTop:40
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center'
  },
  notButton: {
    backgroundColor: '#FF5513',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    marginBottom: 10,
    elevation: 5,
  },
  notsetcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  notsetwrapper: {
    backgroundColor: '#20232A',
    height: '100%',
    width: '100%',
  },
  top: {
    width: '100%',
    position: 'absolute',
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
  close: {
    position: 'absolute',
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 24,
    marginTop: -10,
    right: 0
  },
  popup: {
    position: 'absolute',
    backgroundColor: '#20232A',
    height: 250,
    width: 400,
    zIndex: 9999,
    left: '50%',
    bottom: 30,
    transform: [
      { translateX: -200 }
    ],
    borderRadius: 15,
    padding: 20,
    elevation: 5
  },
  name: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    marginBottom: 10
  },
  studying: {
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  button: {

    backgroundColor: '#FF5513',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
    top: 25,
    elevation: 5,

  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 16,

  }
})

const mapstyle = mapStyle