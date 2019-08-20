import React, { Component, Fragment } from 'react';
import { LayoutAnimation, Platform, UIManager, ScrollView, Dimensions } from 'react-native';
import Accordion from './Accordion';

export default class AccordionsList extends Component {

  constructor(props){
    super(props);

    //Required for use of LayoutAnimation on android device
    if(Platform.OS === 'android'){
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      accordions: props.accordions
    }
  }

  changeLayout = (index) => {

    //Custom Animation
    const customAnimation = {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      }
    }

    //Animation 
    LayoutAnimation.configureNext(customAnimation);

      //Collpase all accordions
      const array = this.state.accordions.map((item, i) => {
        if(index === i) return {...item}
        const newItem = {...item}
        newItem.expanded = false;
        return newItem;
      });

    //toggle currently selected accordion
    array[index].expanded = !array[index].expanded;

    this.setState(() => {
      return {
        accordions: array
      }
    });

  }

  render(){

    const { accordions } = this.state;
    // const { height } = Dimensions.get('window');
    
    return (
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        {accordions.map((accordion, index) => (
            <Fragment key={ index } >
              <Accordion 
                onClick={() => this.changeLayout(index)} 
                accordion={ accordion } />
                {/*Base case. Reccursively mounts this component again*/}
                {(accordion.subAccordions.length > 0 && accordion['expanded']) &&
                  <AccordionsList 
                    accordions={accordion.subAccordions} 
                    />
                }
            </Fragment>
          ))}
      </ScrollView>
    );
  }
}


