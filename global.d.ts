import en from '@src/dictionaries/en.json';

type Messages = typeof en;

// Used to define types for a translation function
declare global {
  interface IntlMessages extends Messages {}
}
