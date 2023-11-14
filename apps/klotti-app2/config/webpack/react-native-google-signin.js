module.exports = {
  GoogleSignin: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
    configure: () => Promise.resolve(),
    hasPlayServices: () => Promise.resolve(),
    signIn: () =>
      Promise.resolve({
        idToken: 'mock-id-token',
        user: {
          email: 'mock-email@example.com',
          familyName: 'Mock',
          givenName: 'Name',
          id: 'mock-id',
          name: 'Mock Name',
          photo: 'mock-photo-url'
        }
      }),
    signInSilently: () =>
      Promise.resolve({
        idToken: 'mock-id-token',
        user: {
          email: 'mock-email@example.com',
          familyName: 'Mock',
          givenName: 'Name',
          id: 'mock-id',
          name: 'Mock Name',
          photo: 'mock-photo-url'
        }
      }),
    signOut: () => Promise.resolve(),
    revokeAccess: () => Promise.resolve(),
    isSignedIn: () => Promise.resolve(false),
    getCurrentUser: () => Promise.resolve(null),
    getTokens: () =>
      Promise.resolve({ idToken: 'mock-id-token', accessToken: null })
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE'
  }
};
