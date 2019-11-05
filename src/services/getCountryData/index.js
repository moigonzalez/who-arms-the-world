import axios from 'axios';

const getCountryData = () => {
  const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSEtLTlhrqaW4nWz7M6p7UZObrfn_856Ht0qjPPmS-wKlGsbLk2Qqh8etvhlecDKV_2dywIW2y3oLsG/pub?output=csv';
  const GSON = 'https://gson.fayazara.now.sh/?url=';

  return axios(`${GSON}${GOOGLE_SHEETS_URL}`);
};

export default getCountryData;