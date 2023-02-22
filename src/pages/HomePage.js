import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { BannerAd, TestIds, BannerAdSize, RewardedAd, RewardedAdEventType, } from 'react-native-google-mobile-ads';
import { useState, useEffect, useContext } from 'react';

import MainCard from '../components/MainCard'
import Saved from '../components/Saved'
import ComingSoon from '../components/ComingSoon'
import CountContext from '../context/CountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8977291596510359/8808925166';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
});


const HomePage = () => {


    const [loaded, setLoaded] = useState(false);
    const CounterContext = useContext(CountContext);
    const { setCountdown, setCountdownFinished, countdown } = CounterContext;


    const rewardCountDown = async () => {
        setCountdownFinished(false);
        setCountdown(0);
        await AsyncStorage.setItem('countdown', '0');

    };

    useEffect(() => {
        try {

            // Subscribe to the LOADED event
            const unsubscribeLoaded = rewarded.addAdEventListener(
                RewardedAdEventType.LOADED,
                () => {
                    setLoaded(true);
                    console.log("Ad finished loading");
                }
            );

            // Subscribe to the EARNED_REWARD event
            const unsubscribeEarned = rewarded.addAdEventListener(
                RewardedAdEventType.EARNED_REWARD,
                reward => {
                    reward = rewardCountDown();
                }
            );
            // Start loading the rewarded ad
            rewarded.load();

            // Unsubscribe from events on unmount
            return () => {
                unsubscribeLoaded();
                unsubscribeEarned();
            };
        } catch (error) {
            console.log("Error showing ad:", error);
        }
    }, [loaded]);

     const showAd = () => {
         if (loaded) {
             rewarded.show();
         } else {
            console.log('tekrar dene')
         }
     };
 
    return (
        <SafeAreaView style={{ backgroundColor: 'white', }}>
            <StatusBar backgroundColor={'white'} />
            {/*Header*/}
            <View style={styles.header}>
                <Image source={require('../assest/images/applogonotext.png')}
                    style={styles.headerImage}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTitleSmall}>Hayat Falı!</Text>
                    <Text style={styles.headerTitleBig}>PAND</Text>
                </View>
                {rewarded.loaded  ? <TouchableOpacity disabled={countdown === 0} onPress={() =>showAd()} style={styles.watchAdsButton}>
                    <Text style={{ color: '#6F1AB6', fontWeight: '700' }}>Süreyi Sıfırla</Text>
                </TouchableOpacity> : <View style={styles.watchWaitStyle}>
                    <Text style={{ color: 'lightgray', fontWeight: '700' }}>Reklam yükleniyor...</Text>
                </View>}

            </View>
            {/*HeaderDown*/}
            <View style={styles.headerDown}>

            </View>
            {/*Body*/}

            <ScrollView style={{ backgroundColor: '#F9F9F9' }} showsVerticalScrollIndicator={false} contentContainerStyle={{
                paddingBottom: 100,
            }}>
                <MainCard />
                <Saved />

                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <BannerAd size={BannerAdSize.LARGE_BANNER} unitId="ca-app-pub-8977291596510359/3979533641" />
                </View>

                <ComingSoon />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,


    },

    headerDown: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8,
        paddingHorizontal: 12,
    },
    headerImage: {
        height: 28,
        width: 28,
        backgroundColor: 'lightgray',
        padding: 16,
        borderRadius: 30,
        marginRight: 8,
    },
    headerTitleSmall: {
        fontWeight: 'bold',
        color: 'gray',
        fontSize: 12
    },
    headerTitleBig: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20
    },
    watchAdsButton: {
        borderWidth: 2,
        borderColor: '#7B57FE',
        padding: 6,
        borderRadius: 20,
        shadowColor: "#7B57FE",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 10,
    }

})