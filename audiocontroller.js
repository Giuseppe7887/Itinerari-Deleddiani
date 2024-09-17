// play audio

export async function play(playbackObject, uri) {
   try {
      const status = await playbackObject.loadAsync({ uri: uri }, { shouldPlay: true });
      return status;
   } catch (err) {
      console.log(err);
   }
};
// pause audio

export async function pause(audioPLayback) {
   try {
      return await audioPLayback.setStatusAsync({ shouldPlay: false });
   } catch (err) {
      console.log(err);
   }
};

// resume audio

export async function resume(audioPLayback) {
   try {
      return await audioPLayback.playAsync();
   } catch (err) {
      console.log(err)
   }
}

// play another
export async function playAnother(playbackObject, audio) {
   try {
      await playbackObject.stopAsync();
      await playbackObject.unloadAsync();
      return await play(playbackObject, audio);
   } catch (err) {
      console.log(err);
   }
}


