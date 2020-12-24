/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Api from '@utils/api';
import { Text, QuickView, Avatar, Container, Body, Loading, } from '@components';
import { NavigationService } from '@utils/navigation';
import Color from '@themes/Color';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Selector from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import moment from 'moment';
import _ from 'lodash';
import { Global } from '@utils/appHelper';
import { IMessage } from '@components/Common/Chat';
import Config from 'react-native-config';
import chatStack from '../routes';

interface State {
  refreshing: boolean;
  loading: boolean;
  data: any;
  error: any;
  lastActiveAt: any;
  newMessageUserIds: Array<string>;
}

class ChatListScreen extends Component<any, State> {
  sender_id: string;

  constructor(props: any) {
    super(props);

    this.state = {
      refreshing: false,
      loading: true,
      data: [],
      error: null,
      lastActiveAt: null,
      newMessageUserIds: [],
    };
    this.sender_id = '';
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await this.getUsers();
    const { data } = this.state;
    const lastActiveAt: any = {};
    if (!_.isEmpty(data)) {
      data.forEach((e: any) => {
        lastActiveAt[e._id] = e.lastActiveAt;
      });
      this.setState({ lastActiveAt });
    }
    // Trigger Active Status
    Global.socket.on('trigger_active', (data: {_id: string | number, lastActiveAt: Date | null}) => {
      this.onTriggerActive(data);
    });
    // Listen New Message
    Global.socket.on('chat', this.onReceivedMessage);
  }

  getUsers = async () => {
    const { loginSelectorData } = this.props;
    try {
      // Get sender id
      const senderResponse = await Api.get(`${Config.SOCKET_URL}/users?filter={"phone": "${loginSelectorData.data.phone}"}`);
      this.sender_id = senderResponse.data[0]?._id;

      // Get users
      const results = await Api.get(`${Config.SOCKET_URL}/users`);
      this.setState({ refreshing: false, loading: false, data: results.data });
    } catch (error) {
      this.setState({ refreshing: false, loading: false, error });
    }
  };

  onTriggerActive = (data: {_id: string | number, lastActiveAt: Date | null}) => {
    const { lastActiveAt } = this.state;
    lastActiveAt[data._id] = data.lastActiveAt;
    this.setState({ lastActiveAt });
  };

  onReceivedMessage = (message: IMessage) => {
    const { newMessageUserIds } = this.state;
    const id: string = message.user._id.toString();
    if (newMessageUserIds.indexOf(id) === -1) {
      newMessageUserIds.push(id);
    }
    this.setState({ newMessageUserIds });
  };

  renderItem = ({ item }:{item: any}) => {
    const { loginSelectorData } = this.props;
    const { lastActiveAt, newMessageUserIds } = this.state;

    item.sender_id = this.sender_id;
    if (loginSelectorData.data.phone && loginSelectorData.data.phone !== item.phone) {
      const hasNewMessage = newMessageUserIds.indexOf(item._id) !== -1;
      return (
        <QuickView
          marginVertical={5}
          marginHorizontal={2}
          paddingVertical={10}
          borderRadius={20}
          onPress={() => {
            // Notify partner that the Current User is in the conversation
            Global.socket.emit('chatting', {
              user: {
                _id: item._id
              }
            });
            // Remove Current User from Unread Message List
            const result = _.filter(newMessageUserIds, (n: string) => n !== item._id.toString());
            this.setState({ newMessageUserIds: result });
            NavigationService.navigate(chatStack.chatDetail, { item });
          }}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: 'white',
          }}
          row
          paddingHorizontal={15}
          justifyContent="space-between"
        >
          <QuickView row>
            <Avatar
              icon={{
                name: 'account', type: 'material-community', color: 'black',
              }}
              iconStyle={{ fontSize: 30 }}
              backgroundColor={Color.lightPrimary}
              rounded
              size="medium"
              marginLeft={10}
            />
            <QuickView marginLeft={10} alignSelf="center">
              <Text bold={hasNewMessage}>
                {item.name}
              </Text>
              {
              lastActiveAt && lastActiveAt[item._id] ? (
                <Text type="subtitle" bold={hasNewMessage}>
                  Online
                  {' '}
                  {moment(lastActiveAt[item._id]).fromNow()}
                </Text>
              )
                : <Text primary>Đang hoạt động</Text>
            }
            </QuickView>
          </QuickView>
          {
            hasNewMessage ? (
              <QuickView alignSelf="center">
                <Icon name="circle" color="#00B3FF" size={15} />
              </QuickView>
            ) : null
          }
        </QuickView>
      );
    }
    return null;
  };

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getUsers();
  };

  render() {
    const { data, loading, refreshing } = this.state;
    return (
      <Container>
        <Body height="100%">
          {loading ? <Loading />
            : (
              <QuickView>
                {/* <SearchBar
                  placeholder="Type Here..."
                  autoCorrect={false}
                  platform="android"
                  containerStyle={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                /> */}
                <FlatList
                  style={{ marginTop: 10 }}
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={this.renderItem}
                  keyExtractor={(_item, index) => index.toString()}
                  refreshControl={(
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={this.handleRefresh}
                    />
                  )}
                />
              </QuickView>
            )}
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginSelectorData: Selector.getObject(loginSelector, state),
});

export default connect(mapStateToProps, null)(ChatListScreen);
