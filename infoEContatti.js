import { Text, ScrollView, Image, StyleSheet, View, PixelRatio } from 'react-native'
import { useFonts } from 'expo-font';
import { A } from '@expo/html-elements';
import { MaterialCommunityIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';

function InfoEContatti() {
    let [fontsLoaded] = useFonts({
        "Satisfy-Regular": require("./assets/Satisfy-Regular.ttf")
    });

    const fontRatio = PixelRatio.getFontScale();
    const getFontSize = size => size / fontRatio;

    return (
        <ScrollView style={stile.wrapper}>
            <View style={stile.header}>
                <Text style={{ fontFamily: fontsLoaded ? "Satisfy-Regular" : null, fontSize: getFontSize(17), marginBottom: 10 }}>
                    Più ci avviciniamo a Nuoro, più sentiamo nell’aria qualcosa di fiero: il granito, il lentischio dalle possenti radici, la quercia il cui tronco si spacca ma resiste al fulmine, soffiano nell’aria e infondono nell’anima uno spirito di forza e di bellezza superba
                </Text>
                <View style={stile.signContainer}>
                    <Image source={require("./assets/firma.png")} style={{ width: 200, height: 100, resizeMode: "contain" }} />
                </View>
            </View>
            <View style={stile.linkContainer}>
                <Text style={{ textAlign: "center",  fontSize: getFontSize(17), fontWeight: 700, marginBottom: 10,height:100 }}>
                    Cooperativa per i servizi bibliotecari
                    <View>
                        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}><View><Ionicons name="ios-infinite-outline" size={24} color="black" /></View></View>
                        <Text style={{ fontSize: getFontSize(17), fontWeight: 700 }}>
                            Società Cooperativa
                        </Text>
                    </View>
                </Text>
                <View style={{ width: "100%", alignItems: "flex-start", backgroundColor: "rgba(175, 163, 115, 0.15)" }}>
                    <Text style={stile.testo}><FontAwesome name="phone" size={24} color="black" /> <A style={{ ...stile.link, fontSize: getFontSize(15) }} href='tel:078436313'> 078436313</A></Text>
                    <Text style={stile.testo}><MaterialCommunityIcons name='web' color="black" size={24} />  <A style={{ ...stile.link, fontSize: getFontSize(15) }} href='https://www.itinerarideleddiani.it/'>www.itinerarideleddiani.it</A></Text>
                    <Text style={{ ...stile.testo, fontSize: getFontSize(15) }}><MaterialCommunityIcons name="office-building-marker-outline" size={24} color="black" />  Via Silone 2 08100 Nuoro</Text>
                    <Text style={stile.testo}><Feather name="mail" size={24} color="black" style={{ textDecorationLine: "none" }} />  <A style={{ ...stile.link, fontSize: getFontSize(15) }} href='mailto:csbiblio@csbiblio.it'>csbiblio@csbiblio.it</A></Text>
                </View>
                <View style={stile.credits}>
                    <Text style={{fontSize:getFontSize(15)}} >Copyright © 2022 Itinerari deleddiani</Text>
                    <Text style={{fontSize:getFontSize(15),fontWeight:"700"}}>App v1.1.6</Text>
                </View>
            </View>
        </ScrollView>
    )
}


const stile = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: "100%",
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10
    },
    header: {
        width: "100%",
        height: "30%"
    },
    linkContainer: {
        paddingTop: 100,
        width: "100%",
        height: "70%",
        backgroundColor: "transparent",
        alignItems: "center"
    },
    link: {
        textDecorationLine: "underline",
        color: "black",
        fontWeight: 500,
        margin: 10
    },
    signContainer: {
        width: "100%",
        alignItems: "flex-end"
    },
    testo: {
        fontSize: 15,
        margin: 10
    },
    credits: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default InfoEContatti;