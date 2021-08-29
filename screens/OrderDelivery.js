import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {SIZES, COLORS, FONTS} from '../constants/theme';
import icons from '../constants/icons';
import images from '../constants/images';
import GOOGLE_API_KEY from '../constants/maps';

const OrderDelivery = ({route, navigation}) => {
  const mapView = useRef();

  const [restaurant, setRestaurant] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [fromLocation, setFromLocation] = useState('null');
  const [toLocation, setToLocation] = useState('null');
  const [region, setRegion] = useState('null');

  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let {restaurant, currentLocation} = route.params; //get this from the restaurant screen

    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    //setting state
    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  const calculateAngle = coordinates => {
    let startLat = coordinates[0]['latitude'];
    let startLng = coordinates[0]['longitude'];
    let endLat = coordinates[1]['latitude'];
    let endLng = coordinates[1]['longitude'];
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 100) / Math.PI;
  };

  //zoom buttons functionality
  const zoomIn = () => {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitude: region.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  };

  const zoomOut = () => {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitude: region.longitudeDelta * 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  };

  //render map
  const renderMap = () => {
    //destination marker
    const destinationMarker = () => {
      return (
        <Marker coordinate={toLocation}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Image
                source={icons.pin}
                style={{width: 25, height: 25, tintColor: COLORS.white}}
              />
            </View>
          </View>
        </Marker>
      );
    };

    //car icon
    const renderCarIcon = () => {
      return (
        <Marker
          coordinate={fromLocation}
          anchor={{x: 0.5, y: 0.5}}
          flat={true}
          rotation={angle}>
          <Image source={icons.car} style={{width: 40, height: 40}}></Image>
        </Marker>
      );
    };

    return (
      <View style={{flex: 1}}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{flex: 1}}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={result => {
              setDuration(result.duration);

              if (isReady) {
                //fit routes into the map
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                  },
                });
                //reposition the car
                let nextLoc = {
                  latitude: result.coordinate[0]['latitude'],
                  longitude: result.coordinate[0]['longitude'],
                };

                //to give car direction
                if (result.coordinates.length >= 2) {
                  let angle = calculateAngle(result.coordinates);
                  setAngle(angle);
                }

                setFromLocation(nextLoc);
                setIsReady(true);
              }
            }}
          />
          {destinationMarker()}
          {renderCarIcon()}
        </MapView>
      </View>
    );
  };

  //destination header
  const renderDestinationHeader = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          {/*red pin*/}
          <Image
            source={icons.red_pin}
            style={{width: 30, height: 30, marginRight: SIZES.padding}}
          />
          <View style={{flex: 1}}>
            <Text style={{...FONTS.body3}}>{streetName}</Text>
          </View>
          <Text style={{...FONTS.body3}}>{Math.ceil(duration)} mins</Text>
        </View>
      </View>
    );
  };

  //delivery information
  const renderDeliveryInfo = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/*avatar*/}
            <Image
              source={restaurant?.courier.avatar}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <View style={{flex: 1, marginLeft: SIZES.padding}}>
              {/*name and rating*/}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{...FONTS.h4}}>{restaurant?.courier.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={icons.star}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: COLORS.primary,
                      marginRight: SIZES.padding,
                    }}
                  />
                  <Text style={{...FONTS.body3}}>{restaurant?.rating}</Text>
                </View>
              </View>

              <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
                {restaurant?.name}
              </Text>
            </View>
          </View>
          {/*buttons*/}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('Home')}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                flex: 1,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}>
              <Text style={{...FONTS.h4, color: COLORS.white}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  //zoom buttons
  const renderZoomButtons = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.35,
          right: SIZES.padding * 2,
          width: 60,
          height: 130,
          justifyContent: 'space-between',
        }}>
        {/*zoom in*/}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          //onPress={zoomIn()}
        >
          <Text style={{...FONTS.body1}}>+</Text>
        </TouchableOpacity>
        {/*zoom out*/}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          //onPress={zoomOut()}
        >
          <Text style={{...FONTS.body1}}>-</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderDeliveryInfo()}
      {renderZoomButtons()}
    </View>
  );
};

export default OrderDelivery;
