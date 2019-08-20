import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccordionsList from './AccordionsList';
import Colors from './Colors';
import Api from './api';

export default class App extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {
      accordions: null,
      pageTitle: null,
      loading: true
    }
  }

  componentDidMount(){
    this.fetchPage();
  }

  fetchPage = async () => {

    const content = await Api.http({
      page: 'size-guide'
    });


    const accordions = this.addExpandedField(content.accordians);
    this.setState({
      accordions, 
      loading: false, 
      pageTitle: content.pageTitle
    });
  }

   //Add boolean expanded property to all accordions 
    //Only required untill new release of content editor 
  addExpandedField = (accordions) => {
    accordions.forEach(accordion => {
      accordion.expanded = false;
      if(accordion.subAccordians && accordion.subAccordians.length > 0){
        this.addExpandedField(accordion.subAccordians);
      }
    })
    return accordions;
  }

  render(){

    const { loading, accordions, pageTitle } = this.state;

    if(loading || !accordions) return (<Text>Loading...</Text>);
    return (
    <View style={styles.container}>
      <Text style={styles.heading}>{pageTitle}</Text>
      <View style={styles.list}>
        <AccordionsList 
          accordions={accordions}
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

