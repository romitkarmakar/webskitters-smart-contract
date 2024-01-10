// SPDX-License-Identifier: MIT
pragma solidity <=0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoldToken is ERC20 {
    AggregatorV3Interface internal priceFeed;
    address public owner;

    constructor() ERC20("Gold Token", "GLD") {
        priceFeed = AggregatorV3Interface(0xC5981F461d74c46eB4b0CF3f4Ec79f025573B0Ea);
        owner = msg.sender;
    }

    function getLatestGoldPrice() public view returns (uint256) {
        (,int price,,,) = priceFeed.latestRoundData();
        return uint256(price) / 10**8;
    }

    function calculateGoldTokenAmount(uint256 _sepoliaEthAmount) public view returns (uint256) {
        uint256 goldPrice = getLatestGoldPrice();
        return (_sepoliaEthAmount * 10**18) / goldPrice;
    }

    function buyGoldTokens() public payable {
        uint256 goldTokens = calculateGoldTokenAmount(msg.value);

        // Mint gold tokens
        _mint(msg.sender, goldTokens);
    }

    function mint(address to, uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can mint tokens");
        _mint(to, _amount);
    }
}