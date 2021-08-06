import React, { useCallback, useState } from "react";
import dummyProfile from "../../assets/image/dummy-profile-image.png";

export const ImageUploadButton = ({ name, ImageUplaoder, ...props }) => {
  const [file, setFile] = useState("");
  const handleImageUpload = useCallback(
    (event) => {
      const file = event.target.files[0];
      setFile(file);
    },
    [setFile]
  );
  console.log(file);
  return (
    <div className="ImageUploader ">
      <div>
        <img
          src={(file && URL.createObjectURL(file)) || dummyProfile}
          width="100%"
          alt=""
          height="100%"
          objectFit="cover"
        />
      </div>

      <i class="fa fa-plus-circle "></i>

      <input
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        {...props}
      />
    </div>
  );
};
