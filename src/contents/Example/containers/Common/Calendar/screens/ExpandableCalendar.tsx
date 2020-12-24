import _ from 'lodash';
import React, { Component } from 'react';
import { Alert, View, Text, TouchableOpacity, Button } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { ITEMS } from '../mock/data';

export default class ExpandableCalendarScreen extends Component<any> {
  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  buttonPressed = () => {
    Alert.alert('show more');
  };

  renderEmptyItem = () => (
    <View style={{
      paddingLeft: 20,
      height: 52,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
    }}
    >
      <Text style={{
        color: 'lightgrey',
        fontSize: 14
      }}
      >
        No Events Planned
      </Text>
    </View>
  );

  renderItem = ({ item }: any) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.title)}
        style={{
          padding: 20,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: 'lightgrey',
          flexDirection: 'row'
        }}
      >
        <View>
          <Text style={{
            color: 'black'
          }}
          >
            {item.hour}

          </Text>
          <Text style={{
            color: 'grey',
            fontSize: 12,
            marginTop: 4,
            marginLeft: 4
          }}
          >
            {item.duration}

          </Text>
        </View>
        <Text style={{
          color: 'black',
          marginLeft: 16,
          fontWeight: 'bold',
          fontSize: 16
        }}
        >
          {item.title}

        </Text>
        <View style={{
          flex: 1,
          alignItems: 'flex-end'
        }}
        >
          <Button color="grey" title="Info" onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  };

  getMarkedDates = () => {
    const marked: any = {};
    ITEMS.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  };

  itemPressed = (id: string) => {
    Alert.alert(id);
  };

  render() {
    const { weekView } = this.props;
    return (
      <BottomSheetView style={{ backgroundColor: 'white' }}>
        <CalendarProvider
          date={ITEMS[0].title}
          onDateChanged={this.onDateChanged}
          onMonthChange={this.onMonthChange}
          showTodayButton
          disabledOpacity={0.6}
        >
          {weekView ? (
            <WeekCalendar firstDay={1} markedDates={this.getMarkedDates()} />
          ) : (
            <ExpandableCalendar
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // disableWeekScroll
              disableAllTouchEventsForDisabledDays
              firstDay={1}
            // eslint-disable-next-line max-len
              markedDates={this.getMarkedDates()}
              style={{ elevation: 2 }}
            />
          )}
          <AgendaList
            sections={ITEMS}
            extraData={this.state}
            renderItem={this.renderItem}
            style={{ elevation: 2 }}
          />
        </CalendarProvider>
      </BottomSheetView>
    );
  }
}
