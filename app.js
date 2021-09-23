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
const NftAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "_approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_approved",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseUri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getOwnerNFTs",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_count",
				"type": "uint256"
			}
		],
		"name": "mintTo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "operators",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "_interfaceID",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_baseUri",
				"type": "string"
			}
		],
		"name": "updateBaseUri",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxSupply",
				"type": "uint256"
			}
		],
		"name": "updateMaxSupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "updateOperator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const MintAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ERC721Contract",
		"outputs": [
			{
				"internalType": "contract IERC721",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_referrer",
				"type": "address"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "refShare",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "referralContract",
		"outputs": [
			{
				"internalType": "contract IReferral",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC721",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setERC721Address",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_refShare",
				"type": "uint16"
			}
		],
		"name": "setRefShare",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IReferral",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setReferralAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "updatePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const refAccount = defaultRef;
if (window.location.search){
  refAccount = referralCodeToAccount(window.location.search.slice(5))
}
//const refAccount = refId ? referralCodeToAccount(refId) : defaultRef;
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
          return $.toast({
            heading: "Error",
            text: "Enter an integer！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        } else if (Number(inputValue) > 10) {
          document.getElementById("mint-button").innerHTML = `MINT (${inputValue ? price * inputValue : price} ETH)`;
          return $.toast({
            heading: "Error",
            text: "Max amount 10！",
            position: "top-center",
            showHideTransition: "fade",
            icon: "error",
          });
        }
        const ImageContract = new ethers.Contract(mintAddress, MintAbi, signer);
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
       /* const estimateGas = await ImageContract.estimateGas.claim(inputValue, {
          value: amountRaw,
        });
        const gasLimit = Math.floor(estimateGas.toNumber() * 2);*/

        const response = await ImageContract.mint(refAccount);
		const response2 = await ImageContract.send({from: account,
													value: 50000000000000000n/*mint.methods.price().call()*100000000000000000n*inputValue*/,
													gas: 1300000 + 2000000 * inputValue/*gasLimit*/,
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
