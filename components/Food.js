/**
 * Created by Mak on 26/6/17.
 */
import React from 'react';
import { Header, Avatar } from 'react-native-elements';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as foodActionCreators from '../redux/actions/food';

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
  render() {
    const {props} = this;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        <Avatar
          xlarge
          rounded
          source={{uri: props.selected.image}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
    )
  }
}