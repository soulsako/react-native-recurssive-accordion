import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccordionsList from './AccordionsList';
import Colors from './Colors';

export default class App extends React.PureComponent {

  constructor(props){
    super(props);
    const accordions = [
      {
        title: "Men",
        expanded: false,
        subAccordions: [
          {
            title: "Clothing",
            expanded: false,
            subAccordions: [
              {
                title: "Adidas",
                expanded: false,
                body: "This dropdown displays size for Adidas men's clothing.",
                subAccordions: []
              }, 
              {
                title: "Nike",
                expanded: false,
                body: "This dropdown displays size for men's Nike clothing.",
                subAccordions: []
              }, 
              {
                title: "Puma",
                expanded: false,
                body: "This dropdown displays size for men's Puma clothing.",
                subAccordions: []
              }, 
              {
                title: "Adidas",
                expanded: false,
                body: "This dropdown displays size for Adidas men's clothing.",
                subAccordions: []
              }, 
              {
                title: "Nike",
                expanded: false,
                body: "This dropdown displays size for men's Nike clothing.",
                subAccordions: []
              }, 
              {
                title: "Puma",
                expanded: false,
                body: "This dropdown displays size for men's Puma clothing.",
                subAccordions: []
              }, 
              {
                title: "Adidas",
                expanded: false,
                body: "This dropdown displays size for Adidas men's clothing.",
                subAccordions: []
              }, 
              {
                title: "Nike",
                expanded: false,
                body: "This dropdown displays size for men's Nike clothing.",
                subAccordions: []
              }, 
              {
                title: "Puma",
                expanded: false,
                body: "This dropdown displays size for men's Puma clothing.",
                subAccordions: []
              },
              {
                title: "Puma",
                expanded: false,
                body: "This dropdown displays size for men's Puma clothing.",
                subAccordions: []
              }, 
              {
                title: "Adidas",
                expanded: false,
                body: "This dropdown displays size for Adidas men's clothing.",
                subAccordions: []
              }, 
              {
                title: "Nike",
                expanded: false,
                body: "This dropdown displays size for men's Nike clothing.",
                subAccordions: []
              }, 
              {
                title: "Puma",
                expanded: false,
                body: "This dropdown displays size for men's Puma clothing.",
                subAccordions: []
              }
          ]
          },
          {
            title: "Footwear",
            expanded: false,
            body: " This dropdown displays size for men's footwear.",
            subAccordions: []
          },
          {
            title: "Accessories",
            expanded: false,
            body: " This dropdown displays size for men's accessories",
            subAccordions: []
          }
        ]
      }, 
      {
        title: "Women",
        expanded: false,
        subAccordions: [
          {
            title: "Women Clothing",
            expanded: false,
            subAccordions: [
              {
                title: "Adidas",
                expanded: false,
                body: "This dropdown displays size for Adidas men's clothing.",
                subAccordions: []
              }, 
              {
                title: "Nike",
                expanded: false,
                body: "This dropdown displays size for men's Nike clothing.",
                subAccordions: []
              }, 
              {
                title: "Puma",
                expanded: false,
                body: "This dropdown displays size for men's Puma clothing.",
                subAccordions: []
              }
          ]
          },
          {
            title: "Women Footwear",
            expanded: false,
            body: " This dropdown displays size for men's footwear.",
            subAccordions: []
          },
          {
            title: "Women Accessories",
            expanded: false,
            body: " This dropdown displays size for men's accessories",
            subAccordions: []
          }
        ]
      }
    ];

    this.state = {
      accordions
    }
  }


  render(){
  
    return (
    <View style={styles.container}>
      <Text style={styles.heading}>Size Guide</Text>
      <View style={styles.list}>
        <AccordionsList 
          accordions={[...this.state.accordions]}
        />
      </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    paddingTop: 40, 
  }, 
  heading: {
    fontWeight: 'bold', 
    alignSelf: 'center', 
    padding: 20,
    color: Colors.heading
  }, 
  list: {
    borderTopWidth: 0.4, 
    borderColor: Colors.appBorder
  }
});
