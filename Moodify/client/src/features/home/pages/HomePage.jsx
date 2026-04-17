import React from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import MusicPlayer from "../../song/components/MusicPlayer";
import "../styles/home-page.scss";
import { useSong } from "../../song/hooks/useSong";
import Navbar from "../../shared/components/Navbar";

const HomePage = () => {

    const { handleGetSong } = useSong()

    return (
        <div className="home-page">
            <Navbar />
            <div className="home-expression">
                <FaceExpression onClick={(expression) => { handleGetSong({ mood: expression }) }} />
            </div>
            <div className="home-player">
                <MusicPlayer />
            </div>
        </div>
    );
};

export default HomePage;
