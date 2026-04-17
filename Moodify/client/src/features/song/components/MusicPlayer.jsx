import React, { useRef, useState, useMemo } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/music-player.scss";

function formatTime(totalSeconds) {
    if (!Number.isFinite(totalSeconds)) return "0:00";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
}

const MusicPlayer = () => {
    const { song, loading } = useSong();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    const progressValue = useMemo(() => {
        if (!duration) return 0;
        return Math.min(currentTime, duration);
    }, [currentTime, duration]);

    const handlePlayPause = async () => {
        if (!audioRef.current || !song?.url) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            return;
        }

        try {
            await audioRef.current.play();
            setIsPlaying(true);
        } catch {
            setIsPlaying(false);
        }
    };

    const handleSeek = (event) => {
        if (!audioRef.current) return;
        const nextTime = Number(event.target.value);
        audioRef.current.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const handleVolumeChange = (event) => {
        if (!audioRef.current) return;
        const nextVolume = Number(event.target.value);
        audioRef.current.volume = nextVolume;
        setVolume(nextVolume);
    };

    const stepBy = (seconds) => {
        if (!audioRef.current) return;
        const maxDuration = Number.isFinite(audioRef.current.duration)
            ? audioRef.current.duration
            : duration;
        const nextTime = Math.min(
            Math.max(audioRef.current.currentTime + seconds, 0),
            maxDuration || 0
        );
        audioRef.current.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    if (!song) {
        return null;
    }

    return (
        <div className="music-player-bottom-wrap" aria-live="polite">
            <div className="music-player-bottom">
                <audio
                    ref={audioRef}
                    src={song.url}
                    preload="metadata"
                    onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                    onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                    onEnded={() => setIsPlaying(false)}
                />

                <div className="music-player-track-meta">
                    <img className="music-player-track-poster" src={song.posterUrl} alt={song.title} />
                    <div className="music-player-track-text">
                        <p className="music-player-track-title">{song.title}</p>
                        <p className="music-player-track-subtitle">{song.mood} mood</p>
                    </div>
                </div>

                <div className="music-player-main-controls">
                    <div className="music-player-actions">
                        <button className="music-player-icon-btn" onClick={() => stepBy(-5)} title="Back 5 seconds" type="button">
                            <i className="ri-skip-back-fill" />
                        </button>
                        <button className="music-player-play-btn" onClick={handlePlayPause} type="button" title={isPlaying ? "Pause" : "Play"}>
                            <i className={isPlaying ? "ri-pause-fill" : "ri-play-fill"} />
                        </button>
                        <button className="music-player-icon-btn" onClick={() => stepBy(5)} title="Forward 5 seconds" type="button">
                            <i className="ri-skip-forward-fill" />
                        </button>
                    </div>

                    <div className="music-player-progress-row">
                        <span>{formatTime(progressValue)}</span>
                        <input
                            className="music-player-progress"
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={progressValue}
                            onChange={handleSeek}
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="music-player-volume-wrap">
                    <i className="ri-volume-up-fill" />
                    <input
                        className="music-player-volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>
            {loading && <div className="music-player-loading-hint">Loading song...</div>}
        </div>
    );
};

export default MusicPlayer;
