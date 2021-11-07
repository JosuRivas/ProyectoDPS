import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, ImageBackground, TextInput, TouchableWithoutFeedback, FlatList,TouchableHighlight, Pressable} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-anchor-carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar, Colors } from 'react-native-paper';
import { getUID } from './login/storage/UsuarioAsyncStorage';

const Library = ({navigation}) => {

	const [uid,setUID] = useState('');
	
	useEffect(()=>{
        fetchBooks(); 
    }, []) 
	

	const [background,setBackground] = useState({})
    const [list, setList] = useState([]);

    const carouselRef = useRef(null);

    const {width, height} = Dimensions.get('window')  

    const renderItem = ({item, index}) => {
    return (
    <View>
          <TouchableOpacity
            onPress={() => 
                            
                
                { 
                carouselRef.current.scrollToIndex(index);
                setBackground({
                    uri: `http://10.0.2.2:8080/api/uploads/productos/${item.libro._id}`,
                    name: item.libro.nombre,
                    stat: item.libro.autor,
                    desc: item.libro.descripcion,
                    item: item
                })
                }
            
               
            }
            
      >
        <Image source={{uri:`http://10.0.2.2:8080/api/uploads/productos/${item.libro._id}`}} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.libro.nombre}</Text>
  <ProgressBar progress={item.pro} color={Colors.red800} style={{height:5}} />

      </TouchableOpacity>
     
    </View>
    
    )
  }


  return (
    <ScrollView style={{backgroundColor: '#000'}} blurRadius={100}>
        

        <View style={styles.carouselContentContainer}>
          <View style={{...StyleSheet.absoluteFill, backgroundColor: '#000'}}>
          
            <ImageBackground source={{ uri: background.uri  }} style={styles.ImageBg} blurRadius={10}>
              <View style={styles.SearchboxContainer}>
           
              </View>
            <Text style={{color: 'white', fontSize: 24, fontFamily:'EncodeSans-Bold', marginLeft: 10, marginVertical:     10 }}>Continuar leyendo</Text>
            <View style={styles.carouselContainerView}>
                <Carousel style={styles.carousel}
                data={list}
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
        <TouchableOpacity style={styles.playIconContainer} onPress={()=> {navigation.navigate("ReadBook",{background})}}>
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
    
        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',marginBottom: 24, marginTop: 36}}>
        <Text style={{color: 'white', fontSize: 24, fontFamily:'EncodeSans-Bold'}}>Libros adquiridos</Text>
        </View>
      
        <FlatList 
        style={{marginBottom: 30}}
        horizontal={true}
        data={list}
        renderItem={({item}) => {
          return(
            <Pressable style={{marginRight: 20}} onPress={()=> {navigation.navigate("ReadBook",{item})}}>

            	<Image source={{uri: `http://10.0.2.2:8080/api/uploads/productos/${item.libro._id}`}}style={{height: 300, width: 200}} />
            	<Text style={styles.carouselText}>{item.libro.nombre} </Text>

              	<View style={{position: "absolute", height: 5, width: '100%', backgroundColor: '#02ad94',opacity: 0.8}}></View>
             
            </Pressable>
          )
        }}
        />
    </View>
    </ScrollView>
  )

  async function fetchBooks() {
	const uid = await getUID();
	setUID(uid);
  	fetch(`http://10.0.2.2:8080/api/compras/id/${uid}`,{
	  method:'get',
	  headers:{
		  'Content-Type':'application/json'
	  }
	  })
	  .then(resp => resp.json())
	  .then(resp=>{                
	  if (resp.msg) {
		  Alert.alert("Error al obtener productos:",resp.msg);
	  }else{
		  if (resp.total != 0) {
			  setList(resp.compras);
              setBackground({
                uri: `http://10.0.2.2:8080/api/uploads/productos/${resp.compras[0].libro._id}`,
                name: resp.compras[0].libro.nombre,
                stat: resp.compras[0].libro.autor,
                desc: resp.compras[0].libro.descripcion,
                item: resp.compras[0]
            });
		  }else{
			  console.log('Aun no ha adquirido ningun libro');
		  }
	  }
  
	  })
	  .catch(console.warn)
	}
}

const styles = StyleSheet.create({



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
    flex:1,
    textAlign:"center"
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
},
 botones:{
        height: 38,
        width:80,
        borderRadius:10,
        backgroundColor : "white",
        marginLeft :10,
     
        marginTop :20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center', 
        flexDirection:'column',
        fontFamily:'EncodeSans-Regular'

 
    },
  
});

export default Library;
