import React, { Fragment } from 'react';
import DropDown from './DropDown';
// Recursive component
export default class AccordionsList extends React.PureComponent {


  handleAccordionClicked = (selectedAccordionId) => {

    const { selectedAccordions } = this.props; 
    // is currently selected
    if(selectedAccordions[selectedAccordionId]){
    
      // remove selected key from Accordions list
      delete selectedAccordions[selectedAccordionId]; 
    } else { // is not currently selected
  
      // Add selected key to AccordionsList

      selectedAccordions[selectedAccordionId] = {} 
    }
    // call onChange function given by parent
    this.props.onChange(selectedAccordions) 

  }

  handleSubAccordionsListChange = (accordionId, subSelections) => {

    const { selectedAccordions } = this.props; 

    selectedAccordions[accordionId] = subSelections;
    // call onChange function given by parent
    this.props.onChange(selectedAccordions);

  }

  render() {
    const  { accordions, selectedAccordions, isSubAccordion } = this.props;

    return (
      <Fragment>
        {accordions.map(accordion => (
          <Fragment key={accordion.id}>
              <DropDown
                selected={selectedAccordions[accordion.id]} // Undefined on initial mount
                onAccordionClicked={() => this.handleAccordionClicked(accordion.id)}
                header={accordion.header}
                body={accordion.body}
                isSubAccordion={isSubAccordion}
              />
            {/* Base Case not rendered unitll an Accordion is clicked*/}
            { (accordion.subAccordians.length > 0 && selectedAccordions[accordion.id]) &&
              <AccordionsList
                accordions={accordion.subAccordians}
                selectedAccordions={selectedAccordions[accordion.id]} 
                onChange={(subSelections) => this.handleSubAccordionsListChange(accordion.id, subSelections)}
                isSubAccordion={true} 
              />
            }
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

