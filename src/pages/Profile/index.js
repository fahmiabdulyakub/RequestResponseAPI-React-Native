import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
} from 'react-native';
import {BgTop, ICUser, ICLocation} from '../../assets';
import {ButtonIconOnly, Gap, ModalAddImage} from '../../components';
import {colors, fonts, imageFake, reducer} from '../../constants';
import {hp, rf, wp} from '../../constants/display';
import {getLocation, openCamera, openPenyimpanan} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';

const RegisterEmail = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState('');
  const [load, setLoad] = useState(0);
  const stateProfile = useSelector(state => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setRefresh(true);
    getLocation().then(location => {
      dispatch({type: reducer.PROFILE_LATITUDE, value: location.latitude});
      dispatch({type: reducer.PROFILE_LONGITUDE, value: location.longitude});
      setRefresh(false);
    });
  }, [dispatch, load]);

  const onImageSaved = savedImage => {
    setImage(savedImage);
    setModal(false);
  };
  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={colors.bg.blue3} />
      <Image source={BgTop} style={styles.bg} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refresh} />}>
        <Gap height={hp(5)} />
        <View style={styles.container}>
          <Text style={styles.text}>My Profile</Text>
          <ButtonIconOnly
            icon={<ICLocation />}
            backgroundColor={colors.bg.white}
            borderRadius={wp(10) / 2}
            size={wp(10)}
            onPress={() => setLoad(load + 1)}
          />
        </View>
        <Gap height={hp(3)} />
        <View style={styles.containerImage}>
          <TouchableOpacity
            style={styles.profilePic}
            onPress={() => setModal(true)}>
            <Image
              source={{uri: image ? image : imageFake.singleUrl}}
              style={styles.image}
            />
            <View style={styles.circle}>{<ICUser />}</View>
          </TouchableOpacity>
          <Gap height={hp(2)} />
          <Text style={styles.name}>Fahmi Abdul Yakub</Text>
          <Gap height={hp(1)} />
          <Text style={styles.text2}>React Native Developer</Text>
          <Text style={styles.textMedium}>
            Latitude : {stateProfile.latitude}
          </Text>
          <Text style={styles.textMedium}>
            Longitude : {stateProfile.longitude}
          </Text>
        </View>
      </ScrollView>

      <ModalAddImage
        onPressCamera={() => openCamera(onImageSaved)}
        onPressGallery={() => openPenyimpanan(onImageSaved)}
        isVisible={modal}
        onPressClose={() => setModal(false)}
      />
    </View>
  );
};

export default RegisterEmail;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg.white,
    flex: 1,
  },
  text: {
    fontFamily: fonts.MontserratExtraBold,
    color: colors.text.white,
    fontSize: rf(3),
    width: wp(50),
  },
  bg: {
    width: wp(100),
    height: hp(53),
    position: 'absolute',
  },
  container: {
    paddingHorizontal: wp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  containerImage: {
    paddingHorizontal: wp(5),
    alignItems: 'center',
  },
  profilePic: {
    backgroundColor: colors.bg.white,
    borderRadius: wp(5),
    width: wp(25),
    height: wp(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(5),
  },
  circle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10) / 2,
    backgroundColor: colors.bg.white,
    position: 'absolute',
    top: hp(8),
    left: wp(18),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  name: {
    fontFamily: fonts.MontserratBold,
    fontSize: rf(2),
    color: colors.text.white,
  },
  text2: {
    fontFamily: fonts.MontserratBold,
    fontSize: rf(1.5),
    color: colors.text.black,
  },
  textMedium: {
    fontFamily: fonts.MontserratMedium,
    fontSize: rf(1.5),
    color: colors.text.white,
  },
});
