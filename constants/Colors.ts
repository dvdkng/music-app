const tintColorDark = '#FF5722';
const tintColorLight = '#FF5722';

export const colors = {
  light: {
    text: {
      default: '#11181C', 
      title: '#1C1C1E',   
      subtitle: '#3C3C3C',
      link: '#0A84FF',    
      },
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: {
      default: '#ECEDEE',
      title: '#FFFFFF',  
      subtitle: '#A9B1B7',
      link: '#0A84FF',    
    },
    background: '#000',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
