// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios');

const getArmSales = async (api) => {
  const GOOGLE_SHEETS_URL_ARMS = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR-i79q8iPpGMnvpusrGRcIF4MHOuwfEIlu1DjfptMvz1qIRMP050hrN3zW0KOQmO-oNxdpZLtGxUvc/pub?output=csv';
  const GOOGLE_SHEETS_URL_COUNTRIES = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSEtLTlhrqaW4nWz7M6p7UZObrfn_856Ht0qjPPmS-wKlGsbLk2Qqh8etvhlecDKV_2dywIW2y3oLsG/pub?output=csv';
  const GSON = 'https://gson.fayazara.now.sh/?url=';

  api.loadSource(async ({ addCollection }) => {
    const { data } = await axios(`${GSON}${GOOGLE_SHEETS_URL_ARMS}`);
    const countryData = await axios(`${GSON}${GOOGLE_SHEETS_URL_COUNTRIES}`);
    const YEARS = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];


    const collection = addCollection('ArmSales');
    const collectionYears = addCollection('ArmSalesYears');

    data.reverse().forEach(el => {
      collection.addNode({
        '2010': el['2010'],
        '2011': el['2011'],
        '2012': el['2012'],
        '2013': el['2013'],
        '2014': el['2014'],
        '2015': el['2015'],
        '2016': el['2016'],
        '2017': el['2017'],
        '2018': el['2018'],
        '2018': el['2018'],
        '2010-2018': el['2010-2018'],
        data: el['2018'],
        supplier: el.Supplier,
        country: countryData.data.filter(x => x.name === el.Supplier)[0]
      })
    });

    YEARS.forEach(el => {
      collectionYears.addNode({ value: `_${el}` });
    })
  });
}

module.exports = function (api) {
  getArmSales(api);

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
