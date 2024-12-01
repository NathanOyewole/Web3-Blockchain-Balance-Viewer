const connectWalletButton = document.getElementById("connectWallet");
const walletDetailsDiv = document.getElementById("walletDetails");

async function connectWallet() {
    if (!window.ethereum) {
        walletDetailsDiv.textContent = "nigga, MetaMask ain't installed!";
        return;
    }

    try {
        const provider = new
        ethers.providers.Web3Provider(
            window.ethereum);
            await
        provider.send("eth_requestAccounts", []);
        const signer =
        provider.getSigner();
        const address = await
        signer.getAddress();

        const balance = await
        provider.getBalance(address);
        const ethBalance =
        ethers.utils.formatEther(balance);

        walletDetailsDiv.innerHTML =
        `
        <p>Connected Wallet: ${address}</p>
        <p>ETH Balance: ${ethBalance} ETH</p>
        `;
    } catch (err) {
        walletDetailsDiv.textContent
        = "Failed to connect wallet, bruh!";
        console.log(err);
    }
}

connectWalletButton.addEventListener("click", connectWallet);