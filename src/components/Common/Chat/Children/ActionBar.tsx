import React, { PureComponent } from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { IImage } from '@utils/appHelper';
import AppView from '@utils/appView';
import i18next from 'i18next';
import QuickView from '../../View/QuickView';
import Picker from '../../Picker';
import EditableImage from '../../Image/EditableImage';
import ModalButton from '../../Button/ModalButton';
import MapModal from './MapModal';

interface Props {
  onSend: (messages: any) => any;
  setImageLoading: (loading: boolean) => any;
}

class ActionBar extends PureComponent<Props> {
  actionModalRef: any;

  editableImageRef: any;

  mapView: any;

  uploadCallback = ((data: IImage[]) => {
    const { onSend, setImageLoading } = this.props;
    onSend([{ image: data[0].remoteUrl }]);
    setImageLoading(false);
  });

  pickSuccess = () => {
    const { setImageLoading } = this.props;
    this.actionModalRef.pickerModal?.close();
    setImageLoading(true);
  };

  handleException = () => {
    this.actionModalRef.pickerModal?.close();
  };

  onPickerValuePress = (value: any, index: any) => {
    switch (index) {
      case 0:
        this.editableImageRef.openCamera();
        break;
      case 1:
        this.editableImageRef.openGallery();
        break;
      default:
        this.mapView.open();
        this.actionModalRef.pickerModal?.close();
        break;
    }
  };

  addLocationMessage = (coordinate: { latitude: number, longitude: number } | null) => {
    const { onSend } = this.props;
    onSend([{ location: coordinate }]);
  };

  render() {
    return (
      <QuickView
        row
        height={44}
      >
        <ModalButton
          ref={(ref: any) => { this.mapView = ref; }}
          title="Full Screen Modal"
          modalProps={{ type: 'fullscreen' }}
          invisible
        >
          <MapModal addLocationMessage={this.addLocationMessage} />
        </ModalButton>
        <Picker
          ref={(ref: any) => { this.actionModalRef = ref; }}
          values={[`📷 ${i18next.t('component:editable_image:take_photo')}`, `🏞 ${i18next.t('component:editable_image:select_from_album')}`, `📍 ${i18next.t('component:map:pick_location')}`]}
          modalHeight={140 + AppView.safeAreaInsets.bottom}
          // modal
          invisible
          buttonChildren={(
            <Icon containerStyle={{ marginRight: -5, marginLeft: 5, marginTop: 5 }} type="material" name="add-circle-outline" size={30} color="grey" />
          )}
          // placeholder="Chọn hành động"
          onValuePress={this.onPickerValuePress}
        />
        <EditableImage
          ref={(ref: any) => { this.editableImageRef = ref; }}
          buttonChildren={<View />}
          folderPrefix="chat"
          uploadCallback={this.uploadCallback}
          pickSuccess={this.pickSuccess}
          handleException={this.handleException}
          width={500}
        />
      </QuickView>
    );
  }
}

export default ActionBar;
