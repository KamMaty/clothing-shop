import {useSelector} from "react-redux";

import {selectCategoriesMap} from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import {Fragment} from "react";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    
    return (
        <Fragment>
            {categoriesMap &&
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return (<CategoryPreview key={title} title={title} products={products}/>)
                })
            }
        </Fragment>
    );
};

export default CategoriesPreview;
