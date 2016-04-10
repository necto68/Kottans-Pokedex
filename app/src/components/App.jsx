import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Grid from './Grid';
import Filter from './Filter';

export default class App extends React.Component {
	constructor(props, context){
		super(props, context);

		this.state = {
			types: [],
			filters: [],
		};
		
		this.styles = {
			appBar: {
				position: 'fixed',
				top: 0,
			},
			wrap: {
				margin: '64px 0px'
			}
		};
	}

	setFilterTypes(types){
		this.setState({
			types
		})
	}

	setFilters(filters){
		this.setState({
			filters
		})
	}

	render(){
		return (
			<div>
				<AppBar style={this.styles.appBar} title="Pokedex" showMenuIconButton={false} iconElementRight={<Filter setFilters={this.setFilters.bind(this)} types={this.state.types}/>}/>
				<div style={this.styles.wrap}>
					<Grid filters={this.state.filters} setFilterTypes={this.setFilterTypes.bind(this)}/>
				</div>
			</div>
		);
	}
}