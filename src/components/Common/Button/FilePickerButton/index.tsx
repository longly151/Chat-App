import React, { Component } from 'react';
import DocumentPicker, { DocumentPickerOptions, DocumentPickerResponse } from 'react-native-document-picker';
import { GestureResponderEvent, FlatList } from 'react-native';
import AppHelper, { IFile } from '@utils/appHelper';
import _ from 'lodash';
import QuickView from '@components/Common/View/QuickView';
import Button, { ButtonProps } from '../DefaultButton';
import FileViewButton from '../FileViewButton';

interface FilePickerButtonProps extends ButtonProps {
  filePickerProps: DocumentPickerOptions<any>;
  multiple?: boolean;
  folderPrefix?: string;
  uploadCallback?: (file: IFile[]) => Promise<any> | any;
  pickSuccess?: (file: DocumentPickerResponse[]) => Promise<any> | any;
  handleException?: (e: any) => any;
}

interface State {
  loading: boolean;
  data: IFile[];
  folderPrefix?: string;
}

class FilePickerButton extends Component<FilePickerButtonProps, State> {
  static defaultProps = {
    filePickerProps: {
      type: [
        DocumentPicker.types.doc,
        DocumentPicker.types.docx,
        DocumentPicker.types.pdf,
        DocumentPicker.types.csv,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
        DocumentPicker.types.zip,
        DocumentPicker.types.audio,
        DocumentPicker.types.video,
      ]
    },
    folderPrefix: 'files',
  };

  constructor(props: FilePickerButtonProps) {
    super(props);

    this.state = {
      loading: false,
      data: []
      // data: [
      //   {
      //     name: 'img0005-2020103108093228.JPG',
      //     uri: 'https://airtravel.s3.us-east-2.amazonaws.com/images/img0005-2020103108093228.JPG',
      //     type: 'image/jpeg',
      //     updatedAt: new Date()
      //   },
      //   {
      //     name: 'social-media.pdf',
      //     uri: 'https://airtravel.s3.us-east-2.amazonaws.com/files/social-media-2020110101592791.pdf',
      //     type: 'application/pdf',
      //     updatedAt: new Date()
      //   },
      //   {
      //     name: 'bai-1-a-a.docx',
      //     uri: 'https://airtravel.s3.us-east-2.amazonaws.com/files/bai-1-a-a-2020110102254107.docx',
      //     type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      //     updatedAt: new Date()
      //   }
      // ]
    };
  }

  uploadFiles = async (files: DocumentPickerResponse[]) => {
    const { folderPrefix, uploadCallback } = this.props;
    this.setState({ loading: true });

    // Get uploadUrls
    const uploadUrlBody: any = [];
    files.forEach((item: DocumentPickerResponse) => {
      uploadUrlBody.push({
        type: item.type,
        fileName: item.name,
        folderPrefix,
      });
    });
    const uploadUrls = await AppHelper.getUploadUrls(uploadUrlBody);

    await Promise.all(files.map(async (file: DocumentPickerResponse, index: number) => {
      const data = {
        name: file.name,
        type: file.type,
        uri: file.fileCopyUri // or file.uri,
      };

      /**
       * uploadToS3
       */
      await setTimeout(() => {}, 100);
      try {
        await AppHelper.uploadToS3(uploadUrls[index].presignedUrl, data);
        this.setState((previousState: any) => ({
          data: [...previousState.data, {
            name: data.name,
            mime: data.type,
            size: file.size,
            path: data.uri,
            sourceUrl: file.uri,
            remoteUrl: uploadUrls[index].returnUrl,
            updatedAt: new Date()
          }]
        }));
      } catch (error) {
        this.handleException(error);
      }
    }));
    this.setState({ loading: false });
    const { data } = this.state;
    if (uploadCallback) await uploadCallback(data);
  };

  pickSuccess = async (res: DocumentPickerResponse[]) => {
    // Custom Action...
    const { pickSuccess } = this.props;
    if (pickSuccess) pickSuccess(res);
    const { pickSuccess: pickSuccessProp } = this.props;
    if (pickSuccessProp) pickSuccessProp(res);

    await this.uploadFiles(res);
  };

  handleException = (e: any) => {
    // Custom Action...
    const { handleException } = this.props;
    if (handleException) handleException(e);
  };

  pickFile = async (event: GestureResponderEvent) => {
    const { filePickerProps, multiple, onPress } = this.props;
    const { type } = filePickerProps;

    // Pick a single file
    if (!multiple) {
      try {
        const res = await DocumentPicker.pick({ type });
        this.pickSuccess([res]);
      } catch (err) {
        this.handleException(err);
      }
    } else {
      // Pick multiple files
      try {
        const results = await DocumentPicker.pickMultiple({ type });
        this.pickSuccess(results);
      } catch (err) {
        this.handleException(err);
      }
    }

    if (onPress) onPress(event);
  };

  getData = () => {
    const { data } = this.state;
    return data;
  };

  removeFileItem = (file: IFile) => {
    const { data } = this.state;
    this.setState({
      data: data.filter((item: IFile) => item.remoteUrl !== file.remoteUrl)
    });
  };

  renderFileItem = ({ item }: {item: IFile}) => (
    <QuickView marginHorizontal={5}>
      <FileViewButton
        data={item}
        horizontal
      />
      <Button
        icon={{ name: 'close', size: 20 }}
        width={30}
        titlePaddingHorizontal={0}
        titlePaddingVertical={0}
        circle
        backgroundColor="#E6E9F0"
        containerStyle={{ position: 'absolute', right: 10, top: 10 }}
        onPress={() => this.removeFileItem(item)}
      />
    </QuickView>
  );

  render() {
    const { ...otherProps } = this.props;
    const { data, loading } = this.state;
    if (_.isEmpty(data)) {
      return (
        <Button
          {...otherProps}
          onPress={this.pickFile}
          loading={loading}
        />
      );
    }

    return (
      <FlatList
        data={data}
        renderItem={this.renderFileItem}
        horizontal
        contentContainerStyle={{ marginHorizontal: -5 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

export default FilePickerButton;
