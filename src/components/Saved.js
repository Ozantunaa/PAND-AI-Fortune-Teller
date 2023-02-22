import { Image, StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Saved = () => {

    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('SavedPage')}
            style={styles.touchable}>
            <Image resizeMode='contain' source={require('../assest/images/saved.jpeg')}
                style={{width:352, height: 100, borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
            />
            <View style={{ paddingHorizontal: 12, paddingBottom: 16 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, paddingTop: 8, color: 'black' }}>Kaydedilenler</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Saved

const styles = StyleSheet.create({
    touchable: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        marginHorizontal: 20,
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