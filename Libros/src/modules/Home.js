import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import Carousel from '../../components/Carousel'
import { dummyData } from '../../data/Data'
import Productos from '../../components/productos'



const Home = ({navigation}) =>{
    return (
        <ScrollView>

        <View style={styles.body}>
            <Carousel data = {dummyData}/>
            
             <Productos/>

        </View>
        </ScrollView>
    )
}
export default Home

const styles = StyleSheet.create({
body: {
    backgroundColor: 'black',
    flex: 1,
    
  },

});
