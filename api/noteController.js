import { CosmosClient } from '@azure/cosmos';
//import container from '../config/db.js';
import dotenv from 'dotenv'
dotenv.config();

const endpoint = process.env.ENDPOINT;
const key = process.env.KEY;
const databaseId = process.env.DATABASEID;
const containerId = process.env.CONTAINERID;

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

const createNotes = async (req, res, next) => {
    try {
        const newItem = req.body;
        const { resource } = await container.items.create(newItem);
        res.json(resource);
    } catch (error) {
        next(error.message);
    }
}

const getAllNotes = async (req, res, next) => {
    try {
        const { resources: notes } = await container.items.readAll().fetchAll();
        res.json(notes);
    } catch (error) {
        next(error.message);
    }
}

const UpdateAllNotes = async (req, res, next) => {
    try {
        const updatedItem = req.body;
        const { resource: replacedItem } = await container.item(req.params.id).replace(updatedItem);
        res.json(replacedItem);
    } catch (error) {
        next(error.message);
    }
}

const deleteNotes = async (req, res, next) => {
    try {
        const {id}  = req.params;
        const  resource = await container.item(req.params.id).delete();
        res.json(resource);
    } catch (error) {
        next(error);
    }
}

export default { createNotes, getAllNotes, UpdateAllNotes, deleteNotes };
