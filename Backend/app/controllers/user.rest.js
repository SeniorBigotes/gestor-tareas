const userService = require('../services/user.service');

exports.viewUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.viewUser(id);

        user ? res.status(200).send(user) :
        res.status(404).json({message: 'User not found'});
        
    } catch(e) {
        res.status(500).json({message: `Answer error: ${e.message}`});
    }
}

// Visualizar usuarios
exports.viewUsers = async (req, res) => {
    try {
        const users = await userService.viewUsers();

        users ? res.status(200).send(users) :
        res.status(404).json({message: 'No registered users'});

    } catch (e) {
        res.status(500).json({message: `Answer error: ${e.message}`});
    }
}