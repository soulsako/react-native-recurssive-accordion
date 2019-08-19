import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from './Colors';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      modifiedHeight: 0
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

  // setAccordionHeight = (event) => {
  //   const accordionHeight = event.nativeEvent.layout.height;
  //   this.setState(() => {
  //     return {
  //       accordionHeight
  //     }
  //   })
  // }

  render(){

    const { accordion } = this.props;

    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity 
          activeOpacity={ 0.8 } 
          onPress={this.props.onClick} 
          style={[styles.btn, {backgroundColor: accordion.expanded ? Colors.selected : null}]}>
          <Text style={[styles.btnText, {color: accordion.expanded ? '#fff' : Colors.selected}]}>
            {accordion.header}
          </Text>
        </TouchableOpacity>
        {accordion.body !== " " ? <View style={[styles.body, {height: this.state.modifiedHeight}]}>
          <Text style={styles.bodyText}>{accordion.body}</Text>
        </View> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  btnContainer: {
    borderWidth: 1,
    borderColor: Colors.btnContainerBorder, 
    marginVertical: 5, 
    borderRadius: 3
  }, 
  btn: {
    padding: 10, 
    backgroundColor: Colors.btnBackground
  }, 
  btnText: {
    textAlign: 'center', 
    color: Colors.btnText, 
    fontSize: 16
  }, 
  body: {
    overflow: 'hidden',
    backgroundColor: Colors.bodyBackground
  }, 
  bodyText: {
    fontSize: 14, 
    color: Colors.bodyText, 
    padding: 10
  }

});
