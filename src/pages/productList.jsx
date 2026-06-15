import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchForGET from "../hooks/useFetchForGET";
import useEcommerceContext from "../context/useEcommerceContext";
import ProductCard from "../component/productCard";

const ProductList = () => {

  const { triggerAlert } = useEcommerceContext();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { categoryId } = useParams();

  const { data: categoriesData, loading: catLoading, error: catError } = useFetchForGET(`${BASE_URL}/api/fetch/categories`, []);

  const { data, loading, error } = useFetchForGET(`${BASE_URL}/api/fetch/clothing`, []);

  const allCategories = categoriesData?.data?.category || [];
  const allProducts = data?.data?.clothing || [];

  useEffect(() => {
    if (categoryId && categoryId !== "all") {
      setSelectedCategories([categoryId]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryId]);

  useEffect(() => { if (price > 0 && sortBy) setSortBy(""); }, [price]);
  useEffect(() => { if (sortBy) setPrice(0); }, [sortBy]);

  useEffect(() => {
    let product = [...allProducts];
    if (selectedCategories.length > 0) {
      product = product.filter(prod => selectedCategories.includes(prod.categoryId))
    }

    if (rating > 0) {
      product = product.filter(prod => prod.rating >= rating);
    }

    if (price > 0) {
      product = product.filter(prod => prod.price <= price);
    }

    if (sortBy === "lowToHigh") {
      product = product.sort((a, b) => a.price - b.price)
    } else if (sortBy === "highToLow") {
      product = product.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(product)
  }, [selectedCategories, rating, price, sortBy, allProducts]);

  const handleCategoryChange = (catId) => {

    const isAvailableInCategory = selectedCategories.includes(catId);

    if (isAvailableInCategory) {
      setSelectedCategories((cat) => cat.filter((item) => item != catId));
    } else {
      setSelectedCategories((cat) => [...cat, catId]);
    }
  }

  const handleClear = () => {
    setSelectedCategories([]);
    setRating(0);
    setPrice(0);
    setSortBy("");
    triggerAlert("Filters Cleared", "info");
  };

  const [showFilters, setShowFilters] = useState(false);

  const filterSidebar = (
    <aside className="p-3 bg-light h-100">
      <div className="d-flex d-md-none justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Filters</h2>
        <button className="btn-close" onClick={() => setShowFilters(false)} />
      </div>
      <h2 className="mb-4 d-none d-md-block">Filters</h2>

      <div>
        <h3>Categories</h3>
        {catLoading ? (
          <div className="spinner-grow spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : catError ? "Error Occurred" : (
          allCategories.map((cat) => (
            <div key={cat._id} className="form-check">
              <input className="form-check-input" type="checkbox" id={`cat-${cat._id}`} checked={selectedCategories.includes(cat._id)} onChange={() => handleCategoryChange(cat._id)} />
              <label className="form-check-label" htmlFor={`cat-${cat._id}`}>
                {cat.name}
              </label>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="mt-4">price</h3>

        <input type="range" className="form-range" min="500" max="1800" step="1" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
        <div className="mt-2">price: <strong>₹ {price}</strong></div>
      </div>

      <div>
        <h3 className="mt-4">rating</h3>

        <input type="range" className="form-range" min="0" max="5" step="0.5" value={rating} onChange={(event) => setRating(Number(event.target.value))} />
        <div className="mt-2">rating: <strong>{rating.toFixed(1)} ⭐</strong></div>

      </div>

      <div>
        <h3 className="mt-4">Sort By</h3>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="sort" id="no-sort" value="" checked={sortBy === ""} onChange={(event) => setSortBy(event.target.value)} />
          <label className="form-check-label" htmlFor="no-sort">
            No Sort
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="sort" id="low-sort" value="lowToHigh" checked={sortBy === "lowToHigh"} onChange={(event) => setSortBy(event.target.value)} />
          <label className="form-check-label" htmlFor="low-sort">
            Low to High
          </label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="sort" id="high-sort" value="highToLow" checked={sortBy === "highToLow"} onChange={(event) => setSortBy(event.target.value)} />
          <label className="form-check-label" htmlFor="high-sort">
            High to Low
          </label>
        </div>
      </div>

      <hr />

      <button className="btn btn-danger w-100" onClick={handleClear}>Clear All Filters</button>
    </aside>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar — always visible on md+, offcanvas on mobile */}
        <div className="d-none d-md-block col-md-3 col-lg-2 p-0">
          {filterSidebar}
        </div>

        {/* Mobile filter toggle */}
        <div className="d-md-none p-3">
          <button className="btn btn-outline-secondary w-100" onClick={() => setShowFilters(true)}>
            Filters
          </button>
        </div>

        {/* Offcanvas for mobile filters */}
        {showFilters && (
          <>
            <div className="position-fixed top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }} onClick={() => setShowFilters(false)} />
            <div className="position-fixed top-0 start-0 h-100 bg-white shadow" style={{ width: "280px", zIndex: 1050, overflowY: "auto" }}>
              {filterSidebar}
            </div>
          </>
        )}

        {/* Product List */}
        <main className="col-12 col-md-9 col-lg-10 mt-1 p-4">
          <h3 className="mb-4">{selectedCategories.length || rating || price || sortBy ? `Filtered — ${filteredProducts.length} results` : "All Products"}</h3>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? "Error Occurred" : filteredProducts.length === 0 ? (
            <p className="text-muted">No products found matching your filters.</p>
          ) : (
            <div className="row g-3 bg-secondary-subtle p-2 p-md-4">
              {filteredProducts.map((item) => (
                <div className="col-6 col-md-4 col-lg-3" key={item._id}>
                  <ProductCard productInfo={item} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductList;