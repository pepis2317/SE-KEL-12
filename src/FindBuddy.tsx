import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar, { NeedsUser } from "../components/Navbar"
import Map from '../components/Map'
import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hook"
import supabase from "./SupabaseCLient"

function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the Earth in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}
const FindBuddy = () => {
    const [userLat, setUserLat] = useState<any>()
    const [userLong, setUserLong] = useState<any>()
    const [foundUsers, setFoundUsers] = useState<any>([])
    const loggedUser = useAppSelector((state) => state.login.loggedUser)
    useEffect(() => {
        setUserLat(loggedUser?.latitude)
        setUserLong(loggedUser?.longitude)
        const getChats = async () => {
            try {
                const users = await supabase.from("msUsers").select("id, username, latitude, longitude").neq('id', loggedUser?.id)
                if (users.data?.length != 0) {
                    const closeUsers = users.data?.filter(u => haversineDistance(userLat, userLong, u.latitude, u.longitude) <= 0.5);
                    setFoundUsers(closeUsers)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getChats()
    }, [])
    return (
        <SafeAreaView>
            <Text>Find Study Buddy page :3</Text>
            <View>
                <Text>User latitude:{userLat}</Text>
                <Text>User longitude{userLong}</Text>
            </View>
            {foundUsers.map((u: any) => (
                <View>
                    <Text>{u.username}, dist: {haversineDistance(userLat, userLong, u.latitude, u.longitude)}</Text>
                </View>
            ))}
        </SafeAreaView>
    )
}
export default FindBuddy
