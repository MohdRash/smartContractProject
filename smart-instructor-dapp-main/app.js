// Deployed Contract ABI
const abi = "YOUR ABI";

// Deployed Contract Address
const contractAddress = "Your deployed contract address";

const App = {
  web3: null,
  account: null,
  contract: null,
  initProvider: async () => {
    try {
      // Connecting with ganache-cli
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      // console.log(web3);
      App.getAccount();
    } catch (err) {
      $("#instructor").html("Ganache-cli not initialized");
    }
  },
  getAccount: async () => {
    let accounts = await web3.eth.getAccounts((acc) => acc);
    account = accounts[0];
    // console.log(account);
    App.getContract();
  },
  getContract: async () => {
    contract = await new web3.eth.Contract(abi, contractAddress);
    // console.log(contract);
    App.listenToEvents();

    App.render();
  },
  render: async () => {
    // Get instructor information form blockchain
    const instructor = await contract.methods.getInstructor().call();
    // Feed ui with info
    $("#instructor").html(`${instructor[0]} (${Number(instructor[1])})`);
  },
  updateInstructor: async () => {
    $("#button").html("Loading...");
    $("#button").attr("disabled", true);

    try {
      await contract.methods
        .setInstructor($("#name").val(), Number($("#age").val()))
        .send({ from: account });
      App.render();
    } catch (error) {console.log(error); }

    $("#button").html("Update Instructor");
    $("#button").attr("disabled", false);
  },
  listenToEvents: () => {
    // Subscribe doesn't work with HttpProvider
    const subscription = contract.events.SetInstructor();
    subscription.on("data", (eventLog) => App.render());
    subscription.on("error", (error) => console.log(error));
  },
};

App.initProvider();
