import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const FalPage = ({ onTryAgain, result }) => {
    return (
        <View style={styles.falScreen}>
            <Text style={styles.title}>
                işte senin falın!
            </Text>
            <ScrollView contentContainerStyle={{padding:20,}}>
            <Text style={styles.result}>{result}</Text>
            <Pressable onPress={onTryAgain} style={styles.button}>
                <Text style={styles.buttonText}>Ana Sayfa</Text>
            </Pressable>
            </ScrollView>
        </View>
    )
}

export default FalPage

const styles = StyleSheet.create({
    falScreen: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    },
    button: {
        backgroundColor: '#7B57FE',
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 6,
        marginTop:30

    },
    buttonText: {
        color: 'white',
        fontWeight: "900"
    },
    title:{
        fontSize:22,
        fontWeight:'bold',
        color:'black'
    },
    result:{
        fontSize:16,
        paddingTop:16,
        color:'#252525',
        
    }
})