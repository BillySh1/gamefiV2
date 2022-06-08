import Web3 from "web3";
export default {
  async Init(callback, provider) {
    if (window.ethereum) {
      this.provider = window.ethereum;
    } else if (window.web3) {
      this.provider = window.web3.currentProvider;
    } else {
      this.provider = new Web3.providers.HttpProvider(
        "https://rpc-testnet.kcc.network/"
      );
    }
    const web3 = new Web3(this.provider);
    provider(web3);
    await web3.eth.getAccounts().then((accs) => {
      callback(accs[0]);
    });
  },
};
