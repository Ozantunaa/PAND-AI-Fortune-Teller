import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useEffect, useState } from "react"
import FalPage from "../pages/FalPage"
import GeneratePage from "../pages/GeneratePage"
import HomePage from "../pages/HomePage"
import OnboardingScreen from "../pages/OnboardingScreen"
import SavedPage from "../pages/SavedPage"
import { TestAppAds } from "../pages/TestAppAds"

const Stack = createStackNavigator()

const Router = () => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

    useEffect(() => {
        const getItem = async () => {
            const appData = await AsyncStorage.getItem('isAppFirstLaunched');
            if (appData == null) {
                setIsAppFirstLaunched(true);
                AsyncStorage.setItem('isAppFirstLaunched', 'false');
            } else {
                setIsAppFirstLaunched(false); //burayı unutma false yap
            }

            // AsyncStorage.removeItem('isAppFirstLaunched');
        }
        getItem()
    }, []);

    return (
        isAppFirstLaunched != null && (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isAppFirstLaunched && (
                        <Stack.Screen
                            name="OnboardingScreen"
                            component={OnboardingScreen}
                        />
                    )}
                    <Stack.Screen name="HomePage" component={HomePage} />
                    <Stack.Screen name="GeneratePage" component={GeneratePage} />
                    <Stack.Screen name='FalPage' component={FalPage} options={{
                        presentation: 'modal',
                    }} />
                  <Stack.Screen name="SavedPage" component={SavedPage} />

                </Stack.Navigator>
            </NavigationContainer>
        )

    )
}

export default Router
