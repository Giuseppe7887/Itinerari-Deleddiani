import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Modal, PixelRatio } from 'react-native';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import ImageViewer from 'react-native-image-zoom-viewer';

function toTime(x) {
    let secondi = x % 60;
    let minuti = x - secondi;
    minuti = minuti / 60 >= 10 ? minuti / 60 : "0" + minuti / 60;
    secondi = secondi >= 10 ? secondi : "0" + secondi;
    return minuti + ":" + secondi;
}

function Box({ dati, onAudioPress, isPlaying, indexAudioLibro, cursor, forSlideComplete, soundObject, showHer }) {  // forstartSlide
    let [modalShow, setModalShow] = useState(false);
    const fontScale = PixelRatio.getFontScale();
    const getFontSize = size => size / fontScale;

    // load font
    let [fontLoaded] = useFonts({
        "Satisfy-Regular": require("./assets/Satisfy-Regular.ttf")
    });

    // tempo audio
    let [tempo, setTempo] = useState(dati.durata);
    // slider position
    let [currentPosition, setCurrentPosition] = useState(0);


    function renderCurrentTime() {
        let t = cursor.position / 1000;
        return toTime(t.toFixed());
    };

    // calcola il tempo corrente
    function calcolaTempo() {
        if (cursor.position != null && cursor.max != null) {
            return cursor.position / cursor.max;
        } else {
            return 0;
        }
    }

    // aprire modal
    function showDoc() {
        setModalShow(true);
    };

    // chiudere modal
    function closeDoc() {
        setModalShow(false);
    };

    function turnOff() {
        alert("Benvenuto, questa è una funzione inutile, l'app si chiuderà in 5 secondi");
        setTimeout(() => {
            BackHandler.exitApp();
        }, 5000)
    };

    return (
        <>
            <View style={{ ...stile.box, backgroundColor: isPlaying.index == indexAudioLibro ? "rgba(131, 238, 255, 0.34)" : "white", elevation: isPlaying.index == indexAudioLibro ? 0 : 5 }}  >
                <View style={{ width: "100%" }}>
                    <View style={stile.containerTitolo}>
                        <Text style={{ fontSize: getFontSize(30), textAlign: "center", fontFamily: fontLoaded ? "Satisfy-Regular" : null }}>{dati.nome}</Text>
                    </View>
                    <View style={stile.containerAudio}>
                        <View style={stile.controller} >
                            <Slider
                                minimumValue={0}
                                maximumValue={1}
                                value={isPlaying.index == indexAudioLibro ? calcolaTempo() : 0}
                                // onValueChange={(value) => {
                                //     if (!isPlaying || soundObject == null) return
                                //     setCurrentPosition(convertTime(value * dati.durata));
                                // }}
                                disabled={isPlaying.index == indexAudioLibro ? !isPlaying || soundObject == null : true}
                                // onSlidingStart={async () => await forStartSlide()}
                                onSlidingComplete={
                                    async (value) => { await forSlideComplete(value) }
                                }
                            />
                            <View style={stile.timeView}>
                                <Text style={{ marginLeft: 5 }}>{!isPlaying && currentPosition ? currentPosition : isPlaying.index == indexAudioLibro ? renderCurrentTime() : "00:00"}</Text>
                                <Text style={{ marginRight: 5 }}>{toTime(tempo)}</Text>
                            </View>
                        </View>
                        <View style={stile.buttonView}>
                            <TouchableOpacity onPress={() => onAudioPress()} style={stile.button}>
                                <AntDesign name={isPlaying.state && isPlaying.index == indexAudioLibro ? "pause" : "caretright"} size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onLongPress={() => dati.nome === "Natale" ? showHer() : dati.nome === "La donna in Sardegna" ? turnOff() : null}
                                delayLongPress={10000}
                                onPress={() => showDoc()} style={stile.button}>
                                <Feather name="book-open" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
            <Modal
                animationType="fade"
                visible={modalShow}
                transparent={true}
            >
                <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.7)" }}>
                    <View style={{ width: "100%", height: "10%", flexDirection: "row", alignItems: "center" }}>
                        <AntDesign name="closesquareo" size={50} style={{ marginLeft: 20 }} color="white" onPress={() => closeDoc()} />
                    </View>
                    <View style={{ width: "100%", height: "90%", justifyContent: "center", alignItems: "center" }}>
                        <ImageViewer imageUrls={dati.covers} style={{ width: "100%" }} backgroundColor='transparent' />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const stile = StyleSheet.create({
    box: {
        width: "76%",
        height: 300,
        flexDirection: "row",
        marginRight: "12%",
        marginLeft: "12%",
        overflow: "hidden",
        marginBottom: 30,
        marginTop: 30,
        elevation: 5,
        shadowOffset: -20,
        borderRadius: 7,
    },
    containerTitolo: {
        width: "100%",
        height: "35%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    containerAudio: {
        width: "100%",
        height: "65%",
        flexDirection: "column",
        backgroundColor: "transparent",
    },
    controller: {
        width: "100%",
        height: "60%",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    timeView: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    buttonView: {
        width: "100%",
        height: "40%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row"
    },
    button: {
        borderRadius: 7,
        width: "45%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#61dafb"
    }
});
export default Box;