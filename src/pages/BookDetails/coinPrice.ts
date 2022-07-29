// coin market cap api
import axios from 'axios';

const apiKey = 'f22681f7-64fc-48b9-8721-3394bea76069';
const quoteEndpoint =
  'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=xtz';

export const getTezosPrice = async () => {
  const response = await axios.get(quoteEndpoint, {
    headers: {
      'X-CMC_PRO_API_KEY': apiKey,
    },
  });

  if (response && response.data) {
    return response.data.data.XTZ[0].quote.USD.price.toFixed(2);
  } else {
    return 0;
  }
};
