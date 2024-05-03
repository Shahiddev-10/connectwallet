import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { BrowserProvider } from "ethers";

const projectId = "5c2c567de9ae33ce09ba4f5fcdc11902";

const mainnet = {
	chainId: 1,
	name: "Ethereum",
	currency: "ETH",
	explorerUrl: "https://etherscan.io",
	rpcUrl: "https://cloudflare-eth.com",
};

const ethersConfig = defaultConfig({});

const modal = createWeb3Modal({
	ethersConfig,
	chains: [mainnet],
	projectId,
});

const openConnectModalBtn = document.getElementById("open-connect-modal");
const openNetworkModalBtn = document.getElementById("open-network-modal");
const signMessageBtn = document.getElementById("sign-message");

openConnectModalBtn.addEventListener("click", () => modal.open());
openNetworkModalBtn.addEventListener("click", () =>
	modal.open({ view: "Networks" })
);

signMessageBtn.addEventListener("click", async () => {
	const walletProvider = modal.getWalletProvider();
	const ethersProvider = new BrowserProvider(walletProvider);
	const signer = await ethersProvider.getSigner();
	const signature = await signer.signMessage("HELLO WORLD");
	console.log("Signed Message", signature);
});
