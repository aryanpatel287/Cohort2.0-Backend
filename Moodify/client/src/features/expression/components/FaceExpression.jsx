import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utlis";
import "../styles/face-expression.scss";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const [cameraUnavailable, setCameraUnavailable] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);

    const [expression, setExpression] = useState("Click to Detect");

    function handleDetectClick() {
        const expressionReturned = detect({ landmarkerRef, videoRef, setExpression })
        onClick(expressionReturned)
    }

    useEffect(() => {
        const setupCamera = async () => {
            try {
                await init({ landmarkerRef, videoRef });
                setCameraUnavailable(false);
            } catch {
                setCameraUnavailable(true);
            }
        };

        setupCamera();

        return () => {

            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="face-expression-wrap">
            <div className="face-expression-video-box">
                <video
                    ref={videoRef}
                    className="face-expression-video"
                    playsInline
                    onLoadedData={() => setIsVideoReady(true)}
                />
                {(cameraUnavailable || !isVideoReady) && (
                    <div className="face-expression-placeholder">
                        <i className="ri-camera-line" />
                        <p>Camera preview unavailable</p>
                    </div>
                )}
            </div>
            <h2>{expression}</h2>
            <button
                className="button primary-button"
                onClick={() => {
                    handleDetectClick();
                }}
                disabled={cameraUnavailable || !isVideoReady}
            >
                Detect expression
            </button>
        </div >
    );
}