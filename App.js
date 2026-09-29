
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import FilmesScreen from "./src/screens/FilmesScreen";
import DetalhesScreen from "./src/screens/DetalhesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#100B1F",
                    },

                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },

                    contentStyle: {
                        backgroundColor: "#100B1F",
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: "Mundo dos filmes",
                    }}
                />

                <Stack.Screen
                    name="Filmes"
                    component={FilmesScreen}
                    options={{title: "Filmes",}}
                />

                <Stack.Screen
                    name="Detalhes"
                    component={DetalhesScreen}
                    options={{title: "Detalhes do filme"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}