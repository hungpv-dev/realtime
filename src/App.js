import { useEffect } from 'react';
import Echo from 'laravel-echo';
import { io } from 'socket.io-client';

const App = () => {
  useEffect(() => {
    const appId = 'cb87f9d5d3527165';
    const key = '2990bec3f11d88e7af6136259fb00082';

    window.Echo = new Echo({
      broadcaster: "socket.io",
      client: io,
      host: "http://localhost:6001",
      authHost: 'http://localhost:8000',
      key: key,
      appId: appId,
      authEndpoint: '/broadcasting/auth',
    });

    console.log(window.Echo);

    window.Echo.connector.socket.on("connect", function () {
      console.log("Kết nối thành công");
    });

    window.Echo.connector.socket.on("disconnect", function () {
      console.log("Đã ngắt kết nối");
    });

    window.Echo.channel("is-online").listen("UserOnline", (event) => {
      console.log(event);
    });
    console.log('hungpv');
    return () => {};
  }, []); 

  return (
    <div>
      <h1>Đây là ứng dụng realtime của tôi</h1>
    </div>
  );
};

export default App;
