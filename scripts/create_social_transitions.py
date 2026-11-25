import os
import subprocess
import sys

sys.stdout.reconfigure(line_buffering=True)

FFMPEG = r"C:\Users\SSC\AppData\Local\Python\pythoncore-3.15-64\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"
MEDIA_DIR = r"Images and Videos"

def get_video_duration(path):
    cmd = [FFMPEG, "-i", path]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            part = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = part.split(":")
            return float(h)*3600 + float(m)*60 + float(s)
    return 10.0

def generate_video(mode="landscape"):
    assert mode in ("landscape", "vertical")
    if mode == "landscape":
        width, height = 1920, 1080
        out_name = "Save_Dhurwa_Trees_Transition_HD_1080p.mp4"
    else:
        width, height = 1080, 1920
        out_name = "Save_Dhurwa_Trees_Reel_Vertical_9x16.mp4"

    out_path = os.path.join(MEDIA_DIR, out_name)
    temp_dir = os.path.join(MEDIA_DIR, f"temp_{mode}")
    os.makedirs(temp_dir, exist_ok=True)

    photo_files = [f"IMG_{i}.JPG" for i in range(8776, 8784)]
    video_files = [f"MVI_{i}.MOV" for i in range(8784, 8788)]

    # Narrative flow:
    # 4 canopy & road photos -> 2 video clips -> 4 marked tree closeups -> 2 panoramic drive videos
    sequence = [
        ("photo", photo_files[0]),
        ("photo", photo_files[1]),
        ("photo", photo_files[2]),
        ("photo", photo_files[3]),
        ("video", video_files[0]),
        ("video", video_files[1]),
        ("photo", photo_files[4]),
        ("photo", photo_files[5]),
        ("photo", photo_files[6]),
        ("photo", photo_files[7]),
        ("video", video_files[2]),
        ("video", video_files[3]),
    ]

    clip_paths = []
    clip_durations = []

    print(f"[{mode.upper()}] Standardizing {len(sequence)} clips ({width}x{height} @ 25fps)...", flush=True)

    for idx, (kind, fname) in enumerate(sequence):
        src_path = os.path.join(MEDIA_DIR, fname)
        temp_clip = os.path.join(temp_dir, f"clip_{idx:02d}.mp4")

        if kind == "photo":
            dur = 3.6  # 3.6 seconds = 90 frames at 25fps
            zoom_in = (idx % 2 == 0)
            if zoom_in:
                vf = (
                    f"zoompan=z='min(zoom+0.0012,1.12)':d=90:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={width}x{height}:fps=25,"
                    f"setsar=1,format=yuv420p"
                )
            else:
                vf = (
                    f"zoompan=z='if(lte(zoom,1.0),1.12,max(1.001,zoom-0.0012))':d=90:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={width}x{height}:fps=25,"
                    f"setsar=1,format=yuv420p"
                )

            cmd = [
                FFMPEG, "-y",
                "-i", src_path,
                "-vf", vf,
                "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
                "-frames:v", "90",
                "-an",
                temp_clip
            ]
        else:
            dur = get_video_duration(src_path)
            vf = (
                f"fps=25,"
                f"scale={width}:{height}:force_original_aspect_ratio=increase,"
                f"crop={width}:{height},"
                f"setsar=1,format=yuv420p"
            )
            cmd = [
                FFMPEG, "-y",
                "-i", src_path,
                "-vf", vf,
                "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
                "-an",
                temp_clip
            ]

        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if res.returncode != 0:
            print(f"Error on {fname}:", res.stderr[-400:], flush=True)
            raise RuntimeError(f"Failed to process {fname}")

        clip_paths.append(temp_clip)
        clip_durations.append(dur)
        print(f"  [{idx+1:02d}/{len(sequence):02d}] {fname} ({kind}, {dur:.2f}s) ready", flush=True)

    # Crossfade chaining
    T = 0.8
    print(f"[{mode.upper()}] Assembling 12 clips with {T}s smooth crossfades...", flush=True)

    inputs_args = []
    for path in clip_paths:
        inputs_args.extend(["-i", path])

    filter_complex = []
    cur_dur = clip_durations[0]
    last_tag = "[0:v]"
    transitions = ["fade", "dissolve", "fade", "fadeblack", "fade", "dissolve", "fade", "fadeblack", "fade", "dissolve", "fade"]

    for i in range(1, len(clip_paths)):
        offset = cur_dur - T
        cur_dur = offset + clip_durations[i]
        out_tag = f"[v{i}]" if i < len(clip_paths) - 1 else "[outv]"
        trans = transitions[(i - 1) % len(transitions)]
        filter_complex.append(f"{last_tag}[{i}:v]xfade=transition={trans}:duration={T}:offset={offset:.3f}{out_tag}")
        last_tag = out_tag

    fc_str = ";".join(filter_complex)

    final_cmd = [
        FFMPEG, "-y",
        *inputs_args,
        "-filter_complex", fc_str,
        "-map", "[outv]",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-an",
        out_path
    ]

    print(f"[{mode.upper()}] Rendering final transition video (duration: {cur_dur:.1f}s)...", flush=True)
    res = subprocess.run(final_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print("Final render error:", res.stderr[-500:], flush=True)
        raise RuntimeError("Final render failed")

    size_mb = os.path.getsize(out_path) / (1024 * 1024)
    print(f"[{mode.upper()}] Done! Output saved at: {out_path} ({size_mb:.2f} MB, {cur_dur:.1f}s)", flush=True)

    # Cleanup temporary clips
    for p in clip_paths:
        try:
            os.remove(p)
        except Exception:
            pass
    try:
        os.rmdir(temp_dir)
    except Exception:
        pass

    return out_path

if __name__ == "__main__":
    generate_video("landscape")
