import path from 'path';
import getConfig from '@config';

const { publicPath, serverUrl } = getConfig();

export const uploadAsset = (req, res) => {
  const { file } = req;
  res.status(200).json({
    filename: file.originalname,
    mimetype: file.mimetype,
    url: `${serverUrl}/v1/public/${file.filename}`,
  });
};

export const getImage = (req, res) => {
  const { fileName } = req.params;
  return res.sendFile(path.join(publicPath, fileName));
};
