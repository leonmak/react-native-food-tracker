/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import { List, ListItem } from "react-native-elements";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getFoodRef } from '../utils/firebase';

export default class Track extends React.Component {
  state = {
    foods: []
  }

  componentWillMount() {
    this.getFoods();
  }

  getFoods() {
    getFoodRef().once('value', snapshots => {
      if (!snapshots.exists()) {
        return
      }
      const foods = Object.values(snapshots.val()).sort((a, b) => b.time - a.time)
      this.setState({foods});
    })
  }

  _keyExtractor = (item) => item.name;

  _onPressItem = (id) => {

  };

  _renderItem = ({item}) => (
    <ListItem
      id={item.id}
      onPressItem={this._onPressItem}
      title={item.name}
      subtitle={item.time}
    />
  );

  render() {
    return (
      <View>
        {this.state.foods.length > 0
          ? this.state.foods.map((food, idx) => <Text key={idx}>{food.name}</Text>)
          : <Text>HI</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});