import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder-2";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";



const Recorder = () => {
  const navigate =useNavigate();
  const [recordingNumber, setRecordingNumber] = useState(0);

  let videoname = "Rename_Me";
  let videoext = "webm";

  let { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({
      screen: {
        mimeType: "video/webm",
      },
      audio: true,
    });

  const handlestart = () => {
    const currentTimeStamp = new Date().getTime();
    setRecordingNumber(currentTimeStamp);
    console.log("recording start");
    startRecording();
  };

  if (previewStream) {
    document.getElementById("abhi").srcObject = previewStream;
  }

  const handlestop = () => {
    console.log("recording stop");
    // giving the unique number
    const currentTimeStamp = new Date().getTime();
    setRecordingNumber(currentTimeStamp);
    stopRecording();
  };

  const viewRecording = () => {
    console.log("video viewed");
    window.open(mediaBlobUrl, "_blank").focus();
  };

  const downloadRecording = () => {
    console.log("downloaded video");
    const videoName = `${videoname}_${recordingNumber}.${videoext}`;
    try {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // for IE
        window.navigator.msSaveOrOpenBlob(mediaBlobUrl, videoName);
      } else {
        // for Chrome
        const link = document.createElement("a");
        link.href = mediaBlobUrl;
        link.download = videoName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlelogout =() =>{
    localStorage.removeItem("auth");
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="firstpage">
    
      <button className="logout" onClick={handlelogout}>LOGOUT</button>
     
      <video id="abhi" width={500} height={250} autoPlay controls></video>
      <p>{status}</p>

      <div className="btn">
        {status && status !== "recording" && (
          <button onClick={handlestart}>
            {mediaBlobUrl ? "Record again" : "Start Recording"}
          </button>
        )}

        {mediaBlobUrl && status && status === "stopped" && (
          <button onClick={viewRecording}>view Recording</button>
        )}

        {videoext && mediaBlobUrl && status && status === "stopped" && (
          <button onClick={downloadRecording}>Download Recording</button>
        )}

        {status && status === "recording" && status !== "stopped" && (
          <button onClick={handlestop}>Stop Recording</button>
        )}
      </div>
    
      {status && status !== "stopped" && status !== "idle" ? (
        <div className="myview">
          <Webcam mirrored={true} />
        </div>
      ) : (
        <div className="myview"> </div>
      )}
      
    </div>
  );
};

export default Recorder;

