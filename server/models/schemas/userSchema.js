import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Not Approved",
    },
     role: {
      type: String,
      default: "client",
     },
     phoneno: {
      type: Number,
      required: true,
     }
  },
  { timestamps: true }
);

userSchema.statics.createUser = async function (email, password, name, role, phoneno) {

    // validation
    if(!email || !password || !name || !phoneno) {
        throw Error("fillup email, password, name, phone number")
    }

    const exists = await this.findOne({email})

    if (exists){
        throw Error("user already exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, name, role, phoneno})

    return user
}

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("fillup email and password");
  }

  const user = await this.findOne({ email });

  console.log(user);

  if (!user) {
    throw Error("no such user found!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("password mismatch");
  }

  return user;
};

export { userSchema };
