import math
import wave
import struct

def generate_music_box_birthday(filename="happy-birthday.wav"):
    sample_rate = 44100
    bpm = 78
    beat_dur = 60.0 / bpm
    
    # Frequency table for notes
    NOTE_FREQS = {
        'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
        'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98
    }

    # Music score: (start_beat, duration_in_beats, note, volume, pan)
    # pan: -0.5 is left, 0 is center, 0.5 is right
    score = []

    def add_note(beat, dur, note_name, vol=0.6, pan=0.0):
        if note_name in NOTE_FREQS:
            score.append((beat, dur, NOTE_FREQS[note_name], vol, pan))

    # --- Intro: Delicate music-box sparkle ---
    add_note(0.0, 1.0, 'C6', 0.35, 0.3)
    add_note(0.5, 1.0, 'G5', 0.30, -0.3)
    add_note(1.0, 1.0, 'E5', 0.30, 0.2)
    add_note(1.5, 1.0, 'C5', 0.35, -0.2)

    # --- Phrase 1: "Happy Birthday to you" ---
    # Pick-up
    add_note(2.0, 0.7, 'G4', 0.7, 0.0)
    add_note(2.7, 0.3, 'G4', 0.6, 0.05)

    # Bar 1 (Measure starts at beat 3.0)
    add_note(3.0, 1.0, 'A4', 0.8, -0.1)
    add_note(3.0, 2.5, 'C3', 0.45, -0.3) # Bass
    add_note(3.0, 2.0, 'E4', 0.35, -0.2)
    add_note(4.0, 1.0, 'G4', 0.75, 0.1)
    add_note(5.0, 1.0, 'C5', 0.85, 0.2)
    add_note(5.0, 2.0, 'G3', 0.4, -0.2)

    # Bar 2
    add_note(6.0, 1.8, 'B4', 0.85, 0.1)
    add_note(6.0, 2.5, 'G3', 0.45, -0.3) # Bass G
    add_note(6.0, 2.0, 'D4', 0.35, -0.1)
    add_note(7.0, 1.0, 'G4', 0.3, 0.2)   # gentle arpeggio fill
    
    # --- Phrase 2: "Happy Birthday to you" ---
    add_note(8.0, 0.7, 'G4', 0.7, -0.05)
    add_note(8.7, 0.3, 'G4', 0.6, 0.05)

    add_note(9.0, 1.0, 'A4', 0.8, -0.1)
    add_note(9.0, 2.5, 'G3', 0.45, -0.3)
    add_note(9.0, 2.0, 'D4', 0.35, -0.2)
    add_note(10.0, 1.0, 'G4', 0.75, 0.1)
    add_note(11.0, 1.0, 'D5', 0.85, 0.25)
    add_note(11.0, 2.0, 'B3', 0.4, -0.2)

    add_note(12.0, 1.8, 'C5', 0.85, 0.1)
    add_note(12.0, 2.5, 'C3', 0.5, -0.3) # Bass C
    add_note(12.0, 2.0, 'E4', 0.35, -0.1)
    add_note(13.0, 1.0, 'G4', 0.3, 0.2)  # gentle arpeggio fill

    # --- Phrase 3: "Happy Birthday dear my love" ---
    add_note(14.0, 0.7, 'G4', 0.7, -0.05)
    add_note(14.7, 0.3, 'G4', 0.6, 0.05)

    add_note(15.0, 1.0, 'G5', 0.95, 0.2)
    add_note(15.0, 2.5, 'C3', 0.5, -0.3)
    add_note(15.0, 2.0, 'E4', 0.35, -0.2)
    add_note(16.0, 1.0, 'E5', 0.85, 0.15)
    add_note(17.0, 1.0, 'C5', 0.8, -0.1)
    add_note(17.0, 2.0, 'G3', 0.4, -0.2)

    add_note(18.0, 1.0, 'B4', 0.8, 0.1)
    add_note(18.0, 2.5, 'F3', 0.45, -0.3) # Bass F
    add_note(18.0, 2.0, 'A4', 0.4, -0.1)
    add_note(19.0, 1.0, 'A4', 0.8, -0.15)
    add_note(19.0, 1.5, 'C4', 0.35, 0.1)

    # --- Phrase 4: "Happy Birthday to you" ---
    add_note(20.0, 0.7, 'F5', 0.9, 0.2)
    add_note(20.7, 0.3, 'F5', 0.75, 0.25)

    add_note(21.0, 1.0, 'E5', 0.85, 0.15)
    add_note(21.0, 2.5, 'C3', 0.5, -0.3)
    add_note(21.0, 2.0, 'G4', 0.4, -0.1)
    add_note(22.0, 1.0, 'C5', 0.8, -0.1)
    add_note(23.0, 1.0, 'D5', 0.85, 0.2)
    add_note(23.0, 2.0, 'G3', 0.45, -0.3)

    # Final resolution chord on C
    add_note(24.0, 3.5, 'C5', 0.9, 0.0)
    add_note(24.0, 4.0, 'C3', 0.6, -0.3)
    add_note(24.2, 3.5, 'G3', 0.45, -0.2)
    add_note(24.4, 3.5, 'E4', 0.45, -0.1)
    add_note(24.6, 3.5, 'G4', 0.5, 0.1)
    add_note(24.8, 3.5, 'C5', 0.6, 0.2)
    add_note(25.0, 3.5, 'E5', 0.65, 0.3)

    # Ending music-box sparkle glockenspiel
    add_note(26.0, 2.0, 'G5', 0.4, 0.25)
    add_note(26.5, 2.0, 'E6', 0.35, -0.25)
    add_note(27.0, 2.5, 'C6', 0.45, 0.1)

    total_beats = 29.5
    total_samples = int(total_beats * beat_dur * sample_rate) + int(2.5 * sample_rate)

    left_buffer = [0.0] * total_samples
    right_buffer = [0.0] * total_samples

    # Synthesize each music-box note
    for beat, dur_beats, freq, vol, pan in score:
        start_sample = int(beat * beat_dur * sample_rate)
        # Music box notes ring out with natural acoustic decay (~2.2 seconds)
        note_duration_seconds = max(dur_beats * beat_dur, 1.8)
        num_samples = int(note_duration_seconds * sample_rate)

        # Pan calculations (equal power)
        pan_clamped = max(-1.0, min(1.0, pan))
        left_gain = math.cos((pan_clamped + 1) * math.pi / 4)
        right_gain = math.sin((pan_clamped + 1) * math.pi / 4)

        for i in range(num_samples):
            idx = start_sample + i
            if idx >= total_samples:
                break
            
            t = i / sample_rate
            
            # Envelope: fast 4ms attack, natural metallic exponential decay
            attack = min(1.0, t / 0.005)
            decay = math.exp(-3.2 * t)
            env = attack * decay

            # Music box tine harmonics:
            # Fundamental sine
            # 1st inharmonic partial (~2.76x) typical of steel tines
            # 2nd partial (2.0x octave)
            # High shimmer partial (4.0x)
            signal = (
                0.72 * math.sin(2.0 * math.pi * freq * t) +
                0.22 * math.sin(2.0 * math.pi * freq * 2.76 * t) * math.exp(-6.0 * t) +
                0.16 * math.sin(2.0 * math.pi * freq * 2.0 * t) * math.exp(-4.5 * t) +
                0.08 * math.sin(2.0 * math.pi * freq * 4.0 * t) * math.exp(-9.0 * t)
            )

            sample_val = signal * env * vol * 0.42

            left_buffer[idx] += sample_val * left_gain
            right_buffer[idx] += sample_val * right_gain

    # Simple stereo room reverb simulation (comb delay with decay)
    delay_samples_l = int(0.065 * sample_rate)
    delay_samples_r = int(0.082 * sample_rate)
    decay_factor = 0.28

    for i in range(total_samples):
        if i >= delay_samples_l:
            left_buffer[i] += left_buffer[i - delay_samples_l] * decay_factor
        if i >= delay_samples_r:
            right_buffer[i] += right_buffer[i - delay_samples_r] * decay_factor

    # Normalize audio buffer to avoid clipping
    max_val = 0.001
    for i in range(total_samples):
        max_val = max(max_val, abs(left_buffer[i]), abs(right_buffer[i]))

    norm_scale = 0.92 / max_val if max_val > 0.92 else 1.0

    # Write 16-bit PCM WAV
    with wave.open(filename, 'wb') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)

        frames = bytearray()
        for i in range(total_samples):
            l_sample = int(max(-32767, min(32767, left_buffer[i] * norm_scale * 32767)))
            r_sample = int(max(-32767, min(32767, right_buffer[i] * norm_scale * 32767)))
            frames.extend(struct.pack('<hh', l_sample, r_sample))

        wav_file.writeframes(frames)
    
    print(f"Generated {filename} successfully! Duration: {total_samples/sample_rate:.1f}s")

if __name__ == '__main__':
    generate_music_box_birthday("c:\\Users\\aaaa\\OneDrive\\Desktop\\naveen\\happy-birthday.wav")
