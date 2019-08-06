import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import OptionsList from './OptionsList';

//Create dummy data
const options = [
  {
    title: 'Men',
    id: 'men-id',
    subOptions: [
      {
        title: 'Men Clothing', 
        id: 'men-clothing-id', 
        subOptions: [
          {
            title: 'addidas', 
            id: 'men-adidas-clothing-id',
            body: 'This is mens adidas clothing',
            subOptions: []
          }, 
          {
            title: 'asics', 
            id: 'men-asics-clothing-id',
            body: 'This is mens adidas footwear', 
            subOptions: []
          }
        ]
      },
      {
        title: 'Men Footwear', 
        id: 'men-footwear-id', 
        subOptions: [{
          title: 'addidas', 
          id: 'men-adidas-clothing-id',
          body: 'This is mens adidas clothing',
          subOptions: []
        }, 
        {
          title: 'asics', 
          id: 'men-asics-clothing-id',
          body: 'This is mens adidas footwear', 
          subOptions: []
        }]
      }
    ]
  },
  {
    title: 'women',
    id: 'women-id',
    subOptions: [
      {
        title: 'Women Clothing', 
        id: 'women-clothing-id',
        body:'this is women clothing',
        subOptions: [{
          title: 'addidas', 
          id: 'women-adidas-clothing-id',
          body: 'This is mens adidas clothing',
          subOptions: []
        }, 
        {
          title: 'asics', 
          id: 'women-asics-clothing-id',
          body: 'This is mens adidas footwear', 
          subOptions: []
        }]
      }, 
      {
        title: 'Women Footwear', 
        id: 'women-footwear-id',
        body:'this is women clothing',
        subOptions: []
      }, 
      {
        title: 'Women Accessories', 
        id: 'women-accessories-id',
        body:'this is women clothing',
        subOptions: []
      }
    ]
  }
];


//Create the the root component
export default class App extends React.PureComponent {

  state = {
    selectedOptions: {}
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Size Guide</Text>
        <ScrollView>
          <OptionsList 
            options={options} //Pass Data
            onChange={(selectedOptions) => {this.setState({selectedOptions})}}
            selectedOptions={{...this.state.selectedOptions}}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40, 
  }, 
  heading: {
    fontWeight: 'bold', 
    alignSelf: 'center', 
    padding: 20
  }, 
  list: {
    borderTopWidth: 0.4, 
    borderColor: "#111"
  }
});
