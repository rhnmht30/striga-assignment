import axios from 'axios';
import crypto from 'crypto';

const interceptorRequest = (config) => {

  const hmac = crypto.createHmac(
    'sha256',
    process.env.NEXT_PUBLIC_STRIGA_API_SECRET,
  );
  const time = Date.now().toString();

  hmac.update(time);
  hmac.update(config.method.toUpperCase());
  hmac.update(config.url);

  const contentHash = crypto.createHash('md5');
  contentHash.update(
    JSON.stringify(config.data ?? {}),
  );

  hmac.update(contentHash.digest('hex'));

  config.headers.Authorization = `HMAC ${time}:${hmac.digest('hex')}`;
  config.headers['api-key'] = process.env.NEXT_PUBLIC_STRIGA_API_KEY;
  return config;
};

export const APIClient = axios.create({
  baseURL: 'https://www.sandbox.striga.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

APIClient.interceptors.request.use(interceptorRequest);
