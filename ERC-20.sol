// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
 constructor() ERC20("My ERC20 Token", "MTK") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}

contract Faucet {
    ERC20Token public token;
    uint256 public dispenseAmount = 100 * 10**18; 

    constructor(address tokenAddress) {
        token = ERC20Token(tokenAddress);
    }

   
    function requestTokens() public {
        require(token.balanceOf(address(this)) >= dispenseAmount, "Insufficient tokens in faucet");
        token.transfer(msg.sender, dispenseAmount);
    }
}
