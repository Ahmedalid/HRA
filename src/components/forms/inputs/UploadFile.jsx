import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineUpload } from "react-icons/ai";

import avatar from "../../../assets/images/avatar.png";
export default function UploadFile({
  isFile,
  defaultFile,
  register,
  registerName,
  classNameImage,
  containerImageStyles,
  labelStyles = { width: "150px" },
  label = "Upload",
  accept,
  preview,
  filename,
}) {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState(null);
  const [filenameState, setFilenameState] = useState(null);

  useEffect(() => {
    if (isFile) {
      return;
    } else {
      setImagePreview(defaultFile || avatar);
    }
  }, [isFile, defaultFile]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFilenameState(file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  return (
    <div className="mb-3">
      {!isFile && preview && (
        <div
          className={`${classNameImage}  mb-3`}
          style={{ width: "250px", ...containerImageStyles }}
        >
          <img className="img-fluid rounded-2" src={imagePreview} />
        </div>
      )}
      {filename && <div className="w-100">{filenameState}</div>}
      <label htmlFor={registerName} style={{ width: "100%", ...labelStyles }}>
        <div className="btn btn-blue-green d-flex gap-2 justify-content-center">
          <AiOutlineUpload size={20} />
          <span>{t(label)}</span>
        </div>
      </label>
      <input
        type="file"
        name={registerName}
        {...register(registerName)}
        id={registerName}
        className="file-input__input"
        onChange={handleImageChange}
        accept={accept || "*"}
      />
    </div>
  );
}
