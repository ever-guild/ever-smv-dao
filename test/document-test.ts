import { expect } from "chai";
import { Contract, Signer } from "locklift";
import { FactorySource } from "../build/factorySource";

let dao: Contract<FactorySource["Document"]>;
let signer: Signer;

describe("Test base flow", async function () {
  before(async () => {
    signer = (await locklift.keystore.getSigner("0"))!;
  });
  describe("Contracts", async function () {
    it("Load contract factory", async function () {
      const sampleData = await locklift.factory.getContractArtifacts("Document");

      expect(sampleData.code).not.to.equal(undefined, "Code should be available");
      expect(sampleData.abi).not.to.equal(undefined, "ABI should be available");
      expect(sampleData.tvc).not.to.equal(undefined, "tvc should be available");
    });

    it("Deploy contract", async function () {
      const INIT_STATE = 0;
      const { contract } = await locklift.factory.deployContract({
        contract: "Document",
        publicKey: signer.publicKey,
        initParams: {
        },
        constructorParams: {
        },
        value: locklift.utils.toNano(2),
      });
      dao = contract;

      expect(await locklift.provider.getBalance(dao.address).then(balance => Number(balance))).to.be.above(0);
    });

    it("Create and discard draft", async function () {
      let response = await dao.methods.show_draft({}).call();
      expect(response.out).to.be.equal("\t");
      await dao.methods.add_line({ line: "foo" }).sendExternal({ publicKey: signer.publicKey });
      response = await dao.methods.show_draft({}).call();
      expect(response.out).to.be.equal("\tfoo\n");
      await dao.methods.discard({ }).sendExternal({ publicKey: signer.publicKey });
      response = await dao.methods.show_draft({}).call();
      expect(response.out).to.be.equal("\t");
    });

    it("Create chapter", async function () {
      let response = await dao.methods.show_all({}).call();
      expect(response.out).to.be.equal("");
      await dao.methods.add_line({ line: "foo" }).sendExternal({ publicKey: signer.publicKey });
      await dao.methods.add_line({ line: "bar" }).sendExternal({ publicKey: signer.publicKey });
      await dao.methods.add_chapter({ n: 0 }).sendExternal({ publicKey: signer.publicKey });
      response = await dao.methods.show_all({}).call();
      expect(response.out).to.be.equal("\n\tChapter 0\n\tfoo\nbar\n");
    });
  });
});
