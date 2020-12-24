import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import productStack from './routes';
import PureProductListScreen from './PureReact/screens/PureProductList';
import PureProductDetailScreen from './PureReact/screens/PureProductDetail';
import ProductListScreen from './WithRedux/screens/ProductList';
import ProductDetailScreen from './WithRedux/screens/ProductDetail';

const Stack = createStackNavigator();

export default function FlatListStack() {
  return (
    <>
      <Stack.Screen name={productStack.pureProductList} component={PureProductListScreen} />
      <Stack.Screen name={productStack.pureProductDetail} component={PureProductDetailScreen} />
      <Stack.Screen name={productStack.productList} component={ProductListScreen} />
      <Stack.Screen name={productStack.productDetail} component={ProductDetailScreen} />
    </>
  );
}
