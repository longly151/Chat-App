/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, ModalButton, Button, Text, Image, withBottomSheet
} from '@components';
import Modal from 'react-native-modal';
import { withTheme } from 'react-native-elements';
import i18next from 'i18next';
import { ScrollView } from 'react-native';
import { BottomSheetScrollView, BottomSheetFlatList, BottomSheetSectionList } from '@gorhom/bottom-sheet';
import AppView from '@utils/appView';
import { useFocusEffect } from '@react-navigation/native';
import { WithBottomSheetProps } from '@utils/hocHelper';

interface Props extends WithBottomSheetProps {
  theme: any;
}
interface State {
  isVisible: boolean
}
class ModalExample extends PureComponent<Props, State> {
  customChildren: any;

  customBackdrop: any;

  fancyModal: any;

  data: any = [];

  sectionData: any = [];

  constructor(props: any) {
    super(props);

    this.state = {
      isVisible: false
    };

    // this.data
    [50].map((i) => Array(i).fill(i).map(
      (item: any, index: number) => (this.data.push(`Hi 👋 ${index} !`))
    ));

    // this.sectionData
    this.sectionData.push({
      title: 'Ha Noi',
      data: this.data,
    });
    this.sectionData.push({
      title: 'Da Nang',
      data: this.data,
    });
    this.sectionData.push({
      title: 'TP Ho Chi Minh',
      data: this.data,
    });
  }

  // ScrollBottomSheet
  renderScrollBottomSheet = () => {
    const { open, setModalContent, theme } = this.props;
    if (setModalContent) {
      setModalContent(
        <BottomSheetScrollView
          focusHook={useFocusEffect} // For Changing (React Navigation) Screen Focusing
          contentContainerStyle={{
            backgroundColor: theme.colors.primaryBackground,
            paddingBottom: AppView.safeAreaInsets.bottom
          }}
        >
          {
            [50].map((i) => Array(i).fill(i).map(
              (item: any, index: number) => (
                <Text key={index.toString()} center>
                  {`Hi 👋 ${index} !`}
                </Text>
              )
            ))
          }
          <Button
            marginHorizontal={20}
            marginVertical={10}
            title="Apply"
            onPress={() => {
              const { close } = this.props;
              if (close) close();
            }}
          />
        </BottomSheetScrollView>
      );
    }
    if (open) open();
  };

  // FlatListBottomSheet
  renderFlatListItem = ({ item }: any) => (<Text center>{item}</Text>);

  renderFlatListBottomSheet = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { open, setModalContent, theme, setIndicatorBackgroundColor } = this.props;
    // setIndicatorBackgroundColor('orange'); //For Custom Indicator Background Color

    if (setModalContent) {
      setModalContent(
        <BottomSheetFlatList
          data={this.data}
          focusHook={useFocusEffect} // For Changing (React Navigation) Screen Focusing
          contentContainerStyle={{
            backgroundColor: theme.colors.primaryBackground,
            paddingBottom: AppView.safeAreaInsets.bottom
          }}
          renderItem={this.renderFlatListItem}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    if (open) open();
  };

  // SectionListBottomSheet
  renderSectionHeader = ({ section }: any) => {
    const { theme } = this.props;
    return (
      <QuickView
        paddingBottom={6}
        paddingHorizontal={AppView.bodyPaddingHorizontal}
        backgroundColor={theme.colors.primaryBackground}
      >
        <Text style={{ textTransform: 'uppercase' }}>{section.title}</Text>
      </QuickView>
    );
  };

  renderSectionItem = ({ section, index }: any) => (
    <Text key={`${section.title}_index`} center>{section.data[index]}</Text>
  );

  renderSectionListBottomSheet = () => {
    const { open, setModalContent, theme } = this.props;
    if (setModalContent) {
      setModalContent(
        <BottomSheetSectionList
          // stickySectionHeadersEnabled
          stickySectionHeadersEnabled
          sections={this.sectionData}
          focusHook={useFocusEffect} // For Changing (React Navigation) Screen Focusing
          contentContainerStyle={{
            backgroundColor: theme.colors.primaryBackground,
            paddingBottom: AppView.safeAreaInsets.bottom
          }}
          initialNumToRender={20}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderSectionItem}
        />
      );
    }
    if (open) open();
  };

