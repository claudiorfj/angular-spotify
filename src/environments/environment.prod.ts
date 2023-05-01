export const environment = {
    production: true
  };
  
  
  export const SpotifyConfiguration = {
    clientId: '845e7bbfd74646e9a3c21d1024b51a92',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUrl: 'http://localhost:4200/login/',
    scopes: [
      "user-read-currently-playing", // tracka tocando agora.
      "user-read-recently-played", // ler tracks tocadas recentemente
      "user-read-playback-state", // ler estado do player do usuario
      "user-top-read", // top artistas e tracks do usuario
      "user-modify-playback-state", // alterar do player do usuario.
      "user-library-read", // ler biblioteca dos usuarios
      "playlist-read-private", // ler playlists privads
      "playlist-read-collaborative" // ler playlists colaborativas
    ]
  }