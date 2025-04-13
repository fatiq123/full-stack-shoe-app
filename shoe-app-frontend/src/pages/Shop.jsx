// src/pages/Shop.jsx
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ShoeCard from '../components/shop/ShoeCard';
import ShoeService from '../services/shoe.service';
import toast from 'react-hot-toast';

const Shop = () => {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
    });
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const location = useLocation();

    useEffect(() => {
        // Extract category from URL if present
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');

        if (categoryParam) {
            setFilters(prev => ({...prev, category: categoryParam}));
        }
    }, [location.search]);

    useEffect(() => {
        const fetchShoes = async () => {
            try {
                setLoading(true);
                let shoesData = await ShoeService.getAllShoes();

                // Extract unique brands and categories for filters
                const uniqueBrands = [...new Set(shoesData.map(shoe => shoe.brand))];
                const uniqueCategories = [...new Set(shoesData.map(shoe => shoe.category))];

                setBrands(uniqueBrands);
                setCategories(uniqueCategories);

                // Apply filters
                if (filters.category) {
                    shoesData = shoesData.filter(shoe =>
                        shoe.category.toLowerCase() === filters.category.toLowerCase()
                    );
                }

                if (filters.brand) {
                    shoesData = shoesData.filter(shoe =>
                        shoe.brand.toLowerCase() === filters.brand.toLowerCase()
                    );
                }

                if (filters.minPrice) {
                    shoesData = shoesData.filter(shoe =>
                        parseFloat(shoe.price) >= parseFloat(filters.minPrice)
                    );
                }

                if (filters.maxPrice) {
                    shoesData = shoesData.filter(shoe =>
                        parseFloat(shoe.price) <= parseFloat(filters.maxPrice)
                    );
                }

                setShoes(shoesData);
            } catch (error) {
                console.error('Error fetching shoes:', error);
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchShoes();
    }, [filters]);

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters(prev => ({...prev, [name]: value}));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            brand: '',
            minPrice: '',
            maxPrice: '',
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>

            <main className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">Shop All Shoes</h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filter Sidebar */}
                        <div className="lg:w-1/4">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Filters</h2>

                                <div className="space-y-6">
                                    {/* Category Filter */}
                                    <div>
                                        <label htmlFor="category"
                                               className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={filters.category}
                                            onChange={handleFilterChange}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Brand Filter */}
                                    <div>
                                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                                            Brand
                                        </label>
                                        <select
                                            id="brand"
                                            name="brand"
                                            value={filters.brand}
                                            onChange={handleFilterChange}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                                        >
                                            <option value="">All Brands</option>
                                            {brands.map((brand) => (
                                                <option key={brand} value={brand}>
                                                    {brand}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Price Range Filters */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="minPrice" className="block text-xs text-gray-500 mb-1">
                                                    Min Price
                                                </label>
                                                <input
                                                    type="number"
                                                    id="minPrice"
                                                    name="minPrice"
                                                    min="0"
                                                    value={filters.minPrice}
                                                    onChange={handleFilterChange}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="maxPrice" className="block text-xs text-gray-500 mb-1">
                                                    Max Price
                                                </label>
                                                <input
                                                    type="number"
                                                    id="maxPrice"
                                                    name="maxPrice"
                                                    min="0"
                                                    value={filters.maxPrice}
                                                    onChange={handleFilterChange}
                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={clearFilters}
                                        className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:w-3/4">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div
                                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                                </div>
                            ) : shoes.length === 0 ? (
                                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                    <h3 className="text-xl font-semibold mb-2">No Shoes Found</h3>
                                    <p className="text-gray-600 mb-4">
                                        Try adjusting your filters or check back later for new products.
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {shoes.map((shoe) => (
                                        <ShoeCard key={shoe.id} shoe={shoe}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default Shop;