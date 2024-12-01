const checkTokenBalanceButton = document.getElementById("checkTokenBalance");
const tokenAddressInput = document.getElementById("tokenAddress");
const tokenBalanceDiv = document.getElementById("tokenBalance");

async function getTokenBalance() {
    const tokenAddress = tokenAddressInput.value.trim();
    if (!ethers.utils.isAddress(tokenAddress)) {
        tokenBalanceDiv.textContent = "Invalid token address!";
        return;
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const walletAddress = await signer.getAddress();

        const erc20Abi = [
            "function balanceOf(address owner) view returns (uint256)",
            "function symbol() view returns (string)",
        ];
        const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);

        const balance = await tokenContract.balanceOf(walletAddress);
        const symbol = await tokenContract.symbol();

        tokenBalanceDiv.textContent = `Balance: ${balance.toString()} ${symbol}`;
    } catch (error) {
        tokenBalanceDiv.textContent = `Error: ${error.message}`;
    }
}

checkTokenBalanceButton.addEventListener("click", getTokenBalance);