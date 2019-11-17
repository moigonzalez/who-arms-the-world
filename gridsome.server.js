// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios');

const getArmSales = async (api) => {
  const GOOGLE_SHEETS_URL_ARMS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQd3V1svdce4R6rJyMMW-YCU04uEZTgxVCfctEO42joZI41ULEONYXb-ZaXrfhgXoDoy70aQnyRZh0K/pub?output=csv";
  const GOOGLE_SHEETS_URL_COUNTRIES = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSEtLTlhrqaW4nWz7M6p7UZObrfn_856Ht0qjPPmS-wKlGsbLk2Qqh8etvhlecDKV_2dywIW2y3oLsG/pub?output=csv';
  const GSON = "https://gson.fayazara.now.sh/?url=";

  api.loadSource(async ({ addCollection }) => {
    const { data } = await axios(`${GSON}${GOOGLE_SHEETS_URL_ARMS}`);
    const countryData = await axios(`${GSON}${GOOGLE_SHEETS_URL_COUNTRIES}`);

    const collection = addCollection('ArmSales');

    data.reverse().forEach(el => {
      collection.addNode({
        data: el['2018-2018'],
        supplier: el.Supplier,
        country: countryData.data.filter(x => x.name === el.Supplier)[0]
      })
    });
  });
}

module.exports = function (api) {
  getArmSales(api);

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
