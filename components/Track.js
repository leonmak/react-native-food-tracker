/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as foodActionCreators from '../redux/actions/food';
import { closestExpiryDate, expiredIn } from '../utils/food';
import { List, ListItem } from "react-native-elements";
import { goToTab } from '../redux/router';
import moment from 'moment';


function mapStateToProps(state) {
  return {
    isFetching: state.food.isFetching,
    isLoaded: state.food.isLoaded,
    foods: state.food.data,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(foodActionCreators, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Track extends React.Component {
  componentDidMount() {
    this.props.getFoods();
  }

  _getSubtitle(food) {
    const expiry = closestExpiryDate(food.name);
    const diff = expiry.diff(moment(), "days")
    return diff === 0
      ? `Earliest expiry date is today!`
      : moment().isBefore(expiry)
      ? `Earliest expiry date in ${diff} days`
      : `Earliest expiry date was ${-1 * diff} days ago`
  }

  _getTitleStyle(food) {
    const expired = expiredIn(food.name, 0);
    const expiredWeek = expiredIn(food.name, 7);
    const color = expired || expiredWeek ? `white` : `black`;
    return { color }
  }

  _getStyle(food) {
    const expired = expiredIn(food.name, 0);
    const expiredWeek = expiredIn(food.name, 7);
    const bgColor = expired ? `coral` : expiredWeek ? `lightcoral` : `white`;
    const style = {
      backgroundColor: bgColor,
      padding: 9
    }
    return style;
  }

  _getFoodPopup = (food) => {
    return () => {
      this.props.selectFood(food);
      this.props.navigator.push('food', {food});
    }
  }

  static route = {
    navigationBar: {
      title: "Food Uploaded",
    }
  }

  render() {
    const { props } = this;
    return (
      <List>
        {props.isFetching
          ? <View style={styles.container}>
              <Text>{"Fetching food"}</Text>
            </View>
          : props.foods.length > 0
            ? props.foods.map((food, idx) => (
              <ListItem
                roundAvatar
                key={idx}
                avatar={{uri: food.image}}
                title={food.name}
                titleStyle={this._getTitleStyle(food)}
                onPress={this._getFoodPopup(food)}
                style={this._getStyle(food)}
                subtitle={this._getSubtitle(food)}
                subtitleStyle={this._getTitleStyle(food)}
              />
            ))
            : <View style={styles.container}>
                <Text>{"No food uploaded yet."}</Text>
                <Button title="Upload Receipt" onPress={() => goToTab('upload', props.navigation)} />
              </View>
        }
      </List>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});