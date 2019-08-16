import React, { Component, Fragment } from 'react';
import { LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import Accordion from './Accordion';

export default class AccordionsList extends Component {

  constructor(props){
    super(props);

    if(Platform.OS === 'android'){
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      accordions: props.accordions
    }
  }

  changeLayout = (index) => {

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

    LayoutAnimation.configureNext(customAnimation);

    const array = this.state.accordions.map(item => {
      const newItem = {...item}
      newItem.expanded = false;
      // console.log(newItem.title);
      return newItem;
      
    });

    if(array[index].expanded === false){
      array[index].expanded = true;
    }
    this.setState(() => {
      return {
        accordions: array
      }
    });

  }

  render(){

    const { accordions } = this.state;
    
    return (
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        {accordions.map((accordion, index) => (
            <Fragment key={ index } >
              <Accordion 
                onClick={() => this.changeLayout(index)} 
                accordion={ accordion } />
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

