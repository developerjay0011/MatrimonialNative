import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function replace(name: string, param?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, param));
  }
}

export function reset(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}


export function resetArray(routes: any[]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset({ index: routes?.length - 1, routes: routes }));
  }
}