/* eslint-disable no-console */
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Marker } from 'react-native-maps';
import { NavigationService } from '@utils/navigation';
import MapView from '../../MapView';
import ModalButton from '../../Button/ModalButton';
import Button from '../../Button/DefaultButton';

const styles = StyleSheet.create({
  container: {},
  mapView: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginTop: -10,
    marginBottom: 5
  },
});

export default class CustomView extends React.Component<{
  currentMessage: any
  containerStyle: any
  mapViewStyle: any
}> {
  static defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {},
  };

  mapModal: any;

  openMap = () => {
    this.mapModal.open();
  };

  renderMap = (triggerPress: boolean = true) => {
    const { currentMessage, mapViewStyle } = this.props;
    return (
      <MapView
        style={triggerPress ? [styles.mapView, mapViewStyle] : {}}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        staticMap={triggerPress}
        fullScreen
        showDefaultMarker={false}
        onPress={() => { if (triggerPress) this.openMap(); }}
      >
        <Marker coordinate={currentMessage.location} />
      </MapView>
    );
  };

  render() {
    const { currentMessage } = this.props;
    if (currentMessage.location) {
      return (
        <>
          {this.renderMap()}
          <ModalButton
            ref={(ref: any) => { this.mapModal = ref; }}
            title="Full Screen Modal"
            modalProps={{ type: 'fullscreen' }}
            invisible
          >
            {this.renderMap(false)}
            <Button
              icon={{ name: 'arrowleft', type: 'antdesign' }}
              backgroundColor="rgba(255, 255, 255, 0.5)"
              circle
              containerStyle={{ position: 'absolute', top: 20, left: 20 }}
              onPress={() => NavigationService.goBack()}
            />
          </ModalButton>
        </>
      );
    }
    return null;
  }
}
