import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import CountContext from '../context/CountContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainCard = () => {

    const navigation = useNavigation()

    const CounterContext = useContext(CountContext)
    const { countdown, countdownFinished, setCountdown, setCountdownFinished } = CounterContext;

    useEffect(() => {
        AsyncStorage.getItem('countdown').then((countdownValue) => {
            if (countdownValue) {
                setCountdown(Number(countdownValue));
            }
        });
    }, []);
    console.log(countdown)

    useEffect(() => {
        AsyncStorage.setItem('countdown', countdown.toString());
    }, [countdown]);

    useEffect(() => {
        if (countdownFinished) {
            setCountdownFinished(false);
        }

        let interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        if (countdown === 0) {
            setCountdownFinished(true);
            clearInterval(interval)
        }

        return () => clearInterval(interval);
    }, [countdown]);

    return (

        <TouchableOpacity
            disabled={!countdownFinished}
            onPress={() => {
                navigation.navigate('GeneratePage')
            }}
            style={styles.touchable}>
            <Image source={require('../assest/images/applogonotext.png')}
                style={{ height: 150, width: 150, borderRadius: 30, margin: 20 }}
            />
            <View style={{ paddingHorizontal: 12, paddingBottom: 16 }}>
                <Text style={styles.title}>Hayat Falını Oluştur</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                    <Text style={{ fontSize: 12, color: "#6B7280" }}>
                        <Text style={{ color: "#22C55E" }}>Popüler</Text> . Yapay Zeka
                    </Text>
                </View>
                {!countdownFinished && (
                    <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}>
                        Yeni Fal Oluşturmak İçin Kalan Süre: {countdown}
                    </Text>
                )}

            </View>
        </TouchableOpacity>
    )
}

export default MainCard

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 8,
        color: 'black'
    },
    touchable: {
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#7B57FE",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
    }
})