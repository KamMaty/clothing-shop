import {CategoryPreviewContainer, ProductsView, Title} from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <ProductsView>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => <ProductCard key={product.id} product={product}/>
                    )}
            </ProductsView>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;
