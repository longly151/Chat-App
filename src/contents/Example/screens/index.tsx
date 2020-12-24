import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, ListItem, } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationService } from '@utils/navigation';
import {
  QuickView, Body, Container, Avatar, Text
} from '@components';
import Color from '@themes/Color';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import _ from 'lodash';
import { exampleList } from '../list';

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#cbd2d9',
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#FD6B78',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
});

interface Props {
  navigation: any;
}

class ExampleList extends PureComponent<Props> {
  render() {
    const list = _.sortBy(exampleList, ['name']);
    return (
      <Container scrollable>
        <QuickView flex={1}>
          <View style={styles.headerContainer}>
            <Icon color="white" name="invert-colors" size={62} />
            <Text style={styles.heading} t="header:example" />
          </View>
          <QuickView row center position="absolute" right={15} top={160}>
            <Icon name="theme-light-dark" type="material-community" style={{ marginRight: 5 }} color={Color.white} />
            <SwitchChangeTheme />
          </QuickView>
        </QuickView>
        <Body paddingVertical={15}>
          {list.map((l: any, i: number) => (
            <ListItem
              key={i.toString()}
              activeOpacity={1}
              linearGradientProps={{
                colors: l.linearGradientColors,
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
              }}
              underlayColor="transparent"
              ViewComponent={LinearGradient as any}
              containerStyle={{
                marginVertical: 8,
                borderRadius: 8,
              }}
              onPress={() => {
                if (l.screen) {
                  NavigationService.navigate(l.screen);
                }
              }}
            >
              <Avatar rounded icon={{ name: l.iconName, size: l.iconSize || 25, type: 'material-community' }} />
              <ListItem.Content>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>
                  {l.name}
                </ListItem.Title>
                {
                  l.subtitle ? (
                    <ListItem.Subtitle style={{ color: 'white' }}>
                      {l.subtitle}
                    </ListItem.Subtitle>
                  ) : null
                }
              </ListItem.Content>
              {l.stack || l.screen ? <ListItem.Chevron color="white" /> : null}
            </ListItem>
          ))}
        </Body>
      </Container>
    );
  }
}

export default ExampleList;
