import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {SIZES, COLORS, FONTS} from '../constants/theme';
import icons from '../constants/icons';
import images from '../constants/images';

const Home = ({navigation}) => {
  //dummy data
  const initialCurrentLocation = {
    streetName: 'Fourways Junction',
    gps: {
      latitude: -1.2921,
      longitude: 36.8219,
    },
  };

  const categoryData = [
    {
      id: 1,
      name: 'Hot Dogs',
      icon: icons.hotdog,
    },
    {
      id: 2,
      name: 'Burgers',
      icon: icons.hamburger,
    },
    {
      id: 3,
      name: 'Pizza',
      icon: icons.pizza,
    },
    {
      id: 4,
      name: 'Rice',
      icon: icons.rice_bowl,
    },
    {
      id: 5,
      name: 'Sushi',
      icon: icons.sushi,
    },
    {
      id: 6,
      name: 'Drinks',
      icon: icons.drink,
    },
  ];

  //price rating
  const affordable = 500;
  const fairPrice = 300;
  const expensive = 1000;

  const restaurantData = [
    {
      id: 1,
      name: 'Wambura Burgers',
      rating: 4.8,
      categories: [2],
      priceRating: affordable,
      photo: images.burger_restaurant,
      duration: '30 - 45 min',
      location: {
        latitude: -1.2921,
        longitude: 36.8219,
      },
      courier: {
        avatar: images.avatar_1,
        name: 'Amy',
      },
      menu: [
        {
          menuId: 1,
          name: 'Crispy Chicken Burger',
          photo: images.crispy_chicken_burger,
          description: 'Burger with crispy chicken, cheese and lettuce',
          calories: 200,
          price: 800,
        },
        {
          menuId: 2,
          name: 'Crispy Chicken Burger with Honey Mustard',
          photo: images.honey_mustard_chicken_burger,
          description: 'Crispy chicken burger with honey mustard and coleslaw',
          calories: 250,
          price: 950,
        },
        {
          menuId: 3,
          name: 'Crispy Baked French Fries',
          photo: images.baked_fries,
          description: 'Crispy baked french fries',
          calories: 180,
          price: 250,
        },
      ],
    },
    {
      id: 2,
      name: 'Klodyne Pizza',
      rating: 4.8,
      categories: [3],
      priceRating: fairPrice,
      photo: images.pizza_restaurant,
      duration: '15 - 20 min',
      location: {
        latitude: -1.2921,
        longitude: 36.8219,
      },
      courier: {
        avatar: images.avatar_1,
        name: 'Andrew',
      },
      menu: [
        {
          menuId: 4,
          name: 'Hawaiian Pizza',
          photo: images.hawaiian_pizza,
          description: 'Homemade pizza crust, pizza sauce with pineapple',
          calories: 200,
          price: 1100,
        },
        {
          menuId: 5,
          name: 'Tomato and Basil Pizza',
          photo: images.tomato_pizza,
          description: 'Fresh Tomatoes, Aromatic Basil and melted cheese',
          calories: 350,
          price: 1200,
        },
        {
          menuId: 6,
          name: 'Tomato Pasta',
          photo: images.tomato_pasta,
          description: 'Pasta with fresh tomatoes',
          calories: 100,
          price: 550,
        },
        {
          menuId: 7,
          name: 'Mediterranean Chopped Salad',
          photo: images.chopped_salad,
          description: 'Fresh vegetable salad',
          calories: 30,
          price: 450,
        },
      ],
    },
    {
      id: 3,
      name: 'Rael Hotdogs',
      rating: 4.8,
      categories: [1],
      priceRating: affordable,
      photo: images.hotdog_restaurant,
      duration: '20 - 25 min',
      location: {
        latitude: -1.2921,
        longitude: 36.8219,
      },
      courier: {
        avatar: images.avatar_3,
        name: 'Philip',
      },
      menu: [
        {
          menuId: 8,
          name: 'Kenyan Style Hot Dog',
          photo: images.kenyan_hotdog,
          description: 'All beef hotdogs',
          calories: 120,
          price: 250,
        },
      ],
    },
    {
      id: 4,
      name: 'Eli Rice',
      rating: 4.8,
      categories: [4],
      priceRating: affordable,
      photo: images.rice_restaurant,
      duration: '30 - 45 min',
      location: {
        latitude: -1.2921,
        longitude: 36.8219,
      },
      courier: {
        avatar: images.avatar_6,
        name: 'Brian',
      },
      menu: [
        {
          menuId: 9,
          name: 'Plain White Rice',
          photo: images.white_rice,
          description: 'Delicious plain white rice',
          calories: 50,
          price: 400,
        },
        {
          menuId: 10,
          name: 'Pilau',
          photo: images.pilau,
          description: 'Traditional Swahili Rice',
          calories: 60,
          price: 550,
        },
        {
          menuId: 11,
          name: 'Chinese Rice',
          photo: images.chinese_rice,
          description: 'Soft fried Chinese rice',
          calories: 80,
          price: 550,
        },
      ],
    },
    {
      id: 5,
      name: 'Alex Sushi',
      rating: 4.8,
      categories: [5],
      priceRating: expensive,
      photo: images.sushi_restaurant,
      duration: '10 - 15 min',
      location: {
        latitude: -1.2921,
        longitude: 36.8219,
      },
      courier: {
        avatar: images.avatar_4,
        name: 'Winnie',
      },
      menu: [
        {
          menuId: 12,
          name: 'Sushi sets',
          photo: images.sushi_sets,
          description: 'Fresh salmon, sushi rice and fresh avocado',
          calories: 70,
          price: 700,
        },
      ],
    },
    {
      id: 6,
      name: 'Chacha Drinks',
      rating: 4.8,
      categories: [6],
      priceRating: fairPrice,
      photo: images.drinks_restaurant,
      duration: '10 - 15 min',
      location: {
        latitude: -1.2921,
        longitude: 36.8219,
      },
      courier: {
        avatar: images.avatar_5,
        name: 'Marwa',
      },
      menu: [
        {
          menuId: 13,
          name: 'Cocktail',
          photo: images.cocktail,
          description: 'Gin, Vodka, Whiskey and tonic',
          calories: 10,
          price: 400,
        },
        {
          menuId: 14,
          name: 'Juice',
          photo: images.juice,
          description: 'Freshly squeezed juice',
          calories: 10,
          price: 200,
        },
        {
          menuId: 15,
          name: 'Soda',
          photo: images.soda,
          description: 'Cold refreshing soda',
          calories: 10,
          price: 200,
        },
        {
          menuId: 16,
          name: 'Water',
          photo: images.water,
          description: 'Cold bottled water',
          calories: 10,
          price: 100,
        },
      ],
    },
  ];

  // hooks to handle state
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );

  const onSelectCategory = category => {
    //filter category items(restaurants)
    let restaurantList = restaurantData.filter(a =>
      a.categories.includes(category.id),
    );
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };

  //get category name by id
  const getCategoryNameById = id => {
    let category = categories.filter(a => a.id == id);

    if (category.length > 0) {
      return category[0].name;
    } else {
      return '';
    }
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        {/* left top icon */}
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        {/* middle location text */}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightgray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>{currentLocation.streetName}</Text>
          </View>
        </View>
        {/* right icon */}
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainCategories = () => {
    //individual category item
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          {/* icon container */}
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightgray,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{height: 30, width: 30}}></Image>
          </View>
          {/* category name */}
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body4,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text style={{...FONTS.h1}}>Main</Text>
        <Text style={{...FONTS.h1}}>Categories</Text>

        {/* list of categories horizontally listed */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 2,
          }}></FlatList>
      </View>
    );
  };

  // to render restaurant lists
  const renderRestaurantList = () => {
    // render item
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{marginBottom: SIZES.padding * 2}}
          onPress={() =>
            navigation.navigate('Restaurant', {
              item,
              currentLocation,
            })
          } //navigate to Restaurant screen
        >
          {/*Image*/}
          <View style={{marginBottom: SIZES.padding}}>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
                borderRadius: SIZES.radius,
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow,
              }}>
              <Text style={{...FONTS.h4}}>{item.duration}</Text>
            </View>
          </View>

          {/*restaurant information section*/}
          <Text style={{...FONTS.body2}}>{item.name}</Text>
          <View style={{marginTop: SIZES.padding, flexDirection: 'row'}}>
            {/* rating */}
            <Image
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={{...FONTS.body3}}>{item.rating}</Text>

            {/*categories*/}
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              {item.categories.map(categoryId => {
                return (
                  <View style={{flexDirection: 'row', key: {categoryId}}}>
                    <Text style={{...FONTS.body3}}>
                      {getCategoryNameById(categoryId)}
                    </Text>
                    <Text style={{...FONTS.h3, color: COLORS.darkgray}}>
                      {' '}
                      .{' '}
                    </Text>
                  </View>
                );
              })}

              {/* price */}
              {[500, 300, 1000].map(priceRating => {
                return (
                  <Text
                    key={priceRating}
                    style={{
                      ...FONTS.body3,
                      color:
                        priceRating <= item.priceRating
                          ? COLORS.black
                          : COLORS.darkgray,
                    }}>
                    Ksh.
                  </Text>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        data={restaurants}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}></FlatList>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
