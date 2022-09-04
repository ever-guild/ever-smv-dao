async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "Document",
    publicKey: signer.publicKey,
    initParams: {
    },
    constructorParams: {
    },
    value: locklift.utils.toNano(3),
  });

  console.log(`Document deployed at: ${sample.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
