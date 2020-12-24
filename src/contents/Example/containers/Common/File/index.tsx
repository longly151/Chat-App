/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import { Container, QuickView, Header, Body, Text, FilePickerButton, FileViewButton } from '@components';

import { IFile } from '@utils/appHelper';
import fileData from './mock/fileData';

class FileExample extends PureComponent {
  uploadCallback = (url: IFile[]) => console.log('New File Upload Callback: ', url);

  renderFileItem = () => fileData.map((item: any, index: number) => (
    <FileViewButton
      data={item}
      key={index.toString()}
      // horizontal
    />
  ));

  render() {
    return (
      <Container>
        <Header backIcon title="File" shadow switchTheme />
        <Body scrollable>
          <QuickView marginTop={15}>
            <Text type="header">Editable File</Text>
            <FilePickerButton
              title="Pick a File"
              folderPrefix="files"
              uploadCallback={this.uploadCallback}
            />
            <FilePickerButton
              title="Pick multiple files"
              folderPrefix="files"
              multiple
              uploadCallback={this.uploadCallback}
            />
          </QuickView>
          <QuickView style={{ marginVertical: 15 }}>
            <Text type="header">File View Button</Text>
            {this.renderFileItem()}
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default FileExample;
