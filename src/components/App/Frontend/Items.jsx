import React from 'react';
import { RowCenter } from '../Row';
import ItemInfo from './ItemInfo';

const Items = ({ data }) => {
    return (React.Children.toArray(data["items"].map((row) => {
        return <RowCenter style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
            {React.Children.toArray(row.map(item => <ItemInfo title={item["title"]} description={item["description"]} />))}
        </RowCenter>
    })));
}

export default Items;