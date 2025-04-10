import {useNavigate} from 'react-router-dom';

import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.styles";

const DirectoryItem = ({category}) => {
    const {imageUrl, title, route, id} = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler} key={id}>
            <BackgroundImage
                imageUrl={imageUrl}
            />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};
export default DirectoryItem;
