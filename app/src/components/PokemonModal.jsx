import React from 'react';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';


export default class PokemonModal extends React.Component {
	constructor(props, context){
		super(props, context);
		
		this.styles = {

		};
	}

	render(){
		const pokemon = this.props.pokemon;
		let pokemonId = pokemon.pkdx_id+'';
		while(pokemonId.length<3) pokemonId='0'+pokemonId;
		const pokemonTypes = pokemon.types.map(type=>type.name).join(', ');
		return (
			<Paper className='pokemonModal' zDepth={4}>
					<img src={`https://pokeapi.co/media/img/${pokemon.pkdx_id}.png`}/>
					<p><b>{pokemon.name} #{pokemonId}</b></p>
					<table className='pokemonTable'>
						<tbody>
							<tr><td>Type</td><td>{pokemonTypes}</td></tr>
							<tr><td>Attack</td><td>{pokemon.attack}</td></tr>
							<tr><td>Defense</td><td>{pokemon.defense}</td></tr>
							<tr><td>HP</td><td>{pokemon.hp}</td></tr>
							<tr><td>SP Attack</td><td>{pokemon.sp_atk}</td></tr>
							<tr><td>SP Defense</td><td>{pokemon.sp_def}</td></tr>
							<tr><td>Speed</td><td>{pokemon.speed}</td></tr>
							<tr><td>Weight</td><td>{pokemon.weight}</td></tr>
							<tr><td>Total moves</td><td>{pokemon.moves.length}</td></tr>
						</tbody>
					</table>
					<br/>
					<RaisedButton onClick={this.props.onClick} label="Close" primary={true}/>
			</Paper>
		);
	}
}