import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, ImageBackground, TextInput, TouchableWithoutFeedback, FlatList} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-anchor-carousel';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

   

const Productos = () => {

  const [background,setBackground] = useState({
    uri: 'https://estaticos.efe.com/efecom/recursos2/imagen.aspx?lVW2oAh2vjO85veM1Pff8bA-P-2bTmgjIO-P-2fSQ4TncnkXVSTX-P-2bAoG0sxzXPZPAk5l-P-2fU5UirB1Ba41of0MheeLtm-P-2bAyg-P-3d-P-3d',
    name: 'El diario de Ana Frank',
    stat: '1947 ‧ Auto Biografia',
    desc: 'Oculta con su familia, en una buhardilla de unos almacenes  (conocido como «la casa de atrás») de Ámsterdam durante la ocupación nazi de Países Bajos, Ana Frank con trece años, cuenta en su diario, al que llamó «Kitty», la vida del grupo.  '
  })

  const [gallery, setgallery] = useState([
 
    { image:'https://estaticos.efe.com/efecom/recursos2/imagen.aspx?lVW2oAh2vjO85veM1Pff8bA-P-2bTmgjIO-P-2fSQ4TncnkXVSTX-P-2bAoG0sxzXPZPAk5l-P-2fU5UirB1Ba41of0MheeLtm-P-2bAyg-P-3d-P-3d', title: 'El diario de Ana Frank',released: '1947 ‧ Auto Biografia' ,key: '1' , desc: 'Oculta con su familia, en una buhardilla de unos almacenes  (conocido como «la casa de atrás») de Ámsterdam durante la ocupación nazi de Países Bajos, Ana Frank con trece años, cuenta en su diario, al que llamó «Kitty», la vida del grupo.  ' },
    {
    image:'http://68.media.tumblr.com/9cbbaa54d3d178ada985e7ec9343fe26/tumblr_mqutu1vhDf1r9ecgko1_1280.jpg', title: 'Harry Poter',released: '1998 ‧ novela fantastica',  key: '2' , desc: 'Harry Potter crece en la casa de sus tíos, los Dursley, quienes le ocultan su verdadera historia familiar; el niño ha sido admitido en el Colegio Hogwarts de Magia y Hechicería, ya que, al igual que sus padres, es mago.' },
    { image:'https://images-na.ssl-images-amazon.com/images/I/71G+CebXXLL.jpg', title: 'Los juegos del hambre',released: '2008 ‧ Novela juvenil',key: '3', desc: 'Hace cerca de 100 años, el Distrito 13 inició una rebelión ante El Capitolio. Como castigo para evitar otros futuros levantamientos, El Capitolio creó un evento llamado «Los Juegos del Hambre», en donde anualmente los doce distritos sobrantes deben enviar dos tributos' },
    { image:'https://i.pinimg.com/originals/60/2d/08/602d08b9e685f9ca096dc3e16723c20a.jpg', title: 'Game of thrones',released: '1996 novela fantastica', key: '4', desc: 'La saga es conocida por tener personajes complejos, cambios de trama violentos y repentinos, e intrigas políticas bien desarrolladas. En un género donde la magia normalmente posee un papel central en el argumento, Canción de hielo y fuego se caracteriza por un uso limitado y sutil de la misma.' },
    { image:'https://www.thewitcherlaserie.com/wp-content/uploads/2019/05/2019-05-23-at-20-41-34.png', title: 'La espada del destino',released: '1992 ‧ Cuento', key: '5', desc: 'es una colección de cuentos del autor polaco Andrzej Sapkowski. Es el segundo libro en La saga del brujo de Andrzej Sapkowski en términos de una cronología interna' },
  ]);




  const [list, setList] = useState([
    { image:'https://img.wattpad.com/cover/179511216-176-k847465.jpg', key: '1' },
    { image:'http://4.bp.blogspot.com/-D6DeGCmoHfE/U8XAw_N_h4I/AAAAAAAAAtQ/H4gdZkJ_o_o/s1600/cuentos+de+barro.PNG',key: '2' },
    { image:'https://i.pinimg.com/originals/8a/f5/2c/8af52c4c0e2293b1437f7bf3a6e555e7.jpg', key: '3'},
    { image:'https://minepub.net/media/k2/items/cache/21874bc28813810f3a3edffddba32e28_M.jpg', key: '4', },
    { image:'https://i.pinimg.com/originals/d1/8e/64/d18e649e5f706f1333e25aeb2a084a13.jpg', key: '5' },
  ]);

  const carouselRef = useRef(null);

  const {width, height} = Dimensions.get('window')

  const routeRecents = () => {
      props.navigation.navigate('Recents')
  }
  const renderItem = ({item, index}) => {
    return (
    <View>
          <TouchableOpacity
            onPress={() => 
                { 
                carouselRef.current.scrollToIndex(index);
                setBackground({
                    uri: item.image,
                    name: item.title,
                    stat: item.released,
                    desc: item.desc
                })
                }
            }
      >
        <Image source={{uri: item.image}} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.title}</Text>
        <MaterialIcons name='library-add' size={30} color='white' style={styles.carouselIcon} />
      </TouchableOpacity>
     
    </View>
    
    )
  }


  return (
    <ScrollView style={{backgroundColor: '#000'}} blurRadius={100}>
        
        <StatusBar backgroundColor='#000' barStyle='light-content' />

        <View style={styles.carouselContentContainer}>
          <View style={{...StyleSheet.absoluteFill, backgroundColor: '#000'}}>
            <ImageBackground source={{ uri: background.uri  }} style={styles.ImageBg} blurRadius={10}>
              <View style={styles.SearchboxContainer}>
                <TextInput
                placeholder='Buscar Libros'
                placeholderTextColor='#666'
                style={styles.Searchbox}
                >
              </TextInput>
                <Feather name='search' size={22} color='#666' style={styles.SearchboxIcon} />
              </View>
            <Text style={{color: 'white', fontSize: 24, fontFamily:'EncodeSans-Bold', marginLeft: 10, marginVertical:     10 }}>Top libros de esta semana</Text>
            <View style={styles.carouselContainerView}>
                <Carousel style={styles.carousel}
                data={gallery}
                renderItem={renderItem}
                itemWidth={200}
                containerWidth={width - 20} 
                separatorWidth={0}
                ref={carouselRef}
                inActiveOpacity={0.4}
                //pagingEnable={false}
                //minScrollDistance={20}
            />
      </View>


      <View style={styles.movieInfoContainer}>
        <View style={{ justifyContent: 'center'}}>
            <Text style={styles.movieName}>{background.name}</Text>
            <Text style={styles.movieStat}>{background.stat}</Text>
        </View>
        <TouchableOpacity style={styles.playIconContainer}>
            <FontAwesome5  name='book' size={22} color='#02ad94' style={{marginLeft: 4}} />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 14, marginTop: 14}}>
          <Text style={{color: 'white', opacity: 0.8, lineHeight: 20}}>
              {background.desc}
          </Text>
      </View>
   </ImageBackground>
 </View>
