import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet, Image } from 'react-native';

function CustomDrawer(props) {
    return (
        <View>
            <View style={stile.header}>
                <Image style={stile.immagine} source={require("./assets/drawerHeader.png")} />
            </View>
            <View style={stile.body}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
        </View>
    )
};

const stile = StyleSheet.create({
    header: {
        height: "35%",
        backgroundColor: "rgba(175, 163, 115, 0.23)"
    },
    body: {
        height: "65%"
    },
    immagine: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    titolo: {
        color: "white",
        fontSize: 30,
    }
})

export default CustomDrawer;