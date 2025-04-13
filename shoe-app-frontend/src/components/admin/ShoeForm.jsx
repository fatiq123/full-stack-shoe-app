// src/components/admin/ShoeForm.jsx
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

const ShoeForm = ({initialData, onSubmit}) => {
    const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');
    const [imageFile, setImageFile] = useState(null);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: initialData || {
            name: '',
            brand: '',
            category: '',
            size: '',
            color: '',
            price: '',
            stock: '',
            description: ''
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFormSubmit = (data) => {
        onSubmit(data, imageFile);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', {required: 'Name is required'})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                        Brand
                    </label>
                    <input
                        type="text"
                        id="brand"
                        {...register('brand', {required: 'Brand is required'})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    />
                    {errors.brand && (
                        <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        {...register('category', {required: 'Category is required'})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    >
                        <option value="">Select a category</option>
                        <option value="Running">Running</option>
                        <option value="Casual">Casual</option>
                        <option value="Formal">Formal</option>
                        <option value="Sports">Sports</option>
                        <option value="Sandals">Sandals</option>
                    </select>
                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                        Size
                    </label>
                    <input
                        type="text"
                        id="size"
                        {...register('size', {required: 'Size is required'})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    />
                    {errors.size && (
                        <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Color
                    </label>
                    <input
                        type="text"
                        id="color"
                        {...register('color', {required: 'Color is required'})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    />
                    {errors.color && (
                        <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price ($)
                    </label>
                    <input
                        type="number"
                        id="price"
                        step="0.01"
                        min="0"
                        {...register('price', {
                            required: 'Price is required',
                            min: {value: 0, message: 'Price must be positive'}
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    />
                    {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        min="0"
                        {...register('stock', {
                            required: 'Stock is required',
                            min: {value: 0, message: 'Stock cannot be negative'}
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    />
                    {errors.stock && (
                        <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                    )}
                </div>

                <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows="4"
                        {...register('description')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    ></textarea>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Product Image
                    </label>
                    <div className="mt-1 flex items-center">
                        {imagePreview ? (
                            <div className="mr-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-32 w-32 object-cover rounded-md"
                                />
                            </div>
                        ) : null}
                        <label
                            className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                            <span>Upload a file</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="sr-only"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    {initialData ? 'Update Product' : 'Add Product'}
                </button>
            </div>
        </form>
    );
};

export default ShoeForm;