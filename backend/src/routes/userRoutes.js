import express, { Router } from "express"

const router = express.Router(); //They enable you to group related routes and middleware together, making your code more modular and maintainable.

//request to the homepage
router.get('/', (req, res) => {
    res.send('Hello from Server!');
});

export default router;