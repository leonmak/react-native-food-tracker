/**
 * Created by Mak on 26/6/17.
 */
import React from 'react';
import { Card, Avatar } from 'react-native-elements';
import { ScrollView, View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as foodActionCreators from '../redux/actions/food';
import { findFoodsByShortname, getExpiryDate } from '../utils/food';
import moment from 'moment';

function mapStateToProps({food}) {
  return {
    selected: food.selected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(foodActionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Food extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `Details about ${params.name}`
      }
    }
  }

  _isDangerous = expiryMoment => expiryMoment && expiryMoment.diff(moment(), 'days') <= 3;

  _getExpiryTextView = (food) => {
    const expiryFreezer = food.freezer.length > 0 && getExpiryDate(food.freezer, food.time);
    const expiryPantry = food.pantry.length > 0 && getExpiryDate(food.pantry, food.time);
    const expiryRefrigerator = food.refrigerator.length > 0 && getExpiryDate(food.refrigerator, food.time);
    const isDangerous = this._isDangerous(expiryFreezer)
      || this._isDangerous(expiryPantry)
      || this._isDangerous(expiryRefrigerator)
    return (
      <Card key={food.name}
            title={food.name}
            titleStyle={getExpiryStyle(isDangerous)}
            containerStyle={{backgroundColor: isDangerous ? `orange` : `white`}}>
        {this._getExpiryDateText(expiryPantry, isDangerous, 'Pantry: ')}
        {this._getExpiryDateText(expiryRefrigerator, isDangerous, 'Fridge: ')}
        {this._getExpiryDateText(expiryFreezer, isDangerous, 'Freezer: ')}
      </Card>
    )
  }

  _getExpiryDateText = (expiryMoment, isDangerous, prefix) => {
    return expiryMoment && <Text
        style={getExpiryStyle(isDangerous)}>
        {prefix} {this._getExpiryDateTextString(expiryMoment)}
        </Text>
  }

  _getExpiryDateTextString = (expiryMoment) => {
    let diff = expiryMoment.diff(moment(), 'days');
    let timeStep = 'days';
    if (diff >= 365) {
      timeStep = 'years';
      diff = Math.round(diff / 365);
    } else if (diff >= 30) {
      timeStep = 'months';
      diff = Math.round(diff / 30);
    }
    const suffix = diff > 0 ? `in ${diff} ${timeStep} time` : diff < 0 ? `${diff} ${timeStep} ago` : `today`;
    return `bad ${suffix}`;
  }

  _getExpiryTextViews = (name) => findFoodsByShortname(name).map(food => this._getExpiryTextView(food));

  render() {
    const {props} = this;
    return (props.selected && <ScrollView >
        <View style={{flex: 1, height: 100, backgroundColor: 'white', alignItems: 'center'}}>
          <Avatar large rounded source={{uri: props.selected.image}}
                  style={{flex: 1}}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7} />
        </View>

          {this._getExpiryTextViews(props.selected.name)}
      </ScrollView>
    )
  }
}

const getExpiryStyle = (isDangerous) => ({
  color: isDangerous ? '#fff' : '#000',
});