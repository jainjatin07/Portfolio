from faster_whisper import WhisperModel
import sounddevice as sd
from scipy.io.wavfile import write

model = WhisperModel(
    "small",
    device="cuda",
    compute_type="int8_float16"
)

def record_audio(filename="query.wav", duration=5):
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


def speech_to_text():
    record_audio()

    segments, _ = model.transcribe("query.wav")

    return "".join(segment.text for segment in segments).strip()