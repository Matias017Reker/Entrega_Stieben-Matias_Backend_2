import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    cart: { type: Schema.Types.ObjectId, ref: "Cart", default: null },
    role: { type: String, default: "user" }
});

// eliminar password al enviar
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default model("User", userSchema);