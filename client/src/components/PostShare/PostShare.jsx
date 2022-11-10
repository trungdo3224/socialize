import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../redux/actions/post.action";
// import { serverPublic } from "../Post/Post";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [video, setVideo] = useState("");
  const desc = useRef();

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };


  const validateVideo = (event) => {
    if (event.target.files && event.target.files[0]) {
      let video = event.target.files[0];
      setVideo(video);
    }
  }

  const imageRef = useRef();
  const videoRef = useRef();
  const cloudinaryPreset = process.env.REACT_APP_CLOUDINARY_PRESET;
  const cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME;

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      video: ""
    };

    const uploadVideo = async () => {

      const data = new FormData();
      data.append("file", video);
      data.append("upload_preset", `${cloudinaryPreset}`);
      try {
        setUploading(true);
        let res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryName}/video/upload`, {
          method: "post",
          body: data,
        });
        const urlData = await res.json();
        if (urlData.secure_url) {
          newPost.video = await urlData.secure_url;
          dispatch(uploadPost(newPost));
        }
        setUploading(false);
      } catch (error) {
        setUploading(false);
        console.log(error);
      }
    }
    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    if (video) {
      uploadVideo();
    }

    if (!video && desc.current.value.length > 0) {
      dispatch(uploadPost(newPost));
      resetShare();
    }
  };


  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    setVideo(null);
    desc.current.value = "";
  };
  return (
    <div className="post-share">
      <div>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="share-input"
          ref={desc}
          required
        />
        <div className="post-options">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => videoRef.current.click()}
          >
            <UilPlayCircle />
            {/* <input type="file" /> */}
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>

          <div style={{ display: "none" }}>
            <input type="file" ref={videoRef} onChange={validateVideo} />
          </div>
        </div>

        {image && (
          <div className="preview-image">
            <UilTimes onClick={resetShare} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}

        {video && (
          <div className="preview-video">
            <UilTimes onClick={resetShare} />
            <video src={URL.createObjectURL(video)} alt="preview" />
          </div>
        )}

      </div>
    </div>
  );
};

export default PostShare;