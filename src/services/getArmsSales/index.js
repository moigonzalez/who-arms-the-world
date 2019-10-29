const getArmsSales = () => {
  const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQd3V1svdce4R6rJyMMW-YCU04uEZTgxVCfctEO42joZI41ULEONYXb-ZaXrfhgXoDoy70aQnyRZh0K/pub?output=csv";
  const GSON = "https://gson.fayazara.now.sh/?url=";

  return fetch(`${GSON}${GOOGLE_SHEETS_URL}`)
          .then(x => x.json());
};

export default getArmsSales;