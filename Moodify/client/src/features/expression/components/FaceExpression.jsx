import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utlis";


export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    let streamRef;

    const [expression, setExpression] = useState("Click to Detect");



    useEffect(() => {


        init({ landmarkerRef, videoRef, streamRef });

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
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button onClick={() => { detect({ landmarkerRef, videoRef, setExpression }) }} >Detect expression</button>
        </div >
    );
}