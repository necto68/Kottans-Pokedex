import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import ContentFilter from 'material-ui/lib/svg-icons/content/filter-list';

import CircularProgress from 'material-ui/lib/circular-progress';


export default class App extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
	      types: [],
	    };
		this.styles = {
			
		};
	}

	handleChangeMultiple(event, types){
		this.props.setFilters(types);
	    this.setState({
	      types
	    });
  	};

	render(){
		
		return (
			<IconMenu
          iconButtonElement={<IconButton><ContentFilter color={'white'}/></IconButton>}
          onChange={this.handleChangeMultiple.bind(this)}
          value={this.state.types}
          multiple={true}
          closeOnItemTouchTap={false}
        >
        {(!this.props.types.length) ? <center><CircularProgress size={0.5}/></center> : null}
        {this.props.types.map((type, index)=>
        	<MenuItem key={index} value={type} primaryText={type[0].toUpperCase()+type.substr(1)} />
        )}
        </IconMenu>
		);
	}
}