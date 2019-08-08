const { Router } = require("express");
const router = Router();
let arraySort = require('array-sort');
let itemArray = [];

// GET all todo items
const getAllInventory = (req, res) => {
	res.json({ itemArray });
};

// POST todo items

const createNewInventoryItem = (req, res) => {
    const {title, description, due_date, status} = req.body;
    const newTodo= {
        id: `I${Math.floor(Math.random() * 1000)}`,
        title: title,
        description: description,
        due_date: due_date,
        status: status
    }
    itemArray.push(newTodo);
    arraySort(itemArray, ['due_date'])
  	res.json(itemArray);
};


//DELETE todo items
const removeInventoryItem = (req, res) => {
		const reqId = req.params.id;
		let newArray = itemArray.filter(item => {
			return item.id !== reqId
		});
	    itemArray = newArray;
		res.json(itemArray);
}


router.post("/items", createNewInventoryItem);
router.get("/items", getAllInventory);
router.delete("/items/:id", removeInventoryItem);

module.exports = router;
