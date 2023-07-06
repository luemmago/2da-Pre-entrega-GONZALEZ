import { Schema, model } from "mongoose";

const collection = 'users'
const Schema = new Schema({
    name: {type:string,required:true},
    photo: {type:string,default:'true'},
    email: {type:string,required:true, index:true,unique:true},
    age: {type:Number},
    role: {type:Number,default:0},
    password: {type:string,required:true},
})

const User = model(collection,Schema)
export default User