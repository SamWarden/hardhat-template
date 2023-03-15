import { task } from "hardhat/config"


interface SignArgs {
  hash: string
  signer: string
  message: string
}

task("sign", "Sign a message")
  .addPositionalParam("message", "The message that will be signed")
  .addOptionalParam("signer", "Address or index of the signer", "0")
  .addOptionalParam("hash", "A list of types names that will be used to hash the message")
  .setAction(async (args: SignArgs, hre) => {
    const signerId = /^\d+$/.test(args.signer) ? Number(args.signer) : args.signer
    const signer = await hre.ethers.getSigner(signerId as any)
    const hashTypes = args.hash
    let message: string | Uint8Array = args.message

    if (hashTypes) {
      const hash = await hre.run("hash", {types: hashTypes, values: message})
      message = hre.ethers.utils.arrayify(hash)
    }
  
    console.log("Signer:", signer.address)
    console.log("Message to sign:", message)

    const signature = await signer.signMessage(message)
    console.log("Signature:", signature)
  })
