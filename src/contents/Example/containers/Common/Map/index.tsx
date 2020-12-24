/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, MapView, Text,
} from '@components';
import { View, Image, TouchableOpacity } from 'react-native';
import Helper from '@utils/helper';
import { customMarker, bottomItemData } from './mock/data';

interface State {
  events: any;
}
let id = 0;

class MapExample extends PureComponent<any, State> {
  mapRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      events: [],
    };
  }

  renderBottomItem = ({ item }: {item: any}) => (
    <View style={{ backgroundColor: '#FFF' }}>
      <Image
        source={item.data.image}
        style={{
          width: '100%',
          height: '60%',
          alignSelf: 'center',
        }}
        resizeMode="cover"
      />
      <View style={{
        padding: 10,
      }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            // marginTop: 5,
            fontWeight: 'bold',
          }}
        >
          {item.data.title}

        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: '#444',
          }}
        >
          {item.data.description}
        </Text>
        <View style={{
          alignItems: 'center',
          marginTop: 5,
        }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={[{
              width: '100%',
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 3,
            }, {
              borderColor: '#FF6347',
              borderWidth: 1,
            }]}
          >
            <Text style={[{
              fontSize: 14,
              fontWeight: 'bold',
            }, {
              color: '#FF6347',
            }]}
            >
              Order Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  makeEvent = (e: any, name: string) => ({
    // eslint-disable-next-line no-plusplus
    id: id++,
    name,
    data: e.nativeEvent ? e.nativeEvent : e,
  });

  onRegionChangeComplete = async () => {
    const mapBoundaries = await this.mapRef.getMapBoundaries();
    console.log('mapBoundaries', mapBoundaries);
  };

  recordEvent(name: string) {
    return async (e: any) => {
      if (e.persist) {
        e.persist(); // Avoids warnings relating to https://fb.me/react-event-pooling
      }
      this.setState((prevState: State) => ({
        events: [this.makeEvent(e, name), ...prevState.events.slice(0, 10)],
      }));
      const { events } = this.state;
      console.log('this.state.events', events);
    };
  }

  render() {
    const bottomMarkerData = Helper.selectDeepFields(bottomItemData, 'price');
    bottomMarkerData.forEach((item: string, index: number) => {
      bottomMarkerData[index] = `${Helper.numberWithCommas(parseInt(item, 10))} \u20AB`;
    });
    return (
      <Container>
        <Header backIcon title="Map" shadow switchTheme />
        <Body scrollable fullWidth>
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>Default Map (No GPS Required)</Text>
            <MapView
              defaultMarkerProps={{
                title: 'This is a title',
                description: 'This is a description',
              }}
              needGPS={false}
            />
          </QuickView>
          <QuickView marginVertical={8} center>
            <Text type="title" center bold marginVertical={5}>{'Map with custom \n initialRegion & events'}</Text>
            <MapView
              ref={(ref: any) => { this.mapRef = ref; }}
              defaultMarkerProps={{
                title: 'This is a title',
                description: 'This is a description',
                onPress: this.recordEvent('Marker::onPress'),
                onSelect: this.recordEvent('Marker::onSelect'),
                onDeselect: this.recordEvent('Marker::onDeselect'),
                onCalloutPress: this.recordEvent('Marker::onCalloutPress'),
              }}
              onRegionChange={this.recordEvent('Map::onRegionChange')}
              onRegionChangeComplete={async () => {
                this.recordEvent(
                  'Map::onRegionChangeComplete',
                );
                await this.onRegionChangeComplete();
              }}
              onPress={this.recordEvent('Map::onPress')}
              onPanDrag={this.recordEvent('Map::onPanDrag')}
              onLongPress={this.recordEvent('Map::onLongPress')}
              onMarkerPress={this.recordEvent('Map::onMarkerPress')}
              onMarkerSelect={this.recordEvent('Map::onMarkerSelect')}
              onMarkerDeselect={this.recordEvent('Map::onMarkerDeselect')}
              onCalloutPress={this.recordEvent('Map::onCalloutPress')}
              initialRegion={{
                latitude: 20.53,
                longitude: 105.44,
              }}
            />
          </QuickView>
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>Map with custom marker image</Text>
            <MapView defaultMarkerProps={{
              title: 'This is a title',
              description: 'This is a description',
              image: require('@assets/images/flag-blue.png'),
            }}
            />
          </QuickView>
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>Google Map</Text>
            <MapView
              google
              defaultMarkerProps={{
                title: 'This is a title',
                description: 'This is a description',
              }}
            />
          </QuickView>
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>Static Map</Text>
            <MapView staticMap showDefaultMarker={false} />
          </QuickView>
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>Map with Custom Marker List</Text>
            <MapView
              showsMyLocationButton={false}
              showDefaultMarker={false}
              markers={customMarker}
            />
          </QuickView>
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>Hybrid Map</Text>
            <MapView mapType="hybrid" />
          </QuickView>
          {/* Error on Android */}
          {/* <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>MutedStandard Map</Text>
            <MapView mapType="mutedStandard" />
          </QuickView> */}
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>Satellite Map</Text>
            <MapView mapType="satellite" />
          </QuickView>
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>Terrain Map with Custom Style</Text>
            <MapView mapType="terrain" style={{ borderRadius: 20 }} />
          </QuickView>
          <QuickView marginVertical={8} center>
            <Text type="title" bold marginVertical={5}>FullScreen Static Map</Text>
            <MapView
              fullScreen
              // staticMap
              showDefaultMarker={false}
              bottomItemData={bottomItemData}
              bottomMarkerData={bottomMarkerData}
              markerType="tag"
              // google
              // animationEnable={false}
              markerActiveBackgroundColor="#74A7A8"
              renderBottomItem={this.renderBottomItem}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default MapExample;
