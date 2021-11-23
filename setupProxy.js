 const { createProxyMiddleware } = require('http-proxy-middleware');

 module.exports = function(app) {   app.use(
     `/bookings`,
     createProxyMiddleware({
       target: 'http://localhost:8070/bookingmanagement',
       changeOrigin: true,
     })
   );

   app.use(
     '/book',
     createProxyMiddleware({
       target: 'http://localhost:8070/bookingmanagement',
       changeOrigin: true,
     })
   );
  

   app.use(
     '/post/delete',
     createProxyMiddleware({       target: 'http://localhost:8070/bookingmanagement',
       changeOrigin: true,
     })
   );
   app.use(
    '/post/update',
     createProxyMiddleware({
       target: 'http://localhost:8070/bookingmanagement',
       changeOrigin: true,
     })
   );

   app.use(
     '/cancel/save',
     createProxyMiddleware({
       target: 'http://localhost:8070/cancelbookings',
       changeOrigin: true,
    })
   );

 };