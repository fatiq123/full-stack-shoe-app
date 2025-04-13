// src/pages/ShoeDetails.jsx
import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ShoeService from '../services/shoe.service';
import {useCart} from '../hooks/useCart';
import {useAuth} from '../hooks/useAuth';
import toast from 'react-hot-toast';
const defaultShoeImage = 'https://placehold.co/400x400?text=Shoe+Image';

const ShoeDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {addToCart} = useCart();
    const {currentUser, isAdmin} = useAuth();

    const [shoe, setShoe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchShoeDetails = async () => {
            try {
                setLoading(true);
                const shoeData = await ShoeService.getShoeById(id);
                setShoe(shoeData);
            } catch (error) {
                console.error('Error fetching shoe details:', error);
                toast.error('Failed to load product details');
                navigate('/shop');
            } finally {
                setLoading(false);
            }
        };

        fetchShoeDetails();
    }, [id, navigate]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= (shoe?.stock || 1)) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        addToCart(shoe.id, quantity);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await ShoeService.deleteShoe(id);
            toast.success('Product deleted successfully');
            navigate('/shop');
        } catch (error) {
            console.error('Error deleting shoe:', error);
            toast.error('Failed to delete product');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header/>
                <main className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </main>
                <Footer/>
            </div>
        );
    }

    if (!shoe) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header/>
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                        >
                            Back to Shop
                        </button>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>

            <main className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                            {/* Product Image */}
                            <div className="flex items-center justify-center">
                                <img
                                    src={shoe.imageUrl || defaultShoeImage}
                                    alt={shoe.name}
                                    className="max-w-full max-h-[500px] object-contain rounded-lg"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = defaultShoeImage;
                                    }}
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{shoe.name}</h1>
                                <p className="text-xl text-gray-600 mb-4">{shoe.brand}</p>

                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="px-2 py-1 bg-gray-100 text-sm rounded">{shoe.category}</span>
                                    <span className="px-2 py-1 bg-gray-100 text-sm rounded">Size: {shoe.size}</span>
                                    <span className="px-2 py-1 bg-gray-100 text-sm rounded">Color: {shoe.color}</span>
                                </div>

                                <div className="text-2xl font-bold text-gray-900 mb-4">
                                    ${shoe.price.toFixed(2)}
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-700">{shoe.description}</p>
                                </div>

                                <div className="mb-6">
                  <span className={`text-sm font-medium ${
                      shoe.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {shoe.stock > 0 ? `In Stock (${shoe.stock} available)` : 'Out of Stock'}
                  </span>
                                </div>

                                {shoe.stock > 0 && (
                                    <div className="mb-6">
                                        <label htmlFor="quantity"
                                               className="block text-sm font-medium text-gray-700 mb-1">
                                            Quantity
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                                className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                id="quantity"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                min="1"
                                                max={shoe.stock}
                                                className="w-16 text-center py-1 border-t border-b border-gray-300"
                                            />
                                            <button
                                                onClick={() => quantity < shoe.stock && setQuantity(quantity + 1)}
                                                className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-auto">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={shoe.stock === 0}
                                        className={`flex-1 py-3 px-4 rounded-md text-white font-medium ${
                                            shoe.stock === 0
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-black hover:bg-gray-800'
                                        }`}
                                    >
                                        {shoe.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>

                                    {currentUser && isAdmin() && (
                                        <>
                                            <button
                                                onClick={() => navigate(`/admin/edit-shoe/${shoe.id}`)}
                                                className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                className="flex-1 py-3 px-4 bg-red-600 rounded-md text-white font-medium hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ShoeDetails;
