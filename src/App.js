import { Component } from "react";

import { renderCurrentType, treeToMap, debonce } from "./utils";

import data from './data.json';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: null,
      appLogic: 'browser'
    }

    this.map = treeToMap(data);

    console.log('this.map', this.map)
    // console.log('this.expandedFolders', this.expandedFolders());

    // console.log(Object.entries(this.map)
    //   .filter(([key, value]) => value.includes('look')))
  }


  // expandedFolders = () => { // Variant funkcii s uroka Hillel ispol'zuem: Object.entries, filter, map, flat
  //   return Object.entries(this.map)
  //     .filter(([key, value]) => value.startsWith(this.state.inputValue))
  //     .map(([key]) => this.pathToArr(key))
  //     .flat()
  // }


  expandedFolders = (value) => { // Mou variant funkcii ispol'zyu: ForIn, map, reduce/flat
    console.log('value', value);

    let pathArr = [];

    for (const key in this.map) {
      if (this.map[key].toLowerCase().includes(value)) pathArr.push(key)
    }

    console.log('pathArr', pathArr);

    // Razvertivanie vlogennix massivov v obwem massive pri pomowi Flat()
    return pathArr.map(this.pathToArr).flat();


    // Razvertivanie vlogennix massivov v obwem massive pri pomowi Reduce()

    // return pathArr.map(this.pathToArr).reduce((acc, current) => {
    //   return [...acc, ...current]
    // }, []); 
  }


  pathToArr = (path) => {
    const splitedPath = path.split('/').filter(item => !!item);

    return splitedPath.reduce((acc, currentItem) => {
      const lastItem = acc[acc.length - 1];

      if(lastItem) {
        return [...acc, `${lastItem}/${currentItem}`];
      } else {
        return [...acc, `/${currentItem}`];
      }

    }, [])
  }

  onChangeInput = (event) => {
    console.log(event.target.value);

    if(event.target.value === '') return;

    this.setState({
      inputValue: event.target.value,
      appLogic: 'search'
    })
  }


  render() {
    
    const {inputValue, appLogic} = this.state;

    console.log('this.expandedFolders', this.expandedFolders(inputValue));

    return(

      <>
        <input 
          type="text" 
          placeholder="type..." 
          onChange={debonce(this.onChangeInput, 700)} 
          // value={inputValue}
           />

        <ul>
          {/* {renderCurrentType(data, ['/Common7', '/VC', '/Common7/IDE', '/Common7/Tools', '/VC/bin'])} */}
          {renderCurrentType(data, this.expandedFolders(inputValue), appLogic)}
        </ul>
      </>
      
    );
  }
}

export default App;

// function App() {

//   // console.log(data);

  // return (
  //   <ul>
  //     {renderCurrentType(data, ['/Common7', '/VC', '/Common7/IDE', '/Common7/Tools', '/VC/bin'])}
  //   </ul>
  // );
// }



// ['Common7', 'Common7/IDE', 'Common7/Tools']
