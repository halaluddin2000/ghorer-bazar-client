import { useEffect, useState } from "react";
import { getAllProducts } from "../api/product.api";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getAllProducts();
                if (mounted) setProducts(data);
            } catch (err) {
                if (mounted) setError("Failed to load products");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchProducts();
        return () => (mounted = false);
    }, []);

    return { products, loading, error };
};

export default useProducts;
