const Function = require('../models/Function');
const User = require('../models/UserAuth');
const { param } = require('../routes/function');

const functionController = {};

functionController.get = async (req, res) => {
    try{
        const function_obj = await Function.find().populate('createdBy','email -_id');
        res.json(function_obj);
    }
    catch(error){
        res.json({message: error});
    }
};

functionController.getManyById = async (req, res) => {
    const { ids } = req.params;
    var jsonIds = JSON.parse(ids);
    try{
        const function_obj = await Function.find( { '_id' : { $in : jsonIds.data } } );
        res.json(function_obj);
    }
    catch(error){
        res.json({message: error});
    }
};
functionController.getById = async (req, res) => {
    try{
        const function_obj = await Function.findById(req.params.id);
        res.json(function_obj);
    }
    catch(error){
        res.json({message: error});
    }
};

functionController.create = async (req, res) => {
    const function_obj = new Function(req.body);
    try{
        const savedTemplate = await function_obj.save();
        res.json(savedTemplate);
    } catch(error){
        res.json({message: error});
    }
};

functionController.edit = async (req, res) => {
    //const function_obj = new Function(req, res);
    try{
        const updatedTemplate = await Function.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedTemplate);
    } catch(error){
        res.json({message: error});
    }
};

functionController.delete = async (req, res) => {
    try{
        const function_obj = await Function.deleteOne({_id: req.params.id});
        res.json(function_obj);
    }
    catch(error){
        res.json({message: error});
    }
};

module.exports = functionController;