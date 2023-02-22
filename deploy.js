const {ethers} = require("ethers")
const fs = require("fs-extra")
require("dotenv").config();

async function main(){

    // const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
    let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    )

    // const encryptedJson = fs.readFileSync("./.encryptedKey.json" , "utf8")
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PASSWORD)
    // wallet = await wallet.connect(provider) 

    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi" , "utf8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin" , "utf8")

    const contractFactory =await new ethers.ContractFactory(abi,binary,wallet);
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1);

    const currentFavouriteNumber = await contract.retrive()
    console.log(currentFavouriteNumber.toString())
    
    const txResponce = await contract.store(7);
    await txResponce.wait(1);
    
    const current = await contract.retrive()
    console.log(current.toString())
    
}

main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })