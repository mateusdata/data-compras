import { CommonActions } from "@react-navigation/native";
import { BottomNavigation, TouchableRipple, useTheme } from "react-native-paper";

const CustomBottomNavigation = ({ navigation, state, descriptors, insets }: any) => {
  const theme = useTheme();

  // Função para remover `key` de objetos
  const filterKeyProp = (props: any) => {
    const { key, ...rest } = props;
    return rest;
  };

  return (
    <BottomNavigation.Bar
      theme={theme}
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault, ...rest }: any) => {
        const filteredProps = filterKeyProp(rest); // Remove `key`
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderTouchable={({ key, ...props }) => (
        <TouchableRipple key={key} {...props} />
      )}
      renderIcon={({ route, focused, color, ...rest }: any) => {
        const filteredProps = filterKeyProp(rest); // Remove `key`
        const { options } = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 24 });
        }
        return null;
      }}
      getLabelText={({ route, ...rest }: any) => {
        const filteredProps = filterKeyProp(rest); // Remove `key`
        const { options } = descriptors[route.key];
        return (
          options.tabBarLabel ??
          options.title ??
          route.name
        );
      }}
    />
  );
};

export default CustomBottomNavigation;
