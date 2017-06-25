import CryptoJS  from 'crypto-js';/**
 * Created by Mak on 25/6/17.
 */
import config from '../config';

export const annotate = async (imageUrl) => {
  const data = { "requests": [{"image": {"source": {"imageUri": imageUrl}},"features": [{"type": "TEXT_DETECTION"}]}]};
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${config.google_cloud_vision.api_key}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
  };
  return fetch(url, options).then(res => res.json());
}

export const uploadImageAsync = async (uri) => {
  const timestamp = (Date.now() / 1000 | 0).toString();
  const api_key = config.cloudinary.api_key;
  const api_secret = config.cloudinary.api_secret;
  const cloud = config.cloudinary.cloud_name;
  const hash_string = 'timestamp=' + timestamp + api_secret;
  const signature = CryptoJS.SHA1(hash_string).toString();
  const apiUrl = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload';

  const fileType = uri[uri.length - 1];

  const formData = new FormData();
  formData.append('file', {uri, name: `photo.${fileType}`, type: `image/${fileType}`});
  formData.append('timestamp', timestamp);
  formData.append('api_key', api_key);
  formData.append('signature', signature);

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}