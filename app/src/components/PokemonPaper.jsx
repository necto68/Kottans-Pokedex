import React from 'react';

import Paper from 'material-ui/lib/paper';

export default class PokemonPaper extends React.Component {
	constructor(props, context){
		super(props, context);

		this.styles = {
	  		paper: {
				height: 200,
				width: 200,
				margin: 20,
				textAlign: 'center',
				display: 'inline-block',
			},
			imgWrap: {
				width: 120,
				height: 120,
				margin: '0 auto',
			},
			type: {
				border: '1px solid black',
				borderRadius: 4,
				padding: 2,
				display: 'inline-block',
				margin: '0px 5px',
			}
		};

		this.typeColor = {
			'Normal':  '#00BFFF',
			'Fighting':  '#F0E68C',
			'Flying':  '#00FFFF',
			'Poison':  '#DAA520',
			'Ground':  '#808000',
			'Rock':  '#00FF00',
			'Bug':  '#778899',
			'Ghost':  '#FFFF00',
			'Steel':  '#DDA0DD',
			'Fire': '#9370DB',
			'Water': '#90EE90',
			'Grass': '#8FBC8F',
			'Electric': '#FA8072',
			'Ice': '#D2691E',
			'Dragon': '#FFA500',
			'Dark': '#40E0D0',
			'Fairy': '#B0C4DE',
			'Unknown': '#B8860B',
			'Shadow': '#00FFFF',
			'Psychic': '#00FA9A',  // strange id's order from /api/v1/type/?limit=999
		}
	}

	render(){
		return (
			<Paper onClick={this.props.onClick} className="pokemon" style = {this.styles.paper}>
		       	<center style={this.styles.imgWrap}>	
			       <img src={`https://pokeapi.co/media/img/${this.props.pokemon.pkdx_id}.png`}/>
			       </center>
			       <p>{this.props.pokemon.name}</p>
			       {this.props.pokemon.types.map((type, index)=>{
			       		const typeName = type.name[0].toUpperCase() + type.name.substr(1);
			       		let stylesType = Object.assign({}, this.styles.type);
			       		stylesType.backgroundColor = (this.typeColor[typeName]) ? this.typeColor[typeName] : '#FFFFFF';
			       		return <div key={index} style={stylesType}>{typeName}</div>
			       })}
		    </Paper>
		);
	}
}