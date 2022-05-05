import axios from 'axios';

const pinata_api_key = '0c4b96ff8706c7354792';
const pinata_secret_api_key =
  '4c3e410b069a3eeef7a54738b0bd0b6b8ea68011e5de61517e4e2158ef7fddd3';

export const testAuthentication = () => {
  const url = `https://api.pinata.cloud/data/testAuthentication`;
  return axios
    .get(url, {
      headers: {
        pinata_api_key,
        pinata_secret_api_key,
      },
    })
    .then(function (response) {
      console.log('res: ', response);
    })
    .catch(function (error) {
      console.log('e: ', error);
    });
};

export const pinFileToIPFS = async (formData: FormData) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  formData.append(
    'pinataMetadata',
    JSON.stringify({
      name: formData.get('title'),
      keyvalues: {
        title: formData.get('title'),
      },
    })
  );

  //pinataOptions are optional
  formData.append(
    'pinataOptions',
    JSON.stringify({
      cidVersion: 0,
      customPinPolicy: {
        regions: [
          {
            id: 'FRA1',
            desiredReplicationCount: 1,
          },
          {
            id: 'NYC1',
            desiredReplicationCount: 2,
          },
        ],
      },
    })
  );

  return axios
    .post(url, formData, {
      maxBodyLength: 1000, //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData['_boundary']}`,
        pinata_api_key,
        pinata_secret_api_key,
      },
    })
    .then((response) => response)
    .catch((error) => error);
};

// hit up the contract
