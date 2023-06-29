import { Schema, model } from "mongoose";

const collection = 'users'
const Schema = new Schema({
    name: {type:string,required:true},
    photo: {type:string,default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjXJx4qTq0ZD21Qi_qhbUYjlj-YX8Wad3cgoP9JjPxHHrUdRoBWbNYqz2fdbA7gdIlq8k&usqp=CAU'},
    email: {type:string,required:true, index:true,unique:true},
    age: {type:Number},
    role: {type:Number,default:0},
    password: {type:string,required:true},
})

const User = model(collection,Schema)
export default User