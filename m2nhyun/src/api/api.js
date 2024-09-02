export const fetchProducts = async () => {
  try {
    const response = await fetch("./src/api/productData.json");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
