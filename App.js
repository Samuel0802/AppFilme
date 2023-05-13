import React, { Component } from 'react';
import {
  View,
    FlatList,
    StyleSheet,
    Text,
    ActivityIndicator
  
} from 'react-native';

import api from './src/services/api';
import Filmes from './src/Filmes';


class App extends Component {

constructor(props){
  super(props);

  this.state ={
   filmes: [],
   loading: true
  };
};


  //componentDidMount - quando o componente é montado em tela
 async componentDidMount(){
   const response = await api.get('r-api/?api=filmes'); //Buscar informação da api
 
    this.setState({
      filmes: response.data,
      loading: false
    });
  }

  render() {

    if(this.state.loading){
         return( //Seria a bolinha que carregava
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
             <ActivityIndicator color='#09a6ff' size={40}/>
          </View>
         );
    }else{
      return (
        <View style={styles.container}>
      
        <FlatList
         data={this.state.filmes}
         keyExtractor={item => item.id.toString()}
         renderItem={({item}) => <Filmes data={item} />}
        />
          
        </View>
      );
    }
 
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25
       
  }
  
});


export default App;