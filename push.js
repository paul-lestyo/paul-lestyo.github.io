var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEiwm9pZNvfmAVDlPBZ5OrLjiMgGr02NkeHY_peUSgSt39HzH9OXRnwK0sYHAJReUuIG_Mnmr7Pm8mLBt4Buw9s",
   "privateKey": "jovA3XMjr6pWZ4uRHI3bMlq4XjZivhl4tOwVnnqJqqE"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": " https://fcm.googleapis.com/fcm/send/ewWBhVMJpas:APA91bFbyxukhVfAqhzbgC3OIp0upS1NhsZvAioyV2fPE9Kl_KVVp8tu6-iK9MpnjPzrmoImvOSysydaMHR7xOsizzSSgw5zJjgjqpo4iyRC89c1uqp5mociqYaj2t2-ksgAHMBbFiT4",
   "keys": {
       "p256dh": "BP9vu+uzZddJDx+sXngOCqBjOTYybVUz64QxU1pdvWhtpUcGTKJIeyEpGArm3rtaCjwBq42cKywTpZM0PTP/7Yc=",
       "auth": "iwiT6jribTrg1d4XyAV6HQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '243863848225',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);