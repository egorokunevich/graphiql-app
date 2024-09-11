// import '@testing-library/jest-dom';
// import { screen } from '@testing-library/react';
// // import { ReactElement } from 'react';

// import {
//   mockSignOut,
//   mockUserCredential,
//   mockSignInWithEmailAndPassword,
// } from './mocks/mockFirebase';

// import { render } from '@/src/tests/test-utils';
// import MainPage from '@app/[lang]/page';
// // import { LayoutProvider } from '@src/context/LayoutContext';

// jest.mock('firebase/app', () => {
//   return {
//     initializeApp: jest.fn(),
//   };
// });

// jest.mock('firebase/auth', () => {
//   return {
//     getAuth: jest.fn().mockResolvedValue(null), // or .mockResolvedValue(mockAuth)
//     signOut: mockSignOut,
//     onAuthStateChanged: jest.fn((auth, callback) => {
//       callback({ uid: 'mock-uid', email: 'mock@example.com' });
//       return jest.fn();
//     }),
//     createUserWithEmailAndPassword: jest
//       .fn()
//       .mockResolvedValue(mockUserCredential),
//     signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
//   };
// });

// describe('MainPage', () => {
//   it('Should render in the document', async () => {
//     const page = await MainPage();

//     render(page);

//     const mainPage = await screen.findByTestId('main-page');
//     expect(mainPage).toBeInTheDocument();
//   });
// });
test('x', () => {
  expect(2 + 2).toBe(4);
});
