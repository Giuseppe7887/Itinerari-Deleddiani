import { FlatList, StyleSheet, View, Text, Alert } from "react-native"
import audiolibri from "./struttura.js";
import Box from "./box.js";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { play, pause, resume, playAnother } from './audiocontroller.js'
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from "expo-status-bar";

function Home() {
    let [audioPLayback, setAudioPlayback] = useState(null);
    let [soundObject, setSoundObject] = useState(null)
    let [currentAudio, setCurrentAudio] = useState({});
    let [isPlaying, setIsPlaying] = useState({ state: false, index: null });
    let [isReady, setIsReady] = useState(true);
    let [cursor, setCursor] = useState({ min: 0, max: null, position: 0 });
    let [showHer,setShowHer] = useState(false)


    let playbackObject;
    // playback status
    const statusUpdate = async audioStatus => {
        if (audioStatus.didJustFinish) {
            try {
                setCursor(x => x = { max: 1, position: 0 })
                await playbackObject.unloadAsync();
                setSoundObject(null)
                setIsPlaying({ state: false, index: null })
            } catch (err) {
                console.log(err);
            }
        }
        if (audioStatus.isLoaded && audioStatus.isPlaying) {
            setCursor({ max: audioStatus.durationMillis, position: audioStatus.positionMillis, over: audioStatus.didJustFinish })
        }
    }

    async function handleAudioPress(audio, index) {
        NetInfo.fetch().then(async state => {
            if (state.isConnected) {
                if (!isReady) return;
                setIsReady(false);
                setTimeout(() => {
                    setIsReady(true);
                }, 500);
                !isPlaying.state ? setIsPlaying({ state: true, index: index }) : setIsPlaying({ state: false, index: index })
                // first play
                if (soundObject == null) {
                    playbackObject = new Audio.Sound();
                    const status = await play(playbackObject, audio);
                    setAudioPlayback(playbackObject);
                    setSoundObject(status);
                    setCurrentAudio(audio);
                    playbackObject.setOnPlaybackStatusUpdate(statusUpdate);
                    console.log("play" + currentAudio)
                    return
                }
                // pause audio
                if (soundObject.isLoaded && soundObject.isPlaying && audio === currentAudio) {
                    console.log("pause " + currentAudio);
                    const status = await pause(audioPLayback)
                    setSoundObject(status);
                    return;
                }

                // resume audio
                if (soundObject.isLoaded && !soundObject.isPlaying && currentAudio === audio) {
                    console.log("resume " + currentAudio)
                    try {
                        const status = await resume(audioPLayback);
                        return setSoundObject(status)
                    } catch (err) {
                        console.log(err)
                    }
                }
                // select another audio
                if (soundObject.isLoaded && currentAudio !== audio) {
                    setCursor({...cursor,position:0})
                    const status = await playAnother(audioPLayback, audio);
                    // try{audioPLayback.setPositionAsync(0)}catch(err){console.log(err)}
                    // console.log(cursor.position)
                    setCurrentAudio(audio);
                    setSoundObject(status);
                    setIsPlaying({ state: true, index: index })
                    setCursor({ ...cursor, position: 0 });
                    console.log("selected " + audio)
                }
            }
            else {
                Alert.alert("Errore di rete", "Hai bisogno di una connessione ad internet per riprodurre gli Audiolibri", [
                    { text: "ok" }
                ])
            }

        })

    };

    useEffect(()=>{
        console.log(cursor);
    },[cursor])

    async function forStartSlide() {
        if (!isPlaying.state) return;
        try {
            await pause(audioPLayback)
            setSoundObject({ ...soundObject, isPlaying: false })
            setIsPlaying({ ...isPlaying, state: false });
        } catch (err) {
            console.log(err);
        }
    }

    async function forSlideComplete(value) {
        if (soundObject == null) return;
        try {
            setCursor({...cursor,position:Math.floor(soundObject.durationMillis * value)});
            setIsPlaying({ ...isPlaying, state: true })
            const status = await audioPLayback.setPositionAsync(Math.floor(soundObject.durationMillis * value));
            setSoundObject({ ...status, isPlaying: true });
            // setCursor({...cursor, position:status.positionMillis});
            await resume(audioPLayback);
        } catch (err) {
            console.log(err);
        };
    }

    function showHerFun(){
        setShowHer(true)
    }
    return (
        <>
            <View style={stile.main}>
                <FlatList
                    style={stile.lista}
                    data={audiolibri}
                    renderItem={item => <Box showHer={showHerFun} dati={{ nome: item.item.nome, durata: item.item.durata, index: item.item.id, covers: item.item.covers }}
                        url={item.item.url}
                        isPlaying={isPlaying}
                        cursor={cursor}
                        onAudioPress={() => handleAudioPress(item.item.url, item.index)}
                        indexAudioLibro={item.item.id}
                        soundObject={soundObject}
                        forStartSlide={forStartSlide}
                        forSlideComplete={forSlideComplete}
                    />}
                    keyExtractor={item => item.id}
                />
                <Text style={{color:showHer?"black":"transparent", position:"absolute",fontWeight:"600",fontSize:20,bottom:40,left:"40%", backgroundColor: "transparent" }}>{"Aurora<3"}</Text>
            </View>
            <StatusBar backgroundColor="rgba(210, 213, 165, 0.23)" />
        </>
    );
};

const stile = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%"
    }
});

export default Home;