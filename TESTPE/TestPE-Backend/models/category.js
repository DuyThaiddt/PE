//1. import mongoose, schema
import mongoose, { Schema } from 'mongoose';

//2. Category Schema
const categorySchema = new Schema({
    id: { type: Schema.Types.ObjectId },
    name: {
        type: String,
        required: [true, 'Name is required!'],
        unique: [true, 'Name is existed!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    }
}, {
    timestamps: true
});

//3. Mapping to Collection categories
const Category = mongoose.model('categories', categorySchema);
export default Category;