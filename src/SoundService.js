let clips = [];

const SoundService = {
  BUFFER_LENGTH: 1024,

  getClips() {
    return clips.slice();
  },

  saveClip(data, timestamp, duration, samples) {
    clips.push({
      id: Math.floor(Math.random() * 1000000),
      data,
      timestamp,
      duration,
      samples,
    });
    if (clips.length > 10) {
      clips.shift();
    }
  },

  deleteClip(id) {
    clips = clips.filter(clip => clip.id !== id);
  },

  playSound(data, volume = 1) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const processor = context.createScriptProcessor(SoundService.BUFFER_LENGTH, 1, 1);

      source.connect(processor);
      processor.connect(context.destination);

      const queue = data.slice();
      const sound = context.createScriptProcessor(SoundService.BUFFER_LENGTH, 1, 1);
      sound.onaudioprocess = ({ outputBuffer }) => {
        if (queue.length > 0) {
          const output = outputBuffer.getChannelData(0);
          const data = queue.shift();
          for (let i = 0; i < SoundService.BUFFER_LENGTH; i++) {
            output[i] = data[i] * volume;
          }
        } else {
          sound.disconnect();
        }
      };

      sound.loop = false;
      sound.connect(context.destination);
    });
  },
};

export default SoundService;
