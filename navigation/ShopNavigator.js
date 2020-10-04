import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import ProductsOverviewScreen, {
  screenOptions as overviewScreenOptions
} from "../screens/shop/ProductsOverviewScreen";
import AcademiesOverviewScreen, {screenOptions as AoverviewScreenOptions} from "../screens/shop/OverviewAcademiesScreen";
import ProductDetailScreen, {
  screenOptions as detailScreenOptions
} from "../screens/shop/ProductDetailScreen";
import UserProductsScreen, {
  screenOptions as userScreenOptions
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editScreenOptions
} from "../screens/user/EditProductScreen";
import AuthScreen, {
  screenOptions as authScreenOptions} from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#0f22e8a6" : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : "#FFF"
};

const Stack = createStackNavigator();
export const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      headerLayoutPreset="center"
      screenOptions={
        defaultNavOptions

      }
    >
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={overviewScreenOptions}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={detailScreenOptions}
      />
      {/* <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      /> */}
    </Stack.Navigator>
  );
};
export const AcademiesNavigator = () => {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      headerLayoutPreset="center"
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name="ProductsOverview"
        component={AcademiesOverviewScreen}
        options={AoverviewScreenOptions}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={detailScreenOptions}
      />     
    </Stack.Navigator>
  );
};

const AdmStack = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <AdmStack.Navigator
      headerBackTitleVisible={false}
      headerLayoutPreset="center"
      screenOptions={defaultNavOptions}
    >
      <AdmStack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userScreenOptions}
      />
      <AdmStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editScreenOptions}
      />
    </AdmStack.Navigator>
  );
};

const shopDrawer = createDrawerNavigator();
export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <shopDrawer.Navigator
      drawerContent={
        props => {
               
                return (
                  <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                      <DrawerItemList {...props} />
                      <Button
                        title="Logout"
                        color={Colors.primary}
                        onPress={() => {
                          dispatch(authActions.logout());
                          // props.navigation.navigate('Auth');
                        }}
                      />
                    </SafeAreaView>
                  </View>
                );
              }
            }
      
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <shopDrawer.Screen
        name="Match Score History"
        component={AcademiesNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <shopDrawer.Screen
        name="Personal Score"
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <shopDrawer.Screen
        name="comming soon..."
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          )
        }}
      />

    </shopDrawer.Navigator>
  );
};

const AuthStack = createStackNavigator();
export const AuthNavigator = () => {
  return <AuthStack.Navigator>
    <AuthStack.Screen name="Auth" component={AuthScreen} options={authScreenOptions}/>
  </AuthStack.Navigator>
}
