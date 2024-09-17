import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../constants';
import {  signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';
const theaterData = [
  {
    id: 1,
    name: "Teatro Colon",
    image: "https://images.adsttc.com/media/images/5899/d0b6/e58e/cead/d600/0167/slideshow/CC0_Public_Domain_opera-594592.jpg?1486475429",
    location: "Calle Principal 123, Ciudad",
    nextShow: "Romeo y Julieta",
    date: "2023-07-1x5",
    time: "20:00",
  },
  {
    id: 2,
    name: "Teatro Santo Domingo",
    image: "https://hotelfontibon.com/wp-content/uploads/2023/08/teatro-Mayor-Julio-Mario-Santo-Domingo-1.jpg",
    location: "Avenida Central 456, Ciudad",
    nextShow: "El Fantasma de la Ópera",
    date: "2023-07-18",
    time: "19:30",
  },
  {
    id: 3,
    name: "Teatro Municipal Jorge Eliecer Gaitan",
    image: "https://www.idartes.gov.co/sites/default/files/2020-02/teatro_jorge_eliecer_gaitan.png",
    location: "Plaza Mayor 789, Ciudad",
    nextShow: "Hamlet",
    date: "2023-07-20",
    time: "19:00",
  },
];

const Home = () => {
  const [selectedTheater, setSelectedTheater] = useState(null);
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [userStats, setUserStats] = useState({
    name: user?.username,
    avatar: user?.avatar,
    obrasVistas: 23,
    proximaFuncion: 2,
    objetivoAnual: 66,
  });
  console.log(user);
  

  
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <LinearGradient
    colors={['#1a3f3f', 'white']} // You can add more colors here
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView>
        <View style={{ padding: 20, backgroundColor: 'white', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 20,marginTop:15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,marginTop:20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: userStats.avatar }}
                style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{userStats.name}</Text>
                <Text style={{ color: 'gray' }}>Amante del teatro</Text>
              </View>
            </View>
            <TouchableOpacity onPress={logout}>
            <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <View>
              <Text style={{ color: 'gray' }}>Obras vistas</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{userStats.obrasVistas}</Text>
            </View>
            <View>
              <Text style={{ color: 'gray' }}>Próxima función</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{userStats.proximaFuncion} días</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#e0e0e0', height: 10, borderRadius: 5 }}>
            <View style={{ width: `${userStats.objetivoAnual}%`, backgroundColor: '#07575B', height: 10, borderRadius: 5 }} />
          </View>
          <Text style={{ textAlign: 'center', marginTop: 5, color: 'gray' }}>{userStats.objetivoAnual}% del objetivo anual</Text>
        </View>

        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15 }}>Teatros Cercanos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            {theaterData.map((theater) => (
              <TouchableOpacity
                key={theater.id}
                onPress={() => setSelectedTheater(theater)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 15,
                  padding: 15,
                  marginRight: 15,
                  width: 200,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Image
                  source={{ uri: theater.image }}
                  style={{ width: '100%', height: 100, borderRadius: 10, marginBottom: 10 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{theater.name}</Text>
                <Text style={{ color: 'gray', marginBottom: 10 }}>{theater.location}</Text>
                <Text style={{ fontWeight: 'bold' }}>{theater.nextShow}</Text>
                <Text style={{ color: 'gray' }}>{`${theater.date} - ${theater.time}`}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {selectedTheater && (
            <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 20, marginBottom: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>{selectedTheater.name}</Text>

              <Text style={{ fontSize: 16, marginBottom: 10 }}>{selectedTheater.location}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{selectedTheater.nextShow}</Text>
              <Text style={{ fontSize: 16, color: 'gray', marginBottom: 15 }}>{`${selectedTheater.date} - ${selectedTheater.time}`}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#007AFF',
                  padding: 15,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                onPress={() => Linking.openURL('https://tuboleta.com/')}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Reservar Entradas</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Próximos Eventos</Text>
            {theaterData.map((theater) => (
              <View key={theater.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <Image
                  source={{ uri: theater.image }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>{theater.nextShow}</Text>
                  <Text style={{ color: 'gray' }}>{theater.name}</Text>
                </View>
                <View>
                  <Text>{theater.date}</Text>
                  <Text style={{ color: 'gray' }}>{theater.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;