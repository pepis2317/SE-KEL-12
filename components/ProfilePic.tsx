import { Image, TouchableOpacity } from "react-native"

const ProfilePic = ({ pfp, size}: { pfp: string, size: number}) => {
    if(pfp ==""){
        return(
            <Image source={require('../assets/Header/CornerDecor.png')} style={
                {
                    width: size,
                    height: size,
                    backgroundColor: '#5A5A5A',
                    borderRadius: 100,
                }} />
        )
    }
    return (
        <Image source={{ uri: pfp }} style={
            {
                width: size,
                height: size,
                backgroundColor: '#5A5A5A',
                borderRadius: 100,
            }
        } />
    )
}
export default ProfilePic