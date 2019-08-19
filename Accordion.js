import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from './Colors';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      modifiedHeight: 0, 
      accordionHeight: null
    }

  }

  //Similar to componentWillReciveProps 
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.accordion.expanded) {
      return { modifiedHeight: null } // <- this is setState equivalent
    }
    return { modifiedHeight: 0 }
  }

  //Only render component if the item.expanded prop changed 
  shouldComponentUpdate(nextProps){
    if(nextProps.accordion.expanded !== this.props.accordion.expanded){
      return true;
    }
    return false;
  }

  setAccordionHeight = (event) => {
    const accordionHeight = event.nativeEvent.layout.height;
    this.setState(() => {
      return {
        accordionHeight
      }
    })
  }

  render(){

    const { accordion } = this.props;

    return (
      <View style={styles.btnTextHolder}>
        <TouchableOpacity 
          activeOpacity={ 0.8 } 
          onPress={() => this.props.onClick(this.state.accordionHeight)} 
          style={[styles.btn, {backgroundColor: accordion.expanded ? '#5499C7' : null}]}>
          <Text style={[styles.btnText, {color: accordion.expanded ? '#fff' : "#5499C7"}]}
            onLayout={(event) => this.setAccordionHeight(event)}>
            {accordion.title}
          </Text>
        </TouchableOpacity>
        {accordion.body ? <View style={[styles.body, {height: this.state.modifiedHeight}]}>
          <Text style={styles.text}>{accordion.body}</Text>
        </View> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  btnTextHolder: {
    borderWidth: 1,
    borderColor: '#5499C7', 
    marginVertical: 5, 
    borderRadius: 3
  }, 
  btn: {
    padding: 10, 
    backgroundColor: '#fff'
  }, 
  btnText: {
    textAlign: 'center', 
    color: '#5499C7', 
    fontSize: 16
  },
  text: {
    fontSize: 14, 
    color: '#5499C7', 
    padding: 10
  }, 
  body: {
    overflow: 'hidden',
    backgroundColor: '#EBF5FB'
  }

});
