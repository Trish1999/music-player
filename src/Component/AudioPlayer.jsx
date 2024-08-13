import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./style.css"
import {musicList} from "./musicList.json"

const AudioPlayer = () => {
    const [index, setIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [pause, setPause] = useState(true);
    const [audio] = useState(new Audio());

    useEffect(() => {
        audio.src = musicList[index].audio;
        if (!pause) {
            audio.play();
        } else {
            audio.pause();
        }

        const updateTime = () => {
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            setCurrentTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        };

        audio.addEventListener('timeupdate', updateTime);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
        };
    }, [index, pause]);

    const playOrPause = () => {
        setPause(!pause);
    };

    const nextSong = () => {
        setIndex((index + 1) % musicList.length);
    };

    const prevSong = () => {
        setIndex((index + musicList.length - 1) % musicList.length);
    };

    return (
        <div className="card">
            <div className="currentSong">
                <div className="image">
                    <img src={musicList[index].img} alt={musicList[index].name} />
                </div>
                <h1>{musicList[index].name} <br/>
                ({musicList[index].author})</h1>

                <div className="controls">
                    <span className="time">{currentTime}</span>
                    <button onClick={prevSong}>
                        <i className="bi bi-chevron-double-left"></i>
                    </button>

                    <button onClick={playOrPause}>
                        {pause ? <i className="bi bi-play-fill"></i> : <i className="bi bi-pause-fill"></i>}
                    </button>
                    <button onClick={nextSong} >
                        <i className="bi bi-chevron-double-right"></i>
                    </button>
                    <span className="time">{musicList[index].duration}</span>
                </div>
            </div>

            <div className="playList">
                {musicList.map((music, key) => (
                    <div
                        key={key}
                        onClick={() => setIndex(key)}
                        className={`track ${index === key && !pause ? 'current-audio' : ''} ${index === key && pause ? 'play-now' : ''
                            }`}
                    >
                        <div className="tracks">
                            <img className="trackImg" src={music.img} alt={music.name} />
                            <span className="details">
                            <p>{music.name}</p>
                            <p>{music.author}</p>
                            <p>{index === key ? currentTime : music.duration}</p>
                    </span>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudioPlayer;
