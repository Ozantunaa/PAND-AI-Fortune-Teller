import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const ComingSoon = () => {
    
    return (
        <TouchableOpacity
        
            style={styles.touchable}>
            <Image resizeMode='contain' source={require('../assest/images/comingsoon.jpeg')}
                style={{width:352, height: 100,borderTopLeftRadius:20, borderBottomRightRadius:20 }}
            />
            <View style={{ paddingHorizontal: 12, paddingBottom: 16 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, paddingTop: 8, color: 'lightgray' }}>Hikaye Oluşturucu (Yakında!)</Text>
                <Text style={{color:'lightgray'}}>Daha detaylı bilgilerle kendinize özel yer isim ve mekan seçebileceğiniz Hikaye Oluşturucu sizlerden gelen yorumların ve desteğin gelmesi koşuluyla yakında sizlerle!</Text>


            </View>
        </TouchableOpacity>
    )
}

export default ComingSoon

const styles = StyleSheet.create({
    touchable:{
        backgroundColor: 'white',
        borderRadius:20,
        marginTop: 30,
        marginHorizontal:20,
        shadowColor: "#7B57FE",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
        overflow:'hidden'
    }
})