</View>
    <View style={{marginHorizontal: 14}}>
        <Text style={{color: 'white', fontSize: 24, fontFamily:'EncodeSans-Bold',marginBottom: 24}}>Continuar Leyendo</Text>
        <ImageBackground
        style={{height: 250, width: '100%', backgroundColor: '000'}}
        resizeMode='cover'
        source={{uri: 'https://www.whitcoulls.co.nz/content/products/99/05/5950599_MAIN.jpg?width=416&height=620&fit=bounds&enable=upscale&bg-color=ffffff&canvas=416%2C620'
    }}
        >

        <Text style={{color: 'white', padding: 14,fontFamily:'EncodeSans-Regular'}}></Text>

          <TouchableOpacity style={{...styles.playIconContainer, position: 'absolute',top: '40%', right: '40%'}}>
            <FontAwesome5  name='book-open' size={22} color='#02ad94' style={{marginLeft: 4}} />
        </TouchableOpacity>
        {/* <View style={{height: 4, backgroundColor: '#666', position: 'absolute', bottom: 0, width: '100%'}}></View>
        <View style={{height: 4, borderRadius: 10, backgroundColor: '#02ad94', position: 'absolute', bottom: 0, width: '40%'}}></View> */}
        </ImageBackground>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',marginBottom: 24, marginTop: 36}}>
        <Text style={{color: 'white', fontSize: 24, fontFamily:'EncodeSans-Bold'}}>Clasicos</Text>
        <Text style={{color: '#02ad94', fontSize: 14, fontFamily:'EncodeSans-Regular'}}>View All</Text>
        </View>
      
        <FlatList 
        style={{marginBottom: 30}}
        horizontal={true}
        data={list}
        renderItem={({item}) => {
          return(
            <TouchableOpacity style={{marginRight: 20}}>
              <Image source={{uri: item.image}} style={{height: 300, width: 200}} />
              <View style={{position: "absolute", height: 5, width: '100%', backgroundColor: '#02ad94',opacity: 0.8}}></View>
              <FontAwesome5  name='readme' size={38} color='#fff' style={{position: 'absolute',top: '45%', left: '45%',opacity: 0.9}} />
            </TouchableOpacity>
          )
        }}
        />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({


// CAROUSEL STYLES

carouselImage: {
    width: 200, 
    height: 320, 
    borderRadius: 10, 
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)'
},
carouselText: {
    paddingLeft: 14,
    color: 'white', 
    position: 'absolute', 
    bottom: 10, 
    left: 2, 
    fontFamily:'EncodeSans-Bold'
},
carouselIcon: {
    position: 'absolute', 
    top: 15, 
    right: 15
},
carouselContentContainer: {
    flex: 1,
    backgroundColor: '#000',
    height: 720,
    paddingHorizontal: 14
  },
SearchboxContainer: {
    flexDirection: 'row',
    marginVertical: 20, 
    width: '95%',
    alignSelf: 'center', 
    backgroundColor: '#fff', 
    elevation: 10,
    borderRadius: 4,
  },
  Searchbox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
    fontFamily:'EncodeSans-Regular'
  },
  SearchboxIcon: {
    position: 'absolute', 
    right: 20, 
    top: 14
  },
  ImageBg: {
    flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: 'flex-start',  
  },
  carouselContainerView: {
    width: '100%',
    height:350 ,
    justifyContent: 'center',
    alignItems: 'center',
},
  carousel: {
    flex:1,
    overflow: 'visible',
} ,
movieInfoContainer: {
  flexDirection: 'row', 
  marginTop: 16, 
  justifyContent: 'space-between', 
  width: Dimensions.get('window').width - 14
},
movieName: {
  paddingLeft: 14,
  color: 'white', 
  fontFamily:'EncodeSans-Bold', 
  fontSize: 20,
  marginBottom: 6
}, 
movieStat: {
  paddingLeft: 14,
  color: 'white', 
  fontFamily:'EncodeSans-Bold', 
  fontSize: 14, 
  opacity: 0.8
},
playIconContainer: {
  backgroundColor: '#212121',
  padding: 18,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 25,
  borderWidth: 4,
  borderColor: 'rgba(2, 173, 148, 0.2)',
  marginBottom: 14
}
});

export default Productos;