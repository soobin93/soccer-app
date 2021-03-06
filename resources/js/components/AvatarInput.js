import React, {useState, useEffect} from "react";
import {Upload, message} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";

const AvatarUpload = styled(Upload)`
  text-align: center;
`;

const AvatarInput = ({onUpdate, initialValue}) => {

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  function handleUpload({file}) {
    if (validateImage(file)) {
      showPreview(file);
      onUpdate(file);
    }
  }

  function validateImage(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isSizeOk = file.size / 1024 / 1024 < 4;
    if (!isSizeOk) {
      message.error('Image must smaller than 4MB!');
    }
    return isJpgOrPng && isSizeOk;
  }

  function showPreview(img) {

    setLoading(true);
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      setPreview(reader.result);
      setLoading(false);
    });

    reader.readAsDataURL(img);
  }

  useEffect(() => {
    if (initialValue) {
      setPreview(`/storage/avatars/${initialValue}`);
    }
  }, []);

  return (
    <AvatarUpload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      onChange={handleUpload}
      beforeUpload={() => false}
    >
      {preview
        ? <img src={preview} alt="avatar" style={{width: '100%'}}/>
        : uploadButton}
    </AvatarUpload>
  );
}

export default AvatarInput;
