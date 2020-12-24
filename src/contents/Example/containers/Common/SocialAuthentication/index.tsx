/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import { Container, Header, Body, QuickView, Button, ModalButton, Text, Input } from '@components';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import { ColorPicker } from 'react-native-color-picker';
import Color from '@themes/Color';

class SocialAuthentication extends PureComponent<any, any> {
  unsubscribe: any;

  title: any;

  content: any;

  date: any;

  backgroundColor: string;

  addItemModalRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      isSignIn: !!auth().currentUser,
      data: [],
    };
    this.backgroundColor = Color.lightPrimary;
  }

  componentDidMount() {
    this.subscribeDB();
  }

  subscribeDB = () => {
    if (auth().currentUser) {
      this.unsubscribe = firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .collection('notes')
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            const dbItem = change.doc.data();
            this.addItemToState(dbItem);
          });
        });
    } else if (this.unsubscribe) this.unsubscribe();
  };

  addItemToState = (dbItem: any) => {
    const { data } = this.state;
    if (dbItem && !_.isEmpty(dbItem)) {
      dbItem.createdAt = dbItem.createdAt.toDate();
      dbItem.date = dbItem.date.toDate();
      const newData = [
        dbItem,
        ...data,
      ];
      this.setState({ data: newData });
    }
  };

  onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);

    // const snapshot = await firestore()
    //   .collection('users')
    //   .doc(auth().currentUser?.uid)
    //   .collection('notes')
    //   .get();
    // snapshot.forEach((doc) => this.addItemToState(doc.data()));
    this.subscribeDB();

    this.setState({ isSignIn: !!auth().currentUser });
  };

  signOut = async () => {
    await auth().signOut();
    this.setState({ isSignIn: !!auth().currentUser, data: [] });
    if (this.unsubscribe) this.unsubscribe();
  };

  renderSignInButton = () => {
    GoogleSignin.configure();
    const { isSignIn } = this.state;
    if (!isSignIn) {
      return (
        <GoogleSigninButton
          style={{ width: 192, height: 48, alignSelf: 'center', marginTop: 10 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.onGoogleButtonPress}
        />
      );
    }
    return (
      <QuickView row justifyContent="space-around" marginTop={10}>
        <ModalButton
          ref={(ref: any) => { this.addItemModalRef = ref; }}
          title="Add Note"
          modalProps={{ type: 'fullscreen' }}
          width={150}
          primary
          titleColor="white"
        >
          {this.addItemModal()}
        </ModalButton>
        <Button
          primary
          titleColor="white"
          center
          width={150}
          title="Sign Out"
          titlePaddingHorizontal={20}
          onPress={() => this.signOut()}
        />
      </QuickView>
    );
  };

  addItemToFirebase = (item: {title: string, content: string, date: any, createdAt?: any, backgroundColor?: string}) => {
    item.date = firestore.Timestamp.fromDate(item.date || new Date());
    item.createdAt = firestore.Timestamp.fromDate(new Date());
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .collection('notes')
      .add(item);
    this.addItemModalRef.close();
  };

  addItemModal = () => (
    <Container>
      <Header backIcon title="Add Note" />
      <Body>
        <QuickView>
          <Input
            ref={(ref: any) => { this.title = ref; }}
            label="Title"
            center
            textCenter
            marginVertical={10}
            fontSize={18}
            color="#1980f9"
          />
          <Input
            ref={(ref: any) => { this.content = ref; }}
            label="Content"
            center
            textCenter
            marginVertical={10}
            fontSize={18}
            color="#1980f9"
          />
          <Input
            ref={(ref: any) => { this.date = ref; }}
            dateTimePickerProps={{ mode: 'time' }}
            center
            textCenter
          />
          <QuickView height={300}>
            <ColorPicker
              onColorSelected={(color) => { this.backgroundColor = color; }}
              style={{ flex: 1 }}
            />
          </QuickView>
          <Button
            primary
            title="Add note"
            titleColor="white"
            onPress={() => {
              this.addItemToFirebase({
                title: this.title.getText(),
                content: this.content.getText(),
                date: this.date.getDate(),
                backgroundColor: this.backgroundColor,
              });
            }}
          />
        </QuickView>
      </Body>

    </Container>
  );

  renderItem=({ item }: {item: { title: string, content: string, date: Date, createdAt: Date, backgroundColor: string}}) => (
    <QuickView marginVertical={10}>
      <Text>{_.upperFirst(moment(item.createdAt).fromNow())}</Text>
      <QuickView backgroundColor={item.backgroundColor} row padding={20} borderRadius={10} marginTop={5}>
        <QuickView>
          <Text color="white">{moment(item.date).format('hh:mm')}</Text>
          <Text center color="white">{moment(item.date).format('A')}</Text>
        </QuickView>
        <QuickView marginLeft={20}>
          <Text bold color="white">{item.title}</Text>
          <Text color="white">{item.content}</Text>
        </QuickView>
      </QuickView>
    </QuickView>
  );

  renderContent = () => {
    const { isSignIn, data } = this.state;
    if (isSignIn) {
      return (
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(data, index) => `${index.toString()}`}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <Container>
        <Header backIcon title="Authentication" shadow switchTheme />
        <Body>
          {this.renderSignInButton()}
          {this.renderContent()}
        </Body>
      </Container>
    );
  }
}

export default SocialAuthentication;
