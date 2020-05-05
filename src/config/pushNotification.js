import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const configPushNotification = (pubnubClient) => {
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (device) {
            console.log("DEVICE TOKEN:", device.token)
            console.log("DEVICE TYPE:", device.os)
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);

            // process the notification

            // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "145589030158", // bhadresh@nimblechapps.com

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true,
    });
}
export { configPushNotification }
export default PushNotification;