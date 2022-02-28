module.exports.getBalances = (data) => {
  const _balances = data.events.reduce((prev, cur) => {
    if (cur.from !== "0x0000000000000000000000000000000000000000") {
      prev[cur.from].tokenIds = prev[cur.from].tokenIds.filter((tokenId) => tokenId !== cur.tokenId);
      prev[cur.from].amount -= 1;
      if (prev[cur.from].tokenIds.length === 0) delete prev[cur.from];
    }
    if (!prev[cur.to]) prev[cur.to] = { wallet: cur.to, tokenIds: [], amount: 0 };
    prev[cur.to].tokenIds = [...prev[cur.to].tokenIds, cur.tokenId];
    prev[cur.to].amount += 1;
    return prev;
  }, {});

  const balances = Object.keys(_balances).map((key) => _balances[key]);

  return balances;
};
