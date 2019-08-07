import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AccordionsList from './AccordionsList';
import Api from './services/api';


//Create the the root component
export default class App extends React.PureComponent {

  static defaultProps = {
    count: {
      current: 0
    }
  };


  state = {
    selectedAccordions: {}, 
    content: null, 
    loading: true
  };

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async () => {

    const content = await Api.http({
      page: 'size-guide'
    });
    
    this.addAccordionIds(content.accordians);
    this.setState({content, loading: false})
  }

  //Give each accordion an id based on its header
  addAccordionIds = (accordions) => {
    this.props.count.current += 1;
    accordions.forEach(accordion => {
      accordion.id = `${accordion.header}-id-${this.props.count.current}`;
      if(accordion.subAccordians && accordion.subAccordians.length > 0){
        this.addAccordionIds(accordion.subAccordians);
      }
    })
  }

  render(){
    const { content, loading } = this.state;
    if(!content || loading) return <Text style={styles.container}>Loading...</Text>;
    const { accordians, pageTitle } = this.state.content;
  
      return (
      <View style={styles.container}>
        <Text style={styles.heading}>{pageTitle}</Text>
        { content && !loading && 
        <ScrollView style={styles.list}>
          <AccordionsList 
            accordions={accordians} //Pass Data
            onChange={(selectedAccordions) => {this.setState({selectedAccordions})}}
            selectedAccordions={{...this.state.selectedAccordions}}
            isSubAccordion={false}
          />
        </ScrollView>
        }
      </View>)
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
