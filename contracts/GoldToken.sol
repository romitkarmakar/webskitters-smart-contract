import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


IERC20 SepoliaETH = IERC20(0x...); // set correct SepoliaETH address here
//In addition to the mint function, add a function to calculate the amount of gold tokens user will get for a given amount of SepoliaETH. This functio
 //calculates the equivalent amount of gold tokens based on SepoliaETH and current gold price.

function calculateGoldTokenAmount(uint256 _sepoliaEthAmount) public view returns (uint256) {
    uint256 goldPrice = getLatestGoldPrice();
    return (_sepoliaEthAmount * 10**18) / goldPrice;
}
Finally, add a function where a user buys gold tokens by sending SepoliaETH. The function calculates the amount of gold tokens user will receive, takes SepoliaETH from user, mints Gold tokens and sends it to the user.

function buyGoldTokens(uint256 _sepoliaEthAmount) public {
    uint256 goldTokens = calculateGoldTokenAmount(_sepoliaEthAmount);

    // transfer SepoliaETH from user to this contract for later use or liquidity provision
    require(SepoliaETH.transferFrom(msg.sender, address(this), _sepoliaEthAmount), "Insufficient SepoliaETH balance");

    // mint gold tokens
    _mint(msg.sender, goldTokens);
}