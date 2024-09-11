import { FirebaseApp } from 'firebase/app';
import {
  Auth,
  AuthSettings,
  Config,
  EmulatorConfig,
  User,
  UserCredential,
} from 'firebase/auth';

export const mockUserCredential: UserCredential = {
  user: {} as User,
  providerId: '',
  operationType: 'signIn',
};

export const mockSignInWithEmailAndPassword = jest
  .fn()
  .mockResolvedValue(mockUserCredential);

export const mockSignOut = jest.fn();

export const mockAuth: Auth = {
  app: {} as FirebaseApp,
  config: {} as Config,
  setPersistence: () => new Promise(() => {}),
  languageCode: '',
  name: '',
  tenantId: '',
  settings: {} as AuthSettings,
  onAuthStateChanged: () => () => {},
  beforeAuthStateChanged: () => () => {},
  onIdTokenChanged: () => () => {},
  authStateReady: () => new Promise(() => {}),
  currentUser: {} as User,
  emulatorConfig: {} as EmulatorConfig,
  updateCurrentUser: () => new Promise(() => {}),
  useDeviceLanguage: () => {},
  signOut: () => new Promise(() => {}),
};
