import {useEffect, useState} from "react";
import productApi from "../../../api/productApi";

export default function useProductDetail(productId) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const productData = await productApi.get(productId);
                setProduct(productData);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })()
    }, [productId]);

    return {product, loading};
}