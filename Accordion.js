import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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

  render(){

    const { header, body, image, expanded } = this.props.accordion;
    const { modifiedHeight } = this.state;
    const bodyHeight = { height: modifiedHeight}
    let renderBody = null;
    if(body !== " " && image.source !== "" && image.source !== " "){
      renderBody = (
        <View style={[styles.body,bodyHeight]}>
          <Text style={styles.bodyText}>{body}</Text>
          <Image source={{uri: image.source}} style={styles.image}/>
        </View>
      );
    }else if(body === " " && image.source !== "" && image.source !== " "){
      renderBody = (
        <View style={[styles.body, bodyHeight]}>
         <Image source={{uri: image.source}} style={styles.image}/>
        </View>
      );
    }else if(body !== " " && image.source === "" && image.source !== " "){
      renderBody = (
        <View style={[styles.body, bodyHeight]}>
          <Text style={styles.bodyText}>{body}</Text>
        </View>
      );
    }

    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity 
          activeOpacity={ 0.8 } 
          onPress={this.props.onClick} 
          style={[styles.btn, {backgroundColor: expanded ? Colors.selected : null}]}>
          <Text style={[styles.btnText, {color: expanded ? '#fff' : Colors.selected}]}>
            {header}
          </Text>
        </TouchableOpacity>
        {renderBody}
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
    alignItems: 'center'
  }, 
  bodyText: {
    fontSize: 14, 
    color: Colors.bodyText, 
    padding: 10
  }, 
  image: {
    width: 300, 
    height: 110
  }

});
