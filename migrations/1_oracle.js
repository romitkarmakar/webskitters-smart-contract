var GoldToken = artifacts.require("./GoldToken.sol");
var simplestorage = artifacts.require("./Storage.sol")
module.exports = function(deployer){
    deployer.deploy(simplestorage);
    deployer.deploy(GoldToken);
}
