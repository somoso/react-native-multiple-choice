# react-native-multiple-choice
A cross-platform (iOS / Android) single and multiple-choice React Native component.

## Install

```sh
yarn add somoso/react-native-multiple-choice
```

## Usage

Here is an overview of the component usage.

Simple list (i.e. list of strings):

```jsx
<MultipleChoice
    options={[
    'Lorem ipsum dolor sit',
    'Lorem ipsum',
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    'Lorem ipsum dolor sit amet, consetetur',
    'Lorem ipsum dolor'
    ]}
    selectedOptions={['Lorem ipsum']}
    maxSelectedOptions={2}
    onSelection={(option)=>alert(option + ' was selected!')}
/>
```

For list of objects:

```jsx
<MultipleChoice
    options={[
        {item: 'Lorem ipsum dolor sit'},
        {item: 'Lorem ipsum'},
        {item: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'},
        {item: 'Lorem ipsum dolor sit amet, consetetur'},
        {item: 'Lorem ipsum dolor'}
    ]}
    findIndexProp="item"
    selectedOptions={[{item: 'Lorem ipsum'}]}
    maxSelectedOptions={2}
    onSelection={(option)=>alert(option.item + ' was selected!')}
/>
```

## Props

* `style - {}` custom style of the list
* `optionStyle - {}` custom style of the option element
* `options - []` required array of options
* `selectedOptions - []` optional array of initially selected options
* `selectedOptionsList - function(optionList){}` optional callback , returns a list of selected options
* `maxSelectedOptions - int` optional maximum number of selectable options
* `onSelection - function(option){}` option selection callback
* `renderIndicator - function(option)` should return a selected/deselected indicator node, default: check mark image
* `renderSeparator - function(option)` should return a separator node that is displayed between the options, default: gray line
* `renderText - function(option)` should return a text node, default: text node
* `renderRow - function(option)` should return a option view
* `disabled - bool` if set to true component is disabled and can't be interacted with
* `findIndexProp` if set, it will treat the list as a list of objects, and display the value matching the key in the object

