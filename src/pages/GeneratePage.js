import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Image, ScrollView, StatusBar } from 'react-native';

import loadingGif from '../assest/images/loading.gif'
import CountContext from '../context/CountContext';
import { getApiData } from '../services/ApiService';
import FalPage from './FalPage';


const GeneratePage = () => {
    const navigation = useNavigation();
    const CounterContext = useContext(CountContext);
    const { setCountdown, setCountdownFinished, countdown } = CounterContext;

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [feelings, setFeelings] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [horoscope, setHoroscope] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();

    const startCountdown = async () => {
        setCountdownFinished(false);
        setCountdown(240);
        await AsyncStorage.setItem('countdown', '240');
    };

    console.log(countdown)

    const onSubmit = async () => {

        if (loading) {
            return;
        }
        setLoading(true)
        try {
            const response = await getApiData(age, feelings, hobbies, name, horoscope);
            const data = await response.json();
            setResult(data.result);
            
        } catch (e) {
            console.log(e)
            Alert.alert(
                'Tekrar Dene!',
                'Üzgünüm çok yoğunluktan dolayı veya bir şeylerin yanlış olduğundan falını gösteremedim',
                [
                    {
                        text: 'Tekrar Dene',
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <View style={styles.loadingConatiner}>
                <StatusBar backgroundColor={'black'}/>
                <Text style={styles.title}>senin için bir fal düşünüyorum</Text>
                <Image source={loadingGif} style={styles.loading} resizeMode="contain" />
            </View>
        )
    }
   

    const onTryAgain = async() => {
        try {
            await AsyncStorage.setItem(`fal${Date.now()}`, result).then(() => {
                console.log('Kayıt başarıyla yapıldı.');
              }).catch((error) => {
                console.error('Kayıt yapılırken hata oluştu: ', error);
              });
              startCountdown()
            setResult("");
           navigation.navigate('HomePage')
        } catch (error) {
            
        }
    };
    

    if (result) {
        return (
               <FalPage result={result} onTryAgain={onTryAgain}/>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white',flex:1}}>

            <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false} 
            contentContainerStyle={{  paddingBottom:40,backgroundColor:'white',}}>
                <View style={styles.container}>
                    <Text style={styles.label}>İsmin</Text>
                    <TextInput
                        placeholder="İsmin"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Yaşın</Text>
                    <TextInput
                        placeholder="Yaşın"
                        keyboardType="numeric"
                        style={styles.input}
                        value={age.toString()}
                        onChangeText={(s) => setAge(Number.parseInt(s || "0"))}
                    />

                    <Text style={styles.label}>Hobilerin</Text>
                    <TextInput
                        placeholder="Örneğin: ata binmek, spor yapmak"
                        style={styles.input}
                        value={hobbies}
                        onChangeText={setHobbies}
                    />

                    <Text style={styles.label}>Burcun</Text>
                    <TextInput
                        placeholder="Burcun"
                        style={styles.input}
                        value={horoscope}
                        onChangeText={setHoroscope}
                    />

                    <Text style={styles.label}>Bugün kendini nasıl hissediyorsun?</Text>
                    <TextInput
                        placeholder="Örneğin: mutluyum"
                        style={styles.input}
                        value={feelings}
                        onChangeText={setFeelings}
                    />

                    {/* Sumbit Button */}
                    <Pressable onPress={onSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Haydi Falımı Göster!</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default GeneratePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    input: {
        fontSize: 16,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal:20,
        marginTop: 6,
        marginBottom: 12,
        borderRadius:18,
        color:'black'
       
    },
    label: {
        fontSize: 16,
        color: 'gray',
       
    },
    selectorContainer: {
        flexDirection: 'row'
    },
    selector: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'gainsboro',
        margin: 5,
        padding: 16,
        borderRadius: 5,
        overflow: 'hidden',
        color:'white',
        fontSize:16
    },
    button: {
        backgroundColor: '#7B57FE',
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 6

    },
    buttonText: {
        color: 'white',
        fontWeight: "900"
    },
    loadingConatiner: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 10,
        backgroundColor:'black'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color:'white',
    },
    loading: {
        width: "100%"
    },
   
    
    
});
