/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { Chat, Header, Loading, Text } from '@components';
import Api from '@utils/api';
import Config from 'react-native-config';

class ChatDetailScreen extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
      roomId: null,
    };
  }

  async componentDidMount() {
    const { route: { params }, navigation } = this.props;
    const item = params?.item;
    try {
      const response = await Api.get(`${Config.SOCKET_URL}/rooms?filter={ "users": { "$all": ["${item._id}", "${item.sender_id}"] } }`);
      this.setState({
        loading: false,
        roomId: response?.data[0]?._id
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { route: { params } } = this.props;
    const { loading, roomId } = this.state;
    const item = params?.item;

    return (
      <>
        <Header backIcon title="ChatDetailScreen" />
        {loading ? <Loading marginTop={10} />
          : (roomId ? (
            <Chat
              chatOnSocket={{
                message: 'chat',
              }}
              partnerJoinOnSocket={{
                message: 'trigger_chatting',
              }}
              partnerTypingOnSocket={{
                message: 'trigger_typing',
              }}
              url={`${Config.SOCKET_URL}/rooms/${roomId}`}
              apiMessageField="messages"
              pagingQueryParam={{
                offset: 'message_offset',
                limit: 'message_limit',
              }}
              sender={{
                _id: item.sender_id,
              }}
              receiver={{
                _id: item._id,
                name: item.name,
                avatar: item.avatar
              }}
            />
          ) : (
            <Text center error marginTop={10}>
              Something went wrong. Please try again later
            </Text>
          ))}
      </>
    );
  }
}

export default ChatDetailScreen;
