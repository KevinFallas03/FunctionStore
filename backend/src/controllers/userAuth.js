const UserAuth = require("../models/UserAuth");
const bcrypt = require("bcrypt");

const userAuthController = {};

// Obtains all the users
userAuthController.getUsers = async (req, res) => {
    try{
        const userAuth = await UserAuth.find();
        res.json(userAuth);
    }catch (error){
        res.json({message: error})
    }
}

// Given a userAuth token, return the userAuth id that have this token in the token list
userAuthController.getUserAuthByToken = async (req,res) => {
    const { token } = req.params;
    try {
        const userAuth = await UserAuth.find(
            { 'tokens.token': token },
            { _id:1, email:1, isAdmin:1, tokens:1 }
        );
        res.status(200).json(userAuth);
    } catch (error) {
        res.status(401).send(error);
    }
}

// Gets a single userAuth based on their email.
userAuthController.findUser = async (req, res) => {
    try {
        const userAuth = await UserAuth.getFromCredentials(req.body.email, req.body.password);

        // No userAuth was found
        if (!userAuth) {
            return res.status(401).json({error: "Invalid credentials"});
        }

        const token = await UserAuth.generateToken();
        // 200: OK
        res.status(200).json({userAuth, token});
    } catch (error) {
        // 400: Bad Request
        res.status(400).send(error);
    }
}

userAuthController.createUserAuth = async (req,res) => {
    // Creates the new userAuth

    if (await UserAuth.findOne( {email: req.body.email} )) {
        return res
          .status(400)
          .json({ errors: [{ param: 'email', msg: 'Email already exists' }] });
    }

    var newUser = new UserAuth({
        email: req.body.email, // Unique email handled in model
        password: req.body.password
    });

    // Tries to save the userAuth
    try {
        await newUser.save();

        // 201: userAuth was created and saved successfully
        res.status(201).send({newUser});

    } catch (error) {
        // 400: Bad Request
        //res.status(400).send(error);
        res.json({message: error})
    }
}

userAuthController.updateUserAuth = async (req,res) => {
    try {

        var updatedUser = {};

        if (req.body.password == "") {
            console.log(req.params);
            updatedUser = await UserAuth.findOneAndUpdate({email : req.params.email}, {$set: {
                email: req.body.email,
            }},
            {new: true});
        } else {
            // Encrypts the password before updating it
            updatedUser = await UserAuth.findOneAndUpdate({email : req.params.email}, {$set: {
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 8),
            }},
            {new: true});
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }
}

userAuthController.deleteUserAuth = async (req,res) => {
    try {
        const removedUser= await UserAuth.deleteOne({email: req.params.email});
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }
}

// Gets the information of one specific userAuth
userAuthController.getUserInfo = async (req, res) => {
    try {
        const userAuth = await UserAuth.findOne({email: req.params.email}, {tokens: false});

        // 200: OK
        res.status(200).json(userAuth);
    } catch (error) {
        // 400: Bad Request
        res.status(400).send(error);
    }
}

// Obtains a single userAuth by its credentials 
userAuthController.login = async (req, res) => {
    try {
        const userFound = await UserAuth.findOne( {email: req.body.email} );
        console.log(req.body.password);
        if(!userFound) return res.status(400).json({message: "Invalid Credentials"})

        const matchPassword = await UserAuth.comparePassword(req.body.password, userFound.password);

        if(!matchPassword) return res.status(400).json({message: "Invalid Credentials"})

        const token = await userFound.generateToken();

        // 200: OK
        res.status(200).json({userFound, token});
    } catch (error) {
        // 401: Unathorized
        console.log("se cae");
        res.status(401).send({error: "Something went wrong"});
    }
}

// Logs off the user from a single system (removes one token)
userAuthController.logoff = async (req, res) => {
    try {
        // Removes the token being used
        req.user.tokens = req.user.tokens.filter((tk) => {
            return tk.token != req.token;
        });
        // Updates the tokens
        await req.user.save();
        res.status(200).json({});
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }
}

// Logs off the user from all devices (removes all tokens)
userAuthController.forceLogoff = async (req, res) => {
    try {
        // Removes all tokens from the account
        req.user.tokens = [];
        // Updates the tokens
        await req.user.save();
        res.status(200).json({});
    } catch (error) {
        res.status(400).json({Error: "Something went wrong"});
    }
}

module.exports = userAuthController;