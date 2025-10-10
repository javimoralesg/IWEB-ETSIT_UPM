import { StyleSheet, View, Image, Text } from 'react-native';

export default function Header() {
    return(
        <View testID="cabecera" style={styles.cabecera} >
            <Image testID="logo" source={require('../assets/logo.png')} style={styles.imagen}/>
            <Text testID="mensaje">Bienvenido a la página de Javier Morales Galisteo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cabecera:{
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#7a9ccca1',
        paddingRight: 20,
        paddingLeft: 20,
        width: '100%'
    },
    imagen:{
        width: 50,
        height: 50
    }
})