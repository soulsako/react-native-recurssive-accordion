import React from 'react';

import { TouchableOpacity, Text, View, StyleSheet, InteractionManager, Animated } from 'react-native';

class DropDown extends React.PureComponent {

  static animated;
  static defaultProps = {
    backgroundColor: 'transparent',
    titleBackground: 'transparent',
    contentBackground: 'transparent',
    underlineColor: '#d3d3d3',
    optionsBackground: {}
    // visibleImage: require('./assets/arrow-up.png'),
    // invisibleImage: require('./assets/arrow-down.png'),
  };

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      contentVisible: false,
      headerHeight: 0,
      contentHeight: 0, 
    };
  }

  render() {
    return (
      <Animated.View style={{height: this.animated}}>
        <TouchableOpacity activeOpacity={0.5} onPress={this.onPress}>
          <View onLayout={ this.onAnimLayout } style={[styles.title, this.props.selected ? styles.accordion : null, this.props.isSubAccordion ? styles.subAccordion : styles.accordion]}>
            <Text>{this.props.header}</Text>
            {/* Displays arrows if needed. <Image source={this.state.contentVisible ? this.props.visibleImage : this.props.invisibleImage} style={styles.icons}/> */}
          </View>
        </TouchableOpacity>
        {this.props.body !== " " ? <View onLayout={this.onLayout} style={styles.content}>
          <Text>{this.props.body}</Text>
        </View> : null}
      </Animated.View>
    );
  }
  //Set up animation
  runAnimation = () => {
    const initialValue = this.state.contentVisible
      ? this.state.headerHeight + this.state.contentHeight : this.state.headerHeight; // total header height
    const finalValue = this.state.contentVisible
      ? this.state.headerHeight : this.state.contentHeight + this.state.headerHeight; // header + content

    this.setState({
      contentVisible: !this.state.contentVisible,
    });
    this.animated.setValue(initialValue);
    Animated.spring(
      this.animated,
      {
        toValue: finalValue,
      },
    ).start();
  }

  //Runs only once when the component loads
  onAnimLayout = (evt) => {
    //On component mount header height is set to the view height
    const headerHeight = evt.nativeEvent.layout.height; //Get height of header
    if (!this.state.isMounted && !this.state.contentVisible) { // if header is not mounted and content not visible
      this.animated = new Animated.Value(headerHeight); // set this.animated to a object instance and pass headerHeight
      this.setState({
        isMounted: true,
        headerHeight,
      });
      return;
    } else if (!this.state.isMounted) {
      InteractionManager.runAfterInteractions(() => {
        this.animated = new Animated.Value(headerHeight + this.state.contentHeight);
      });
    }
    this.setState({ headerHeight, isMounted: true});
  }

  //Runs muliple times when the header arrow is clicked
  onLayout = (evt) => {
    const contentHeight = evt.nativeEvent.layout.height;
    this.setState({ contentHeight });
  }

  onPress = () => {
    this.runAnimation();
    this.props.onAccordionClicked(!this.props.selected);
  }

}

export default DropDown;

const styles = StyleSheet.create({
  // icons: {
  //   width: 15,
  //   height: 15,
  //   position: 'absolute',
  //   right: 10,
  // },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff', 
    paddingHorizontal: 10, 
    paddingVertical: 15
  },
  title: {
    paddingVertical: 15, 
    paddingHorizontal: 10, 
    justifyContent: 'center', 
    borderBottomColor: '#111',
    borderBottomWidth: StyleSheet.hairlineWidth, 

  }, 
  subAccordion: {
    backgroundColor: '#fff'
  }, 
  accordion: {
    backgroundColor: '#ddd', 
  }, 
  textColor:  {
    color: '#fff'
  }
});