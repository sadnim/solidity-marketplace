// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIModelMarketplace {
    struct AIModel {
        string name;
        string description;
        uint256 price; // Price in Wei
        address payable creator;
        bool purchased;
        uint8 ratingCount;
        uint256 totalRating;
    }

    AIModel[] public models;
    address payable public owner;

    // Events
    event ModelListed(uint256 modelId, string name, address creator);
    event ModelPurchased(uint256 modelId, address buyer);
    event ModelRated(uint256 modelId, uint8 rating);

    constructor() {
        owner = payable(msg.sender);
    }

    function listModel(string memory _name, string memory _description, uint256 _price) public {
        require(_price > 0, "Price must be greater than zero");
        models.push(AIModel(_name, _description, _price, payable(msg.sender), false, 0, 0));
        emit ModelListed(models.length - 1, _name, msg.sender); // Emit event on listing
    }

    function purchaseModel(uint256 _modelId) public payable {
        require(_modelId < models.length, "Model does not exist");
        AIModel storage model = models[_modelId];
        require(msg.value >= model.price, "Insufficient funds sent");
        require(!model.purchased, "Model already purchased");
        require(msg.sender != model.creator, "Creator cannot buy their own model");

        model.purchased = true; // Update state before the transfer
        model.creator.transfer(msg.value); // Transfer funds
        emit ModelPurchased(_modelId, msg.sender); // Emit event on purchase
    }

    function rateModel(uint256 _modelId, uint8 _rating) public {
        require(_modelId < models.length, "Model does not exist");
        AIModel storage model = models[_modelId];
        require(model.purchased, "Model must be purchased before rating");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");

        model.ratingCount++;
        model.totalRating += _rating;
        emit ModelRated(_modelId, _rating); // Emit event on rating
    }

    function withdrawFunds() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        owner.transfer(balance);
    }

    function getModelDetails(uint256 _modelId) public view returns (string memory, string memory, uint256, address, uint256) {
        require(_modelId < models.length, "Model does not exist");
        AIModel storage model = models[_modelId];
        uint256 averageRating = model.ratingCount > 0 ? model.totalRating / model.ratingCount : 0;
        return (model.name, model.description, model.price, model.creator, averageRating);
    }

    function getModelCount() public view returns (uint256) {
        return models.length;
    }
}
