//1. import mongoose, schema
import mongoose, { Schema } from 'mongoose';

//2. Product Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    price: {
        type: Number,
        required: false,
        min: [0, 'Price must be greater than 0!']
    },
    description: {
        type: String,
        required: false
    },
    images: {
        type: Array,
        required: false
    },
    comments: {
        type: Array,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: [true, 'Category is required!']
    }
}, {
    timestamps: true
});

//3. Mapping to Collection 'Products'
const Product = mongoose.model('products', productSchema);
export default Product;