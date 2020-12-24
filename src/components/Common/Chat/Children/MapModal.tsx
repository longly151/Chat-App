import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import { NavigationService } from '@utils/navigation';
import Geolocation from '@react-native-community/geolocation';
import Container from '../../View/Container';
import Header from '../../Header';
import MapView from '../../MapView';
import Button from '../../Button/DefaultButton';

interface Props {
  addLocationMessage: (data: { latitude: number, longitude: number } | null) => any;
}
interface State {
  markerCoordinate: { latitude: number, longitude: number } | null;
}

class MapModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      markerCoordinate: null
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (info) => {
        this.setState({
          markerCoordinate: {
            longitude: info.coords.longitude,
            latitude: info.coords.latitude,
          },
        });
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log('error', error);
      },
    );
  }

  onMapPress = (e: any) => {
    this.setState({ markerCoordinate: e.nativeEvent.coordinate });
  };

  render() {
    const { markerCoordinate } = this.state;
    const { addLocationMessage } = this.props;
    return (
      <Container>
        <Header
          backIcon
          title="Pick Location"
          rightComponent={(
            <Button
              title="OK"
              height={50}
              clear
              bold
              fontSize={20}
              titleColor="#FFF"
              onPress={() => {
                addLocationMessage(markerCoordinate);
                NavigationService.goBack();
              }}
            />
          )}
        />
        <MapView
          fullScreen
          onPress={this.onMapPress}
          showDefaultMarker={false}
        >
          {markerCoordinate ? <Marker coordinate={markerCoordinate} /> : null}
        </MapView>
      </Container>
    );
  }
}

export default MapModal;