  render() {
    const { isVisible } = this.state;
    const { theme } = this.props;

    return (
      <Container>
        <Header backIcon title="Modal" shadow switchTheme />
        <Body scrollable>
          <QuickView marginTop={10} marginBottom={15}>
            <Text type="header" marginBottom={10}>Modal with Children</Text>
            <Button title="Native Modal" onPress={() => this.setState({ isVisible: !isVisible })} />
            <Modal
              isVisible={isVisible}
              onBackdropPress={() => this.setState({ isVisible: false })}
            >
              <Button title="Native Modal" onPress={() => this.setState({ isVisible: !isVisible })} />
            </Modal>
            <ModalButton
              ref={(ref: any) => { this.customChildren = ref; }}
              title="Modal Button with custom Children"
            >
              <QuickView
                backgroundColor={theme.colors.primaryBackground}
                borderRadius={10}
                padding={30}
                center
              >
                <Text center>Hi 👋!</Text>
                <Button
                  title="Close"
                  marginTop={20}
                  width={100}
                  onPress={() => this.customChildren.close()}
                />
              </QuickView>
            </ModalButton>
          </QuickView>

          <QuickView marginVertical={10}>
            <Text type="header">Self-Closing Modal Button</Text>
            <ModalButton
              title="Notification Modal Button"
              modalProps={{
                title: 'Successful 🚀',
                onOkButtonPress: () => console.log('Successful')
              }}
            />
            <ModalButton
              title="Confirmation Modal Button"
              modalProps={{
                title: i18next.t('auth:login'),
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm')
              }}
            />
          </QuickView>

          <QuickView marginVertical={10}>
            <Text type="header">Custom Modal</Text>
            <ModalButton
              title="Bottom-Half Modal"
              modalProps={{ type: 'bottom-half' }}
            >
              <QuickView
                backgroundColor={theme.colors.primaryBackground}
                padding={30}
                width="100%"
                center
                style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, maxHeight: 300 }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {
                    [20].map((i) => Array(i).fill(i).map(
                      (item: any, index: number) => <Text key={index.toString()} center>Hi 👋!</Text>
                    ))
                  }
                </ScrollView>
              </QuickView>
            </ModalButton>
            <Button title="[ScrollView] Bottom-Sheet Modal" onPress={() => this.renderScrollBottomSheet()} />
            <Button title="[FlatList] Bottom-Sheet Modal" onPress={() => this.renderFlatListBottomSheet()} />
            <Button title="[SectionList] Bottom-Sheet Modal" onPress={() => this.renderSectionListBottomSheet()} />
            <ModalButton
              ref={(ref: any) => { this.customBackdrop = ref; }}
              title="No Backdrop"
              modalProps={{
                title: i18next.t('auth:login'),
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm'),
                hasBackdrop: false,
              }}
            />
            <ModalButton
              ref={(ref: any) => { this.customBackdrop = ref; }}
              title="Custom Backdrop Modal"
              modalProps={{
                title: i18next.t('auth:login'),
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm'),
                customBackdrop: <QuickView backgroundColor="orange" height="100%" onPress={() => this.customBackdrop.close()} />,
              }}
            />
            <ModalButton
              ref={(ref: any) => { this.fancyModal = ref; }}
              title="Fancy Modal"
              modalProps={{
                title: i18next.t('auth:login'),
                type: 'confirmation',
                onOkButtonPress: () => console.log('Confirm'),
                backdropColor: '#B4B3DB',
                backdropOpacity: 0.8,
                animationIn: 'zoomInDown',
                animationOut: 'zoomOutUp',
                animationInTiming: 600,
                animationOutTiming: 600,
                backdropTransitionInTiming: 600,
                backdropTransitionOutTiming: 600,
                swipeDirection: ['up', 'left', 'right', 'down'],
                onSwipeComplete: () => this.fancyModal.close()
              }}
            />
            <ModalButton
              title="Full Screen Modal"
              modalProps={{ type: 'fullscreen' }}
            >
              <Container>
                <Header backIcon title="ExampleScreen" />
                <Body>
                  <QuickView>
                    <Text center>Example Screen</Text>
                  </QuickView>
                </Body>
              </Container>
            </ModalButton>
          </QuickView>
          <QuickView marginVertical={10}>
            <Text type="header">Invisible Modal Button</Text>
            <ModalButton
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
            >
              <QuickView
                backgroundColor={theme.colors.primaryBackground}
                borderRadius={10}
                padding={30}
                width="100%"
                center
              >
                <Text center>Hi 👋!</Text>
              </QuickView>
            </ModalButton>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withBottomSheet(
  // {
  //   snapPoints: ['90%']
  // }
)(withTheme(ModalExample as any));
