document.addEventListener('DOMContentLoaded', function() {
    const notificationPopup = document.getElementById('notification-popup');
    const enableButton = document.getElementById('enable-notifications-btn');
    const noThanksButton = document.getElementById('no-thanks-btn');

    // --- Badging API Functions ---
    function setAppBadge(count) {
        if ('setAppBadge' in navigator) {
            navigator.setAppBadge(count)
                .then(() => {
                    console.log('App badge set to:', count);
                })
                .catch(error => {
                    console.error('Failed to set app badge:', error);
                });
        } else {
            console.warn('Badging API not supported in this browser.');
        }
    }

    function clearAppBadge() {
        if ('clearAppBadge' in navigator) {
            navigator.clearAppBadge()
                .then(() => {
                    console.log('App badge cleared.');
                })
                .catch(error => {
                    console.error('Failed to clear app badge:', error);
                });
        } else {
            console.warn('Badging API not supported in this browser.');
        }
    }
    // --- End Badging API Functions ---


    // --- Popup Control Functions ---
    function showPopup() {
        // Ensure it's displayed as flex before removing 'hidden' for transition
        notificationPopup.style.display = 'flex';
        // A tiny delay can help ensure the display property is applied before transition starts
        requestAnimationFrame(() => {
            notificationPopup.classList.remove('hidden');
        });
    }

    function hidePopup() {
        notificationPopup.classList.add('hidden');
        // Wait for the transition to complete before setting display: none
        notificationPopup.addEventListener('transitionend', function handler() {
            notificationPopup.style.display = 'none';
            notificationPopup.removeEventListener('transitionend', handler);
        }, { once: true });
    }
    // --- End Popup Control Functions ---


    // Check if user has explicitly declined before via localStorage
    const userDeclinedNotifications = localStorage.getItem('userDeclinedNotifications');

    // Ensure OneSignal is loaded before attempting to use it
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(function(OneSignal) {

        // Get current notification permission status from OneSignal
        OneSignal.Notifications.getPermission().then(function(permission) {
            console.log('OneSignal Notification Permission on load:', permission);

            // If permission is 'default' (not asked yet) AND user hasn't explicitly declined before
            if (permission === 'default' && !userDeclinedNotifications) {
                showPopup(); // Show your custom popup
            } else {
                // If permission is already granted or denied, or user declined before, ensure popup is hidden
                hidePopup();
            }
        });

        // Event listener for "Enable Notifications" button in your popup
        if (enableButton) {
            enableButton.addEventListener('click', function() {
                // This user click acts as the required gesture for iOS PWA
                OneSignal.Notifications.requestPermission().then(function(permission) {
                    if (permission === 'granted') {
                        console.log('OneSignal Notification permission granted after user click!');
                        hidePopup(); // Hide the popup
                        // Example: Set a badge of '1' after successful subscription
                        setAppBadge(1);
                        // OneSignal usually handles subscription automatically if allowed
                    } else if (permission === 'denied') {
                        console.warn('OneSignal Notification permission denied by user.');
                        alert('Notifications denied. Please enable them manually in your iPhone Settings > Notifications for this app if you change your mind.');
                        hidePopup(); // Hide the popup
                        localStorage.setItem('userDeclinedNotifications', 'true'); // Remember user preference
                        clearAppBadge(); // Clear badge if they denied
                    } else { // 'default' (user dismissed native prompt without granting or denying)
                        console.log('OneSignal Notification permission request dismissed.');
                        hidePopup(); // Hide the popup
                        // Do NOT set userDeclinedNotifications here, as they might just want to be asked later.
                    }
                }).catch(function(error) {
                    console.error('Error requesting OneSignal notification permission:', error);
                    hidePopup(); // Hide the popup on error
                });
            });
        }

        // Event listener for "No Thanks" button in your popup
        if (noThanksButton) {
            noThanksButton.addEventListener('click', function() {
                console.log('User explicitly declined notifications via custom popup.');
                hidePopup(); // Hide the popup
                localStorage.setItem('userDeclinedNotifications', 'true'); // Remember user preference
                clearAppBadge(); // Clear badge if they explicitly say no
            });
        }

        // --- Example Badging Trigger (Optional) ---
        // This is where you'd trigger badge updates based on your app's logic.
        // For instance, if you have an unread count from a backend:
        /*
        // Call this when your app gets new unread messages
        function updateUnreadCountAndBadge(count) {
            if (count > 0) {
                setAppBadge(count);
            } else {
                clearAppBadge();
            }
        }
        // Example: Call updateUnreadCountAndBadge(5) when user logs in and has 5 unread items
        */
        // --- End Example Badging Trigger ---
    });
});
