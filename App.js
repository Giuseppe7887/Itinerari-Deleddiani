import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { StyleSheet } from 'react-native';
import CustomDrawer from "./drawerItem.js";
import * as splashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
// componenti
import Home from "./main.js"
import About from "./about.js";
import InfoEContatti from './infoEContatti.js';
// tieni lo splash screen
splashScreen.preventAutoHideAsync();


const Drawer = createDrawerNavigator()
export default function App() {

  const [fontsLoaded] = useFonts({
    "Satisfy-Regular": require("./assets/Satisfy-Regular.ttf")
  })


  if (fontsLoaded)
    setTimeout(async () => {
      splashScreen.hideAsync()
    }, 1000);

  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            drawerPosition: "right",
            drawerStyle: stile.drawerStyle,
            headerStyle: {
              backgroundColor: "rgba(175, 163, 115, 0.23)"
            }
          }}
        >
          <Drawer.Screen
            name="Audiolibri"
            component={Home}
          />
          <Drawer.Screen
            name="About"
            component={About}
          />
          <Drawer.Screen
            name="Info e contatti"
            component={InfoEContatti}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor="rgba(210, 213, 165, 0.23)" />
    </>
  );
}

const stile = StyleSheet.create({
  drawerStyle: {
    width: "70%"
  }
});
