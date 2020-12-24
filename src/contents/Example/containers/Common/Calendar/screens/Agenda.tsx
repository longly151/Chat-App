import React, { Component } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: {}
    };
  }

  loadItems = (day: any) => {
    setTimeout(() => {
      const { items } = this.state;
      for (let i = -15; i < 85; i += 1) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j += 1) {
            items[strTime].push({
              name: `Item for ${strTime} #${j}`,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems: any = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  };

  renderItem = (item?: any) => (
    <TouchableOpacity
      style={[{
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      }, { height: item.height }]}
      onPress={() => Alert.alert(item.name)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  renderEmptyDate = () => (
    <View style={{
      height: 15,
      flex: 1,
      paddingTop: 30
    }}
    >
      <Text>This is empty date!</Text>
    </View>
  );

  rowHasChanged = (r1: any, r2: any) => r1.name !== r2.name;

  timeToString= (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  render() {
    const { items } = this.state;
    return (
      <Agenda
        items={items}
        loadItemsForMonth={this.loadItems}
        selected="2017-05-16"
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        style={{ elevation: 2 }}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }
}
