import { ScrollView, Text, StyleSheet, Image,PixelRatio } from "react-native";

function About() {

    const fontScale = PixelRatio.getFontScale();
    const getFontSize = size => size / fontScale;

    return (
        <ScrollView style={stile.main}>
            <Text style={{...stile.testo,fontSize:getFontSize(15),lineHeight:getFontSize(20)}}>
                In questo primo nucleo di “audiolibri” abbiamo voluto concentrare una serie di contributi assolutamente originali che fanno conoscere  una Grazia Deledda meno nota e ancora da scoprire: la saggista, autrice in alcuni casi di veri e propri reportages giornalistci.
                “San Giovanni bello”, “San Francesco”, “Cagliari”, “Tipi e paesaggi sardi”, “Natale” “Viaggio di Carlo Alberto in Sardegna”, “La donna in Sardegna”, “Leggende sarde”, “Gabina”, “Superstizioni, credenze e medicina popolare”.
                Una lunga serie di articoli, nello stile dell’indagine ma dal tratto doviziosamente letterario, molti dei quali pubblicati nelle principali riviste culturali italiane publicati in gran parte su “Natura ed arte”, “Nuova Antologia, Rivista delle tradizioni popolari in Italia, “La vita italiana” a cavallo tra il XIX e il XX secolo.
            </Text>
            <Image style={stile.img} source={require("./assets/Logo_POR.png")}/>
        </ScrollView>
    )
};

const stile = StyleSheet.create({
    main:{
        width:"100%",
        height:"100%",
        paddingLeft:"5%",
        paddingRight:"5%",
        paddingTop:"5%"
    },
    testo:{
        textAlign:"justify",
        fontWeight:"600",
    },
    img:{
        width:"100%",
        resizeMode:"contain"
    }
})

export default About;