import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


const SavedPage = () => {
    const [values, setValues] = useState([]);
    const getData = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const filteredKeys = keys.filter((key) => key.includes('fal'));
          const items = await AsyncStorage.multiGet(filteredKeys);
          console.log("filteredkeys",filteredKeys);
          const values = items.map((item, index) => ({ key: item[0], value: item[1] }));
          setValues(values);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        getData();
    }, []);

    const deleteValue = async (item) => {
        try {
            const key = item.key;
            await AsyncStorage.removeItem(key);
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>

            <ScrollView style={{ backgroundColor: 'white', }} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.hedaerText}>Kayıtlı falların</Text>
                </View>
                {
                    values.length === 0 ?
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Kayıtlı fal yok.</Text>
                        </View>
                        : values.map( (item, index) => {
                            return (
                                <View key={index} style={styles.container}>
                                    <TouchableOpacity onPress={() => deleteValue(item)} style={styles.circle}>
                                        <Image style={styles.circleIcon} source={require('../assest/images/delete.png')} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={styles.title}>{item.value}</Text>
                                    </View>
                                </View>)
                        })
                }
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, }}>
                <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId="ca-app-pub-8977291596510359/3979533641" />
            </View>

        </>
    )
}

export default SavedPage
const styles = StyleSheet.create({
    header: {
        paddingLeft: 20,
        paddingTop: 22
    },
    hedaerText: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold'
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: "#7B57FE",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 5
    },

    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',

    },
    circle: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 0,
    },
    circleIcon: {
        width: 30,
        height: 30,
        borderRadius: 20
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: 'lightgray',
        fontWeight: 'bold'
    }

})