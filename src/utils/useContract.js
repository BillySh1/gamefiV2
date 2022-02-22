import initWeb3 from "./initWeb3";
import addressMap from "../constants/Address";
import _airdrop from "../constants/AirDrop.json";

let web3;
initWeb3
  .Init(
    () => {},
    (provider) => {
      window.rich = provider;
    }
  )
  .then(() => console.log(window.rich));

const C_Airdrop = () => new web3.eth.Contract(_airdrop.abi, addressMap.airdrop);

export { C_Airdrop };
