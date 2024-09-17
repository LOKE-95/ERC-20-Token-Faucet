const ERC20Token = artifacts.require("ERC20Token");
const Faucet = artifacts.require("Faucet");

contract("ERC20Token and Faucet", (accounts) => {
    let token;
    let faucet;
    const [owner, user] = accounts;

    before(async () => {
        
        token = await ERC20Token.deployed();
        faucet = await Faucet.deployed();
    });

    it("should deploy ERC20 token successfully", async () => {
        assert.ok(token.address, "Token contract address should be available");
    });

    it("should have a name", async () => {
        const name = await token.name();
        assert.equal(name, "My ERC20 Token", "Token name should be 'My ERC20 Token'");
    });

    it("should mint initial supply", async () => {
        const balance = await token.balanceOf(owner);
        assert.equal(balance.toString(), web3.utils.toWei('1000', 'ether'), "Initial supply should be minted to the owner");
    });

    it("should deploy Faucet successfully", async () => {
        assert.ok(faucet.address, "Faucet contract address should be available");
    });

    it("should request tokens from the faucet", async () => {
      
        const initialUserBalance = new web3.utils.BN(await token.balanceOf(user));

      
        await faucet.requestTokens({ from: user });

        const finalUserBalance = new web3.utils.BN(await token.balanceOf(user));

   
        const dispenseAmount = new web3.utils.BN(web3.utils.toWei('100', 'ether'));
        assert.equal(finalUserBalance.sub(initialUserBalance).toString(), dispenseAmount.toString(), "User should receive tokens from the faucet");
    });
});
