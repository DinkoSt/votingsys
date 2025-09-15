// // eslint-disable-next-line no-undef
// const Voting = artifacts.require("Voting");

// module.exports = async function (deployer) {
//     await deployer.deploy(Voting);
// };
const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
    const officialName = "Admin";        // 👈 you can change this
    const proposal = "Best Programming Language?"; // 👈 change to your proposal

    await deployer.deploy(Voting, officialName, proposal);
};
