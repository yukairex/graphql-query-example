const getData = require('./lib').getData;
const URL = 'https://api.thegraph.com/subgraphs/name/yukairex/zksync';

const poolQuery = `
  {
    tokens(orderBy: tokenId, orderDirection: asc) {
      id
      tokenId
      symbol
      name
    }
  }`;

const App = async () => {
  // query pool data
  let data = await getData(URL, poolQuery);

  // let sushiPerBlock = data.masterChefs[0].sushiPerBlock / 1e18; // total sushi per block
  let pools = data.tokens;

  console.log('============= print white listed token data ============');
  pools.forEach((e) => {
    console.group(`white listed token ${e.tokenId}`);
    console.log(`token name: ${e.name}, symbol: ${e.symbol}`);
    console.groupEnd();
  });
};

App();
