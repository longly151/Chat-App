/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, Picker, Button, Text, Image
} from '@components';
import { withTheme, ThemeProps } from 'react-native-elements';
import Helper from '@utils/helper';
import dataCity from './dataCity';

class PickerExample extends PureComponent {
  private pickerRef: any;

  private pickerModalRef: any;

  render() {
    return (
      <Container>
        <Header backIcon title="Picker" shadow switchTheme />
        <Body scrollable>
          <QuickView center style={{ marginBottom: 15, marginTop: 10 }}>
            <Text type="header">Default Picker</Text>
            <Picker
              labels={['Java', 'Javascript']}
              values={['java', 'js']}
              width={150}
              height={40}
              shadow
              // placeholder="Choose Language"
              selectedValue={1}
              // selectedValue="js"
              ref={(ref: any) => { this.pickerRef = ref; }}
              onValueChange={(value) => {
                console.log('onValueChange: ', value);
              }}
            />
            <Button
              title="Log Value"
              width={150}
              onPress={() => {
                // console.log('pickerRef: ', this.pickerRef);
                console.log('SelectedIndex: ', this.pickerRef.getSelectedIndex());
                console.log('SelectedValue: ', this.pickerRef.getSelectedValue());
                console.log('getText: ', this.pickerRef.getText());
              }}
            />
          </QuickView>
          <QuickView center style={{ marginBottom: 15, marginTop: 10 }}>
            <Text type="header">Modal Picker</Text>
            <Picker
              labels={Helper.selectFields(dataCity, 'name')}
              values={Helper.selectFields(dataCity, 'id')}
              // selectedValue={0}
              width={200}
              height={40}
              shadow
              modal
              placeholder="Chọn tỉnh thành"
              ref={(ref: any) => { this.pickerModalRef = ref; }}
              onValueChange={(value) => {
                console.log('onValueChange: ', value);
              }}
            />
            <Button
              title="Log Value"
              width={150}
              onPress={() => {
                // console.log('pickerModalRef: ', this.pickerModalRef);
                console.log('SelectedIndex: ', this.pickerModalRef.getSelectedIndex());
                console.log('SelectedValue: ', this.pickerModalRef.getSelectedValue());
                console.log('getText: ', this.pickerModalRef.getText());
              }}
            />
          </QuickView>
          <QuickView center style={{ marginBottom: 15, marginTop: 10 }}>
            <Text type="header">Invisible Modal Picker</Text>
            <Picker
              labels={Helper.selectFields(dataCity, 'name')}
              values={Helper.selectFields(dataCity, 'id')}
              width={200}
              height={40}
              shadow
              modal
              invisible
              buttonChildren={(
                <Image
                  source={{
                    uri: 'https://picsum.photos/1000/1000',
                    cache: 'web',
                  }}
                  containerStyle={{ marginVertical: 15 }}
                />
              )}
              placeholder="Chọn tỉnh thành"
              onValueChange={(value) => {
                console.log('onValueChange: ', value);
              }}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withTheme(PickerExample as unknown as React.ComponentType<null & ThemeProps<any>>);
