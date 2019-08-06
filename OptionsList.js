import React, { Fragment } from 'react';
import DropDown from './DropDown';
// Recursive component
export default class OptionsList extends React.PureComponent {

  handleOptionClicked = (selectedOptionId) => {

    const { selectedOptions } = this.props; 
    // is currently selected
    if(selectedOptions[selectedOptionId]){
      //Run animation to remove the content 
      // remove selected key from options list
      delete selectedOptions[selectedOptionId]; 
    } else { // is not currently selected
      //Run animation to add the content
      // Add selected key to optionsList
      //Clear previously selcted options
      // selectedOptions = {};
      selectedOptions[selectedOptionId] = {} 
    }
    // call onChange function given by parent
    this.props.onChange(selectedOptions) 

  }

  
  handleSubOptionsListChange = (optionId, subSelections) => {

    const { selectedOptions } = this.props; 

    selectedOptions[optionId] = subSelections;
    // call onChange function given by parent
    this.props.onChange(selectedOptions);

  }
  
  render() {
    const  { options, selectedOptions } = this.props;

    return (
      <Fragment>
        {options.map(option => (
          <Fragment key={option.id}>
              <DropDown
                selected={selectedOptions[option.id]} // Undefined on initial mount
                onOptionClicked={() => this.handleOptionClicked(option.id)}
                title={option.title}
                content={option.body}
                />
            {/* Base Case */}
            { (option.subOptions.length > 0 && selectedOptions[option.id]) &&
              <OptionsList
                options={option.subOptions}
                selectedOptions={selectedOptions[option.id]} // pass empty object 
                onChange={(subSelections) => this.handleSubOptionsListChange(option.id, subSelections)} 
              />
            }
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

