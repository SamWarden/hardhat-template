import { task } from "hardhat/config"


interface HashArgs {
  types: string
  values: string
}

task("hash", "Get a hash of parameters")
  .addPositionalParam("types", "A list of types names that will be used to hash the values")
  .addPositionalParam("values", "A list of values that will be hashed using the types")
  .setAction(async (args: HashArgs, hre) => {
    const typesArr = args.types.split(",")
    const valuesArr = args.values.split(",")
    console.log("Types:", typesArr)
    console.log("Values:", valuesArr)

    const hash = hre.ethers.utils.keccak256(hre.ethers.utils.solidityPack(typesArr, valuesArr))
    console.log("Hash:", hash)

    return hash
  })
