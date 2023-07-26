import React from "react";
import {FlatList, View} from 'react-native'

import CategoryListElement from "../CategoryListElement/CategoryListElement";
import Header from "../../Header/Header";

import {styles} from "./styles";

interface CategoryListProps {
    category: any
}

const CategoryList: React.FC<CategoryListProps> = ({category}) => {
    const renderElement = (categoryData: any) => {
        return <CategoryListElement category={categoryData.item}/>
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header variant="h5">Kategorie:</Header>
            </View>
            <FlatList data={category} renderItem={renderElement} keyExtractor={(item: any) => item} horizontal={true}
                      showsHorizontalScrollIndicator={false}/>
        </View>
    )
}

export default CategoryList

