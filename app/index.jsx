import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Animated, 
  FlatList 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../constants";
import { CustomButton } from "../components";

const { width } = Dimensions.get('window');

const Welcome = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  const imagSli = [
    { uri: "https://images.adsttc.com/media/images/5899/d0b6/e58e/cead/d600/0167/slideshow/CC0_Public_Domain_opera-594592.jpg?1486475429", title: "Experiencia Única" },
    { uri: "https://hotelfontibon.com/wp-content/uploads/2023/08/teatro-Mayor-Julio-Mario-Santo-Domingo-1.jpg", title: "Energía Pura" },
    { uri: "https://www.idartes.gov.co/sites/default/files/2020-02/teatro_jorge_eliecer_gaitan.png", title: "Momentos Mágicos" },
  ];

  const features = [
    { icon: 'map-outline', title: 'Explora Teatros' },
    { icon: 'ticket-outline', title: 'Reserva Fácil' },
    { icon: 'people-outline', title: 'Comunidad Activa' },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % imagSli.length);
  };

  const renderFeatureItem = ({ item }) => (
    <View style={{ alignItems: 'center', width: width / 3 }}>
      <Ionicons name={item.icon} size={24} color="#4cc9f0" />
      <Text style={{ color: '#fff', marginTop: 8, textAlign: 'center' }}>{item.title}</Text>
    </View>
  );

  return (
    <LinearGradient
    colors={['#1a3f3f', "#07575B", 'white']} // You can add more colors here
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <SafeAreaView style={{ flex: 1, /* backgroundColor: '#1a3f3f' */ }}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Animated.View style={{ 
          flex: 1, 
          padding: 20, 
          opacity: fadeAnim,
          transform: [{ translateY }]
        }}>
          <Image
            source={images.lpc}
            style={{ width: 100, height: 65, alignSelf: 'center', marginBottom: 30 }}
            resizeMode="contain"
          />

          <View style={{ height: 300, marginBottom: 30, borderRadius: 20, overflow: 'hidden' }}>
            <TouchableOpacity activeOpacity={0.9} onPress={nextImage}>
              <Image
                source={{ uri: imagSli[currentImage].uri }}
                style={{ width: '100%', height: 300 }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(26, 26, 46, 0.8)']}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, justifyContent: 'flex-end', padding: 15 }}
              >
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                  {imagSli[currentImage].title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 10, left: 0, right: 0 }}>
              {imagSli.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: index === currentImage ? '#4cc9f0' : 'rgba(255, 255, 255, 0.5)',
                    margin: 4
                  }}
                />
              ))}
            </View>
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 }}>
              Transmite LA Energia
            </Text>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#4cc9f0', textAlign: 'center', marginBottom: 20 }}>
              En Un Show De Teatro LPC
            </Text>
          </View>

          <FlatList
            data={features}
            renderItem={renderFeatureItem}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
          />

          <View style={{ marginTop: 30 }}>
            <CustomButton
              title="Continua Con Tu Email"
              handlePress={() => router.push("/sign-up")}
              containerStyles={{ width: '100%', marginBottom: 20 }}
              backgroundColor="#4cc9f0"
            />
          </View>

          <TouchableOpacity 
            onPress={() => router.push("/sign-in")}
            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
          >
            <Ionicons name="log-in-outline" size={20} color="#07575B" style={{ marginRight: 8 }} />
            <Text style={{ textAlign: 'center', color: '#07575B', fontSize: 16 }}>
              ¿Ya tienes una cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default Welcome;