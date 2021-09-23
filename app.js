const env = "test";
const chainId = 421611;

//const env = "mainnet";
//const chainId = 42161;
const price = 0.05;
import {
    referralCodeToAccount,
    accountToReferralCode
} from "./utils.js";
const nftAddress = "0xFc49bA495105FDd1DCfA3FB9fA293d1B899791d3";
const mintAddress = "0xdf3FBc31EdF5f8445d8124dad9BEd3D21320C8A0";
const etherscanUrl = "https://arbiscan.io/tx";
const defaultRef= "0x5BcD80a59812d8f87cd15577E3Ac5B4eD547bA18"
import nftAbi from "./abis/ArbiantsERC721.json";
import mintAbi from "./abis/Arbiants.json";
const web3 = new Web3(provider || rpc);
const Nft = new web3.eth.Contract(nftAbi, nftAddress);
const Mint = new web3.eth.Contract(mintAbi, mintAddress);
const refAccount = refId ? referralCodeToAccount(refId) : defaultRef;
let provider = null;



window.onload = () => {
  var animateButton = function (e) {
    e.preventDefault();
    //reset animation
    e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  };

  var bubblyButtons = document.getElementsByClassName("bubbly-button");

  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener("click", animateButton, false);
  }

  window?.ethereum?.on("disconnect", () => {
    window.location.reload();
  });

  window?.ethereum?.on("networkChanged", () => {
    window.location.reload();
  });

  window?.ethereum?.on("chainChanged", () => {
    window.location.reload();
  });

  const connectWallet = async () => {
    await window.ethereum.enable();
    if (Number(window.ethereum.chainId) !== chainId) {
      return failedConnectWallet();
    }
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts");
    const accountAddress = accounts[0];
    document.getElementById("address-button").innerHTML = `${accountAddress.slice(0, 4)}...${accountAddress.slice(accountAddress.length - 4, accountAddress.length)}`;

    document.getElementById("copy-button").innerHTML = "COPY LINK";

    const inputValuePC = document.getElementById("amount-input").value;
    const inputValueMobile = document.getElementById("amount-input-mobile").value;
    const inputValue = inputValuePC || inputValueMobile;
    var mintBtnText = `MINT (${Number(inputValue) ? price * Number(inputValue) : price} ETH)`;
    console.debug("mintBtnText", mintBtnText);
    document.getElementById("mint-button").innerHTML = mintBtnText;
    document.getElementById("mint-button-mobile").innerHTML = mintBtnText;
  };

  const failedConnectWallet = () => {
    document.getElementById("address-button").innerHTML = "Error Network";
  };

  const switchNetwork = async () => {
    if (env === "test") {
      window?.ethereum
        ?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x66eeb",
              chainName: "Arbitrum Testnet",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
              blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/#/"],
            },
          ],
        })
        .then(() => {
          connectWallet();
        })
        .catch(() => {
          failedConnectWallet();
        });
    } else {
      window?.ethereum
        ?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xa4b1",
              chainName: "ARBITRUM Mainnet",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://arb1.arbitrum.io/rpc"],
              blockExplorerUrls: ["https://explorer.arbitrum.io"],
            },
          ],
        })
        .then(() => {
          connectWallet();
        })
        .catch(() => {
          failedConnectWallet();
        });
    }
  };

  connectWallet();

  const handleMint = async () => {
    $.toast().reset("all");
    if (!provider) {
      connectWallet();
    } else {
      const inputValue = document.getElementById("amount-input").value;
      try {
        document.getElementById("mint-button").innerHTML = "Minting...";
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        if (!inputValue || Math.round(inputValue) !== Number(inputValue)) {
          document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
          $.toast({
            heading: "Error",
            text: "1er if ok",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
          return $.toast({
            heading: "Error",
            text: "Enter an integer！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        } else if (Number(inputValue) > 10) {
          document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
          $.toast({
            heading: "Error",
            text: "1 else if ok",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
          return $.toast({
            heading: "Error",
            text: "Max amount 10！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        }
        const ImageContract = new ethers.Contract(contractAddress, abi, signer);
        const amountRaw = ethers.utils.parseUnits(`${price * Number(inputValue)}`, 18).toString();
        const balanceRaw = await provider.getBalance(account);
        const balance = ethers.utils.formatUnits(balanceRaw, 18);
        if (Number(balance) < price * inputValue) {
          document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
          return $.toast({
            heading: "Error",
            text: "Insufficient balance！",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
        }
        const estimateGas = await ImageContract.estimateGas.claim(inputValue, {
          value: amountRaw,
        });
        const gasLimit = Math.floor(estimateGas.toNumber() * 2);

        const response = await ImageContract.mint(refAccount);
		const response2 = await ImageContract.send({from: account,
													value: amountRaw,
													gas: gasLimit,
		});
        $.toast({
          heading: "Minting",
          text: "Start to minting！",
          position: "top-center",
          showHideTransition: "fade",
          hideAfter: 10000,
          icon: "info",
        });
        const result = await response.wait();
		const result2 = await response2.wait();
        $.toast().reset("all");
        $.toast({
          heading: "Success",
          text: "Minted Success!",
          showHideTransition: "slide",
          position: "top-center",
          icon: "success",
        });
        document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
        window.open(`${etherscanUrl}/${result.transactionHash}`);
      } catch (e) {
        console.error("e", e);
        document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
        if (e?.data?.message?.includes("Token is not enough")) {
          return $.toast({
            heading: "Error",
            text: "Token is not enough！",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
        }
        $.toast({
          heading: "Error",
          text: "Please try again！",
          showHideTransition: "fade",
          position: "top-center",
          icon: "error",
        });
      }
    }
  };
  


  const handleCopy = async() => {
    if (!provider) {
      switchNetwork();
    } else {
		const signer = await provider.getSigner();
		const account = await signer.getAddress();
		const code = accountToReferralCode(account);
		const link = `${window.location.href}/?ref=${code}`;
		navigator.clipboard.writeText(link).then(
        function () {
          document.getElementById("copy-button").innerHTML = "COPIED";
          setTimeout(() => {
            document.getElementById("copy-button").innerHTML = "COPY LINK";
          }, 2000);
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    }
  };

  const handleMintMobile = async () => {
    $.toast().reset("all");
    if (!provider) {
      connectWallet();
    } else {
      try {
        var inputValue = document.getElementById("amount-input-mobile").value;
        document.getElementById("mint-button-mobile").innerHTML = "Minting...";
			const signer = await provider.getSigner();
			const account = await signer.getAddress();
        if (!inputValue || Math.round(inputValue) !== Number(inputValue)) {
          document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
          return $.toast({
            heading: "Error",
            text: "Enter an integer！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        } else if (Number(inputValue) > 10) {
          document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
          return $.toast({
            heading: "Error",
            text: "Max amount 10！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        }
        const ImageContract = new ethers.Contract(contractAddress, abi, signer);
        const amountRaw = ethers.utils.parseUnits(`${price * Number(inputValue)}`, 18).toString();
        const balanceRaw = await provider.getBalance(account);
        const balance = ethers.utils.formatUnits(balanceRaw, 18);
        if (Number(balance) < price * inputValue) {
          document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
          return $.toast({
            heading: "Error",
            text: "Insufficient balance！",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
        }
        const estimateGas = await ImageContract.estimateGas.claim(inputValue, {
          value: amountRaw,
        });
        const gasLimit = Math.floor(estimateGas.toNumber() * 2);

        const response = await ImageContract.claim(inputValue, {
          value: amountRaw,
          gasLimit,
        });
        $.toast({
          heading: "Minting",
          text: "Start to minting！",
          position: "top-center",
          showHideTransition: "fade",
          hideAfter: 10000,
          icon: "info",
        });
        const result = await response.wait();
        $.toast().reset("all");
        $.toast({
          heading: "Success",
          text: "Minted Success!",
          showHideTransition: "slide",
          position: "top-center",
          icon: "success",
        });
        document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
        window.open(`${etherscanUrl}/${result.transactionHash}`);
      } catch (e) {
        console.error("e", e);
        document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
        if (e?.data?.message?.includes("Token is not enough")) {
          return $.toast({
            heading: "Error",
            text: "Token is not enough！",
            showHideTransition: "fade",
            position: "top-center",
            icon: "error",
          });
        }
        $.toast({
          heading: "Error",
          text: "Please try again！",
          showHideTransition: "fade",
          position: "top-center",
          icon: "error",
        });
      }
    }
  };

  document.getElementById("address-button").addEventListener("click", switchNetwork);
  document.getElementById("switch-button").addEventListener("click", switchNetwork);

  document.getElementById("copy-button").addEventListener("click", handleCopy);

  document.getElementById("mint-button").addEventListener("click", handleMint);
  document.getElementById("mint-button-mobile").addEventListener("click", handleMintMobile);

  $("#amount-input").on("input propertychange", () => {
    var inputValue = document.getElementById("amount-input").value;
    document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
    document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
  });
  $("#amount-input-mobile").on("input propertychange", () => {
    var inputValue = document.getElementById("amount-input-mobile").value;
    document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
    document.getElementById("mint-button-mobile").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
  });
};
