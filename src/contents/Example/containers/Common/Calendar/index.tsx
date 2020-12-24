import React, { PureComponent } from 'react';
import {
  QuickView, Text, Container, Header, Body, Calendar, withBottomSheet, Button
} from '@components';
import AppView from '@utils/appView';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { WithBottomSheetProps } from '@utils/hocHelper';
import ExpandableCalendar from './screens/ExpandableCalendar';
import AgendaScreen from './screens/Agenda';

class CalendarExample extends PureComponent<WithBottomSheetProps> {
  calendarSingle: any;

  calendarMultiple: any;

  calendarPeriod: any;

  showVerticalCalendar = () => {
    const { open, setModalContent } = this.props;
    if (setModalContent) {
      setModalContent(
        <Calendar
          calendarList
          current="2020-06-10"
          pastScrollRange={24}
          futureScrollRange={24}
          // renderHeader={(date) => {
          //   const header = date.toString();
          //   const [month, year] = header.split(' ');
          //   const textStyle: any = {
          //     fontSize: 18,
          //     fontWeight: 'bold',
          //     paddingTop: 10,
          //     paddingBottom: 10,
          //     color: '#5E60CE',
          //     paddingRight: 5
          //   };

          //   return (
          //     <QuickView
          //       style={{
          //         flexDirection: 'row',
          //         width: '100%',
          //         justifyContent: 'space-between',
          //         marginTop: 10,
          //         marginBottom: 10
          //       }}
          //     >
          //       <Text marginLeft={5} style={{ ...textStyle }}>{`${month}`}</Text>
          //       <Text marginRight={5} style={{ ...textStyle }}>{year}</Text>
          //     </QuickView>
          //   );
          // }}
          // theme={{
          //   'stylesheet.calendar.header': {
          //     dayHeader: {
          //       fontWeight: '600',
          //       color: '#48BFE3'
          //     }
          //   },
          //   'stylesheet.day.basic': {
          //     today: {
          //       borderColor: '#48BFE3',
          //       borderWidth: 0.8
          //     },
          //     todayText: {
          //       color: '#5390D9',
          //       fontWeight: '800'
          //     }
          //   }
          // }}
        />
      );
    }
    if (open) open();
  };

  showHorizontalCalendar = () => {
    const { open, setModalContent } = this.props;
    if (setModalContent) {
      setModalContent(
        <BottomSheetView style={{ backgroundColor: 'white' }}>
          <Calendar
            calendarList
            pastScrollRange={24}
            futureScrollRange={24}
            horizontal
            pagingEnabled
          />
        </BottomSheetView>
      );
    }
    if (open) open();
  };

  showExpandableCalendar = () => {
    const { open, setModalContent } = this.props;
    if (setModalContent) {
      setModalContent(
        <ExpandableCalendar />
      );
    }
    if (open) open();
  };

  showAgenda = () => {
    const { open, setModalContent } = this.props;
    if (setModalContent) {
      setModalContent(
        <AgendaScreen />
      );
    }
    if (open) open();
  };

