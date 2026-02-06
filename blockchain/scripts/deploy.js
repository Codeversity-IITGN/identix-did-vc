// Deployment script for CredentialRegistry contract
const hre = require("hardhat");

async function main() {
    console.log("Deploying CredentialRegistry contract...");

    // Get the contract factory
    const CredentialRegistry = await hre.ethers.getContractFactory("CredentialRegistry");

    // Deploy the contract
    const credentialRegistry = await CredentialRegistry.deploy();

    await credentialRegistry.waitForDeployment();

    const address = await credentialRegistry.getAddress();

    console.log(`✅ CredentialRegistry deployed to: ${address}`);
    console.log(`\nAdd this to your .env file:`);
    console.log(`CONTRACT_ADDRESS=${address}`);

    // Wait for a few block confirmations
    console.log("\nWaiting for block confirmations...");
    await credentialRegistry.deploymentTransaction().wait(5);

    console.log("✅ Deployment confirmed!");

    // Verify contract on Etherscan (if not on local network)
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("\nVerifying contract on Etherscan...");
        try {
            await hre.run("verify:verify", {
                address: address,
                constructorArguments: [],
            });
            console.log("✅ Contract verified on Etherscan");
        } catch (error) {
            console.log("❌ Verification failed:", error.message);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
