import { StyleSheet, View, Text, Image, Button, FlatList }from 'react-native'

export default function ProductPage(props) {
    const product = props.route.params.item
    const listaComentarios = product.reviews.slice(-3).reverse()

    const _renderItem = ({item}) => {
        return(
            <View style={styles.reviewCard}>
                <Text testID="revisor" style={styles.reviewer}>{item.reviewerName}</Text>
                <Text testID="comentario" style={styles.comment}>{item.comment}</Text>
                <View style={styles.media}>
                    <Text>Rating:</Text>
                    <Text testID="puntuación" style={styles.rating}>{item.rating}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <Text testID="detalle" style={styles.title}>{product.title}</Text>
            <Image source={{uri: `${product.images}`}} style={styles.image} />
            <View style={styles.buttonWrapper}>
                <Button testID="volver" title="Volver" onPress={() => props.navigation.goBack()}/>
            </View>

            <View testID="comments" style={styles.commentsContainer}>
                <View style={styles.summary}>
                    <View style={styles.media}>
                        <Text testID="mediaresultado" style={styles.average}> <Text style={styles.summaryLabel}>Calificación media: </Text>{(product.reviews.reduce( (acc, review) => acc + review.rating,0 )/product.reviews.length).toFixed(2)}</Text>
                        <Text style={styles.outOf}>/ 5</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Últimos 3 comentarios:</Text>
                <FlatList data={listaComentarios} renderItem={_renderItem}/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f6f8fb',
        padding: 16
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#102a43',
        marginBottom: 12
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        backgroundColor: '#e6eef6'
    },
    buttonWrapper: {
        marginTop: 12,
        alignSelf: 'flex-start',
        borderRadius: 8,
        overflow: 'hidden'
    },
    commentsContainer: {
        marginTop: 18,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    summaryLabel: {
        color: '#334e68',
        fontWeight: '600'
    },
    average: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0b69ff'
    },
    outOf: {
        fontSize: 14,
        color: '#627d98'
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#102a43',
        marginBottom: 8
        
    },
    reviewCard: {
        backgroundColor: '#f8fbff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#0b69ff'
    },
    reviewer: {
        fontWeight: '700',
        color: '#0b3d91'
    },
    comment: {
        marginTop: 4,
        color: '#334e68'
    },
    rating: {
        marginTop: 6,
        color: '#ff8a00',
        fontWeight: '700'
    },
    media: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 4
    },
})