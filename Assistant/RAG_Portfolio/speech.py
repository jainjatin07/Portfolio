def record_audio(filename="query.wav", duration=5):
    try:
        import sounddevice as sd
        from scipy.io.wavfile import write
        sample_rate = 16000
        print("🎤 Speak...")
        recording = sd.rec(
            int(duration * sample_rate),
            samplerate=sample_rate,
            channels=1,
            dtype="int16"
        )
        sd.wait()
        write(filename, sample_rate, recording)
    except Exception as e:
        print(f"Audio recording not available on server: {e}")

def speech_to_text():
    try:
        from faster_whisper import WhisperModel
        model = WhisperModel("tiny", device="cpu", compute_type="int8")
        record_audio()
        segments, _ = model.transcribe("query.wav")
        return "".join(segment.text for segment in segments).strip()
    except Exception as e:
        print(f"Speech recognition fallback: {e}")
        return ""