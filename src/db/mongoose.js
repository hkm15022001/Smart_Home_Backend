const mongoose = require('mongoose');
const { db } = require('../config/index');

const uriString = `mongodb://${db.hostname}:${db.port}`;
//singleton design pattern
class Database {
    static instance;
    constructor(){
        this.connect();
    }
    async connect(type='mongodb'){
        //dev enviroment
        // if(1==1){
        //     mongoose.set("debug",true);//like a console
        //     mongoose.set("debug",{color:true}); 
        // }
        console.log(uriString);
        try {
            await mongoose.connect(uriString,{
                maxPoolSize : 50,
                dbName: db.name,
                user: db.username,
                pass: db.password
            },()=>{
                console.log("Connected MongoDB!!!");
            })           
        } catch (error) {
            console.log(">>Error:",err)
        }
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;