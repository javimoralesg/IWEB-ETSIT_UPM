import { View, Text, TextInput, StyleSheet, Button, FlatList, Image } from 'react-native'
import { useState } from 'react'

export default function SearchPage({theproducts, navigation}){
    const [inputValue, setInputValue] = useState("hola")
    const [listaProductos, setListaProductos] = useState(theproducts)

    
    const _onPressButtonBuscar = () => {
        if(inputValue == "") {
            setListaProductos(theproducts);
        } else {
            const listaProvisional = theproducts.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()));
            setListaProductos(listaProvisional);
        }
    }

    const _renderItem = ({item}) => {
        return (
            <View testID={"item_"+item.id} style={styles.producto} >
                <Image source={{uri: `${item.images}`}} style={styles.imagenProducto}/>
                <Text testID={"title_"+item.id} style={styles.nombreProducto}> {item.title} </Text>
                <Button testID={"button_"+item.id} onPress={() => navigation.navigate("Product", {item: item})} title="Ver"/>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.buscar}>
                <Text testID="catalogo" style={styles.h1}>Buscar en el Catálogo</Text>
                <View style={styles.grupo}>
                    <TextInput testID="filtro" placeholder="Buscar artículo..." onChangeText={setInputValue} style={styles.textInput}></TextInput>
                    <Button testID="buscador" onPress={_onPressButtonBuscar} title="Buscar"/>
                </View>
            </View>
            
            <View style={styles.lista}>
                <FlatList data={listaProductos} renderItem={_renderItem}/>
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    buscar:{
        marginTop:20,
        padding:20,
        borderWidth:2,
        borderRadius:20,
        width:350,
        alignItems: 'center'
    },
    h1:{
        textDecorationLine: 'underline'
    },
    textInput:{
        width: 150,
        height: 40,
        fontSyze:20,
        backgroundColor: '#7a9ccc42'
    },
    grupo:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    lista:{
        flex:1,
        padding:20,
        alignItems: 'center',
    },
    producto:{
        borderWidth:2,
        borderRadius:20,   
        alignItems: 'center',
        marginBottom:20,
        padding:10,
        width:250,
        backgroundColor: '#7a9ccc42',
        borderColor: '#526b8f8e',
        paddingBottom:20
    },
    imagenProducto:{
        width: 100,
        height: 100,   
    },
    nombreProducto:{
        fontWeight: 'bold',
        paddingBottom: 10,   
    }

})