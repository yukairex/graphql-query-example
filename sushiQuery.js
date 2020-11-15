const getData = require('./lib').getData;
const URL = 'https://api.thegraph.com/subgraphs/name/matthewlilley/sushiswap';

const poolQuery = `{
  masterChefs(first: 1) {
    id,
    sushiPerBlock,
    totalAllocPoint,
    pools{
      lpToken,
      allocPoint,
      lastRewardBlock
    }
  }
}`;

const App = async () => {
  // query pool data
  let data = await getData(URL, poolQuery);
  let sushiPerBlock = data.masterChefs[0].sushiPerBlock / 1e18; // total sushi per block
  let pools = data.masterChefs[0].pools;

  console.log('============= print pool data ============');
  pools.forEach((e) => {
    console.log(
      `LP token: ${e.lpToken}, every block produce: ${
        (e.allocPoint / 10000) * sushiPerBlock
      } SUSHI`
    );
  });
};

App();
