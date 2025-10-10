import { StyleSheet, Text, View, Image } from 'react-native';
import { useState, useEffect } from 'react';

import Header from './Header';
import SearchPage from './SearchPage';

import { mockdata } from './constants/products' 
import CONFIG from './config/config'


export default function HomeScreen(props) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  const callServer = async () => {
    if(CONFIG.use_server){
      try{
        const response = await fetch(`${CONFIG.server_url}?limit=${CONFIG.num_items}`)
        if (response.status == 200){
          const data = await response.json()
          setProducts(data.products)
        } else {
          console.log("Respuesta de red OK pero respuesta HTTP no OK")
        }

      } catch (error) {
        console.log(error);
        alert("No se ha podido recuperar la información")
      }
    } 
    else {
      setProducts(mockdata.products)
    }
  }

  useEffect( () => {
    async function fetchData(){
      await callServer();

      setTimeout( () => {
        setLoading(false);
      },500)      
    }

    fetchData();
  },[]);



  return (
    <View style={styles.container}>
      {loading ? <Image testID="loading" source={require('../assets/spinner.gif')} style={styles.loading}/> : <View style={styles.container2}>
        <Header></Header>
        
        <SearchPage theproducts={products} navigation={props.navigation}></SearchPage>
        
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',

  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top'
  },
  loading: {
    marginTop:350,
    width:300,
    height:300
  }
});
