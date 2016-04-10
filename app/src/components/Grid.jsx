import React from 'react';

import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';

import PokemonPaper from './PokemonPaper';
import PokemonModal from './PokemonModal';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Grid extends React.Component {
	constructor(props, context){
		super(props, context);

		this.state = {
			nextUrl: '/api/v1/pokemon/?limit=12',
			pokemons: [],
			isLoading: true,
			showModal: false,
			pokemonModal: null,
		}

		this.styles = {
			mainGrid: {
				maxWidth: 720,
				display: 'inline-block', 
			},
		}
	}

	unique(arr) {
	  let obj = {};
	  for (var i = 0; i < arr.length; i++) {
	    let str = arr[i];
	    obj[str] = true; 
	  }
	  return Object.keys(obj); 
	}

	componentDidMount(){
		this.loadMore();
	}

	loadMore(){
		if(!this.state.nextUrl) return;
		this.setState({
			isLoading:true,
		});

		fetch(`https://pokeapi.co${this.state.nextUrl}`)
		.then(data => data.json())
		.then(json => {
			this.setState({
				nextUrl: json.meta.next,
				pokemons: this.state.pokemons.concat(json.objects),
				isLoading: false,
			})
			//array of all types
			let allTypes = this.state.pokemons.map(pokemon=>pokemon.types.map(type=>type.name)).reduce((previous, current)=>previous.concat(current),[])
			allTypes = this.unique(allTypes);
			this.props.setFilterTypes(allTypes);
		})
	}

	onShowModal(pokemon){
		this.setState({
			showModal: true,
			pokemonModal: pokemon,
		})
	}
	onHideModal(){
		this.setState({
			showModal: false,
			pokemonModal: null,
		})
	}
	render(){
		let pokemons = this.state.pokemons;
		if(this.props.filters.length){
			pokemons = pokemons.filter(pokemon=>{
				return (this.props.filters.includes(pokemon.types[0].name) || ((pokemon.types[1]) ? this.props.filters.includes(pokemon.types[1].name) : false)) 
			})
		}
		return (
			<center>
				<div style={this.styles.mainGrid}>
					<ReactCSSTransitionGroup transitionName="pokemonPaper" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				     	{pokemons.map(pokemon => (
					       <PokemonPaper onClick={this.onShowModal.bind(this, pokemon)} key={pokemon.pkdx_id} pokemon={pokemon}/>
				     	))}
			      	</ReactCSSTransitionGroup>
			      	<br/>
			      	{(this.state.isLoading) ? <CircularProgress size={1.5}/> : null}
			     	<RaisedButton onClick={this.loadMore.bind(this)} label="Load More" secondary={true} fullWidth={true} disabled={this.state.isLoading}/>
		      	</div>
		      	<div style={{position:'fixed', top: 60}}>
					<ReactCSSTransitionGroup transitionName="pokemonPaper" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				    	{(this.state.showModal) ? <PokemonModal onClick={this.onHideModal.bind(this)} pokemon={this.state.pokemonModal}/> : null}
				    </ReactCSSTransitionGroup>
			    </div>
	  		</center>
		);
	}
}