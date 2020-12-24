/* eslint-disable max-len */
import React from 'react';
import {
  Calendar as NativeCalendar,
  CalendarList as NativeCalendarList,
  CalendarProps as NativeCalendarProps,
  DateObject,
  PeriodMarking,
  MultiPeriodMarking,
  DotMarking,
  MultiDotMarking,
  CalendarMarkingProps,
  CalendarListBaseProps,
} from 'react-native-calendars';
import { languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import { LanguageEnum } from '@contents/Config/redux/slice';
import { withTheme, ThemeProps } from 'react-native-elements';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

interface MarkedDateCustomStyles {
  container?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
}

interface CustomMarking {
  customStyles: MarkedDateCustomStyles;
}

export type CalendarProps = Omit<NativeCalendarProps, 'markingType' | 'markedDates'> & CalendarMarkingProps & CalendarListBaseProps & {
  markingType?: 'custom' | 'simple' | 'multi-dot' | 'multi-period' | 'period';
  markedDates?: {
    // eslint-disable-next-line max-len
    [date: string]: CustomMarking | DotMarking | MultiDotMarking | MultiPeriodMarking | PeriodMarking;
  };
  multipleSelect?: boolean;
  calendarList?: boolean;
  language?: LanguageEnum;
  theme?: any;
};

interface State {
  selected: string[];
  startDate: string;
  endDate: string;
}
class Calendar extends React.PureComponent<CalendarProps, State> {
  static defaultProps = {
  };

  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      selected: [],
      startDate: '',
      endDate: '',
    };
  }

  getSelectedDate = (): Date | Date[] | null => {
    const { selected } = this.state;
    const { multipleSelect } = this.props;
    if (!_.isEmpty(selected)) {
      const results: any = [];
      selected.forEach((e: any) => {
        results.push(new Date(e));
      });
      if (!multipleSelect) {
        return results[0];
      }
      return results;
    }
    return null;
  };

  getSelectedPeriod = (): {startDate: Date, endDate: Date} | null => {
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      return {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };
    }
    return null;
  };

  customOnDayPress = (date: DateObject) => {
    const { markingType, multipleSelect, onDayPress } = this.props;
    const { selected, startDate, endDate } = this.state;
    switch (markingType) {
      case 'period':
        // Deselect
        if (date.dateString === startDate) {
          this.setState({ startDate: '' }, () => { if (onDayPress) onDayPress(date); });
          return;
        }
        if (date.dateString === endDate) {
          this.setState({ endDate: '' }, () => { if (onDayPress) onDayPress(date); });
          return;
        }

        // Select
        if (
          (!startDate)
          || (startDate && moment(date.dateString).toDate() < moment(startDate).toDate())
        ) {
          this.setState({ startDate: date.dateString }, () => { if (onDayPress) onDayPress(date); });
        } else {
          this.setState({ endDate: date.dateString }, () => { if (onDayPress) onDayPress(date); });
        }
        break;
      default:
        if (_.includes(selected, date.dateString)) {
          // Deselect
          const newSelected = _.filter(selected, (o) => o !== date.dateString);
          this.setState({ selected: newSelected }, () => { if (onDayPress) onDayPress(date); });
        } else if (multipleSelect) {
          // Select
          const newSelected = [...selected, date.dateString];
          this.setState({ selected: newSelected }, () => { if (onDayPress) onDayPress(date); });
        } else {
          this.setState({ selected: [date.dateString] }, () => { if (onDayPress) onDayPress(date); });
        }
    }
  };

  render() {
    const {
      markingType,
      calendarList,
      theme,
      language,
      ...otherProps
    } = this.props;
    const { selected, startDate, endDate } = this.state;

    /**
     * markingType
     */
    const markedDates: any = {};
    switch (markingType) {
      case 'period':
        if (startDate) {
          markedDates[startDate] = {
            startingDay: true,
            color: theme.Calendar.selectedDayBackgroundColor,
            textColor: theme.Calendar.selectedDayTextColor,
          };
        }
        if (endDate) {
          markedDates[endDate] = {
            endingDay: true,
            color: theme.Calendar.selectedDayBackgroundColor,
            textColor: theme.Calendar.selectedDayTextColor,
          };
        }
        if (startDate && endDate) {
          const dateBetween = [];
          let currentDate = moment(startDate).add(1, 'days');
          const stopDate = moment(endDate);
          while (currentDate < stopDate) {
            dateBetween.push(moment(currentDate).format('YYYY-MM-DD'));
            currentDate = currentDate.add(1, 'days');
          }
          dateBetween.forEach((e: string) => {
            markedDates[e] = {
              color: theme.Calendar.selectedDayBackgroundColor,
              textColor: theme.Calendar.selectedDayTextColor,
            };
          });
        }
        break;
      default:
        selected.forEach((e: string) => {
          markedDates[e] = {
            selected: true,
          };
        });
    }
    const Component: any = calendarList ? NativeCalendarList : NativeCalendar;
    return (
      <Component
        key={`${language}_${theme.key}`}
        markedDates={markedDates}
        {...otherProps}
        markingType={markingType}
        onDayPress={this.customOnDayPress}
        theme={theme.Calendar}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  withTheme(Calendar as unknown as React.ComponentType<CalendarProps & ThemeProps<any>>)
);