  render() {
    return (
      <Container>
        <Header backIcon title="CalendarExample" shadow switchTheme />
        <Body scrollable fullWidth>
          <QuickView marginTop={15}>
            <Button title="Vertical Calendar List" marginHorizontal={AppView.bodyPaddingHorizontal} onPress={() => this.showVerticalCalendar()} />
            <Button title="Horizontal Calendar List" marginHorizontal={AppView.bodyPaddingHorizontal} onPress={() => this.showHorizontalCalendar()} />
            <Button title="Expendable Calendar" marginHorizontal={AppView.bodyPaddingHorizontal} onPress={() => this.showExpandableCalendar()} />
            <Button title="Agenda Calendar" marginHorizontal={AppView.bodyPaddingHorizontal} onPress={() => this.showAgenda()} />
          </QuickView>
          <QuickView>
            <Text type="title" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Calendar with selectable date</Text>
            <Calendar ref={(ref: any) => { this.calendarSingle = ref; }} />
            <Button
              title="Get Selected Date"
              marginHorizontal={AppView.bodyPaddingHorizontal}
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log('Selected Date: ', this.calendarSingle.getSelectedDate());
              }}
            />
            <Text type="title" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Calendar with multiple selectable date</Text>
            <Calendar ref={(ref: any) => { this.calendarMultiple = ref; }} multipleSelect />
            <Button
              title="Get Selected Date"
              marginHorizontal={AppView.bodyPaddingHorizontal}
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log('Selected Date: ', this.calendarMultiple.getSelectedDate());
              }}
            />
            <Text type="title" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Calendar with selectable period</Text>
            <Calendar ref={(ref: any) => { this.calendarPeriod = ref; }} markingType="period" />
            <Button
              title="Get Selected Period"
              marginHorizontal={AppView.bodyPaddingHorizontal}
              onPress={() => {
                // eslint-disable-next-line no-console
                console.log('Period: ', this.calendarPeriod.getSelectedPeriod());
              }}
            />
            <Text type="title" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Calendar with week numbers</Text>
            <Calendar showWeekNumbers />
            <Text type="title" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Calendar with marked dates and hidden arrows</Text>
            <Calendar
              displayLoadingIndicator
              current="2012-05-16"
              minDate="2012-05-10"
              maxDate="2012-05-29"
              markingType="custom"
              markedDates={{
                '2012-05-23': { selected: true, marked: true, disableTouchEvent: true },
                '2012-05-24': { selected: true, marked: true, dotColor: 'red' },
                '2012-05-25': { marked: true, dotColor: 'red' },
                '2012-05-26': { marked: true },
                '2012-05-27': { disabled: true, activeOpacity: 0, disableTouchEvent: false },
                '2012-05-28': {
                  customStyles: {
                    container: {
                      backgroundColor: 'white',
                      elevation: 2
                    },
                    text: {
                      color: 'red'
                    }
                  }
                },
                '2012-05-29': {
                  selected: true
                },
                '2012-05-30': {
                  customStyles: {
                    container: {
                      backgroundColor: 'red',
                      elevation: 4
                    },
                    text: {
                      color: 'white'
                    }
                  }
                },
                '2012-05-10': {
                  customStyles: {
                    container: {
                      backgroundColor: 'green'
                    },
                    text: {
                      color: 'white'
                    }
                  }
                },
                '2012-05-11': {
                  customStyles: {
                    container: {
                      backgroundColor: 'black',
                      elevation: 2
                    },
                    text: {
                      color: 'yellow'
                    }
                  }
                },
                '2012-05-12': {
                  disabled: true
                },
                '2012-05-15': {
                  customStyles: {
                    text: {
                      color: 'black',
                      fontWeight: 'bold'
                    }
                  }
                },
                '2012-05-18': {
                  customStyles: {
                    container: {
                      backgroundColor: 'pink',
                      elevation: 4,
                      borderColor: 'purple',
                      borderWidth: 5
                    },
                    text: {
                      marginTop: 3,
                      fontSize: 11,
                      color: 'black'
                    }
                  }
                },
                '2012-05-20': {
                  customStyles: {
                    container: {
                      backgroundColor: 'orange',
                      borderRadius: 0
                    }
                  }
                }
              }}
              hideArrows
            />
            <Text type="title" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Calendar with period marking and dot marking</Text>
            <Calendar
              current="2012-05-16"
              minDate="2012-05-01"
              markingType="period"
              markedDates={{
                '2012-05-15': { marked: true, dotColor: '#50cebb' },
                '2012-05-16': { marked: true, dotColor: '#50cebb' },
                '2012-05-21': { startingDay: true, color: '#50cebb', textColor: 'white' },
                '2012-05-22': {
                  color: '#70d7c7',
                  // customTextStyle: {
                  //   color: '#FFFAAA',
                  //   fontWeight: '700'
                  // }
                },
                '2012-05-23': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
                '2012-05-24': { color: '#70d7c7', textColor: 'white' },
                '2012-05-25': {
                  endingDay: true,
                  color: '#50cebb',
                  textColor: 'white',
                  // customContainerStyle: {
                  //   borderTopRightRadius: 5,
                  //   borderBottomRightRadius: 5
                  // }
                },
              }}
            />
            <Text type="title" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Calendar with multi-dot marking</Text>
            <Calendar
              current="2012-05-16"
              markingType="multi-dot"
              markedDates={{
                '2012-05-08': {
                  selected: true,
                  dots: [
                    { key: 'vacation', color: 'blue', selectedDotColor: 'red' },
                    { key: 'massage', color: 'red', selectedDotColor: 'white' }
                  ]
                },
                '2012-05-09': {
                  disabled: true,
                  dots: [
                    { key: 'vacation', color: 'green', selectedDotColor: 'red' },
                    { key: 'massage', color: 'red', selectedDotColor: 'green' }
                  ]
                }
              }}
            />
            <Text type="title" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Calendar with multi-period marking</Text>
            <Calendar
              current="2012-05-16"
              markingType="multi-period"
              markedDates={{
                '2012-05-16': {
                  periods: [
                    { startingDay: true, endingDay: false, color: 'green' },
                    { startingDay: true, endingDay: false, color: 'orange' }
                  ]
                },
                '2012-05-17': {
                  periods: [
                    { startingDay: false, endingDay: true, color: 'green' },
                    { startingDay: false, endingDay: true, color: 'orange' },
                    { startingDay: true, endingDay: false, color: 'pink' }
                  ]
                },
                '2012-05-18': {
                  periods: [
                    { startingDay: true, endingDay: true, color: 'orange' },
                    { color: 'transparent' },
                    { startingDay: false, endingDay: false, color: 'pink' }
                  ]
                }
              }}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withBottomSheet(
  {
    snapPoints: ['40%', '90%']
  }
)(CalendarExample);
