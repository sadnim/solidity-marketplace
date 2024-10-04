const contractAddress = '0xF96F85E7b66206F06e243A5Afa79FEd2638544A0'; // Replace with your deployed contract address
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "ModelListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "ModelPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "newRating",
				"type": "uint8"
			}
		],
		"name": "ModelRated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "listModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_modelId",
				"type": "uint256"
			}
		],
		"name": "purchaseModel",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_modelId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_rating",
				"type": "uint8"
			}
		],
		"name": "rateModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getModelCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_modelId",
				"type": "uint256"
			}
		],
		"name": "getModelDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasRated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "modelOwners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "models",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "totalRating",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "ratingCount",
				"type": "uint8"
			},
			{
				"internalType": "address payable",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "purchased",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let contract;
let userAccount;

window.addEventListener('load', async () => {
    // Check if Web3 is injected (MetaMask)
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        contract = new web3.eth.Contract(abi, contractAddress);
        loadModels(); // Load models when the page is loaded
    } else {
        alert('Please install MetaMask to use this app.');
    }
});

// Function to add a new AI model
async function addNewModel() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = web3.utils.toWei(document.getElementById('price').value, 'ether');

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.listModel(name, description, price).send({ from: accounts[0] });
        loadModels(); // Reload models
        alert('Model listed successfully.');
    } catch (error) {
        console.error(error);
    }
}

// Function to load available models
async function loadModels() {
    const modelCount = await contract.methods.getModelCount().call();
    const modelsList = document.getElementById('modelsList');
    modelsList.innerHTML = '';

    for (let i = 0; i < modelCount; i++) {
        const modelDetails = await contract.methods.getModelDetails(i).call();
        const modelElement = document.createElement('div');
        modelElement.classList.add('model-item');
        modelElement.innerHTML = `
            <strong>Name:</strong> ${modelDetails[0]} <br>
            <strong>Description:</strong> ${modelDetails[1]} <br>
            <strong>Price:</strong> ${web3.utils.fromWei(modelDetails[2], 'ether')} ETH <br>
            <strong>Creator:</strong> ${modelDetails[3]} <br>
            <strong>Average Rating:</strong> ${modelDetails[4]} <br>
            <button onclick="purchaseModel(${i}, ${modelDetails[2]})">Purchase</button>
            <button onclick="viewModelDetails(${i})">View Details</button>
        `;
        modelsList.appendChild(modelElement);
    }
}

// Function to purchase a model
async function purchaseModel(modelId, price) {
    const accounts = await web3.eth.getAccounts();
    console.log(`Attempting to purchase model ID: ${modelId} for price: ${price} by account: ${accounts[0]}`);

    try {
        await contract.methods.purchaseModel(modelId).send({ from: accounts[0], value: price });
        loadModels(); // Reload models after purchase
        alert('Model purchased successfully.');
    } catch (error) {
        console.error("Error purchasing model:", error);
        alert("Purchase failed: " + error.message);
    }
}

// Function to rate a purchased model
async function ratePurchasedModel() {
    const rating = document.getElementById('rating').value;
    const modelId = prompt("Enter the model ID you want to rate:"); // Get the model ID to rate

    if (modelId === null || modelId === "") {
        alert("Model ID cannot be empty.");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.rateModel(modelId, rating).send({ from: accounts[0] });
        alert('Model rated successfully.');
    } catch (error) {
        console.error(error);
    }
}

// Function to view model details
async function viewModelDetails(modelId) {
    const modelDetails = await contract.methods.getModelDetails(modelId).call();
    alert(`Name: ${modelDetails[0]}\nDescription: ${modelDetails[1]}\nPrice: ${web3.utils.fromWei(modelDetails[2], 'ether')} ETH\nCreator: ${modelDetails[3]}\nAverage Rating: ${modelDetails[4]}`);
}

// Function to withdraw funds
async function withdrawFunds() {
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.withdrawFunds().send({ from: accounts[0] });
        alert('Funds withdrawn successfully.');
    } catch (error) {
        console.error(error);
    }
}

async function loadPurchasedModels() {
    const accounts = await web3.eth.getAccounts();
    const purchasedModelsListDiv = document.getElementById('purchasedModelsList');
    purchasedModelsListDiv.innerHTML = ''; // Clear existing list

    const modelCount = await contract.methods.getModelCount().call();
    for (let i = 0; i < modelCount; i++) {
        const modelDetails = await contract.methods.getModelDetails(i).call();
        
        // Only display models that are purchased by the current account
        if (modelDetails[4] && modelDetails[3] === accounts[0]) { // Check if model is purchased and is owned by the current user
            purchasedModelsListDiv.innerHTML += `
                <div class="purchased-item">
                    <h3>${modelDetails[0]}</h3>
                    <p>${modelDetails[1]}</p>
                    <p>Price: ${web3.utils.fromWei(modelDetails[2], 'ether')} ETH</p>
                    <p>Rating: ${modelDetails[4]}</p>
                    <div class="rating-container">
                        <input type="number" id="rating-${i}" placeholder="Rate (1-5)" min="1" max="5">
                        <button onclick="rateModel(${i})">Rate</button>
                    </div>
                </div>
            `;
        }
    }
}