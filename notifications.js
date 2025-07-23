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
        notificationPopup.style.display = 'flex';
        requestAnimationFrame(() => {
            notificationPopup.classList.remove('hidden');
        });
    }

    function hidePopup() {
        notificationPopup.classList.add('hidden');
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
    OneSignalDeferred.push(async function(OneSignal) {
        // Wait for the OneSignal SDK to be fully initialized and ready to use.
        // The await OneSignal.init() in your HTML handles this for the OneSignalDeferred.push context.
        // However, we can add an additional check to ensure Notifications object is fully ready.

        // Use OneSignal.Notifications.getPermission() directly, it should be available now.
        try {
            const permission = await OneSignal.Notifications.getPermission(); // Await ensures it's resolved
            console.log('OneSignal Notification Permission on load:', permission);

            // If permission is 'default' (not asked yet) AND user hasn't explicitly declined before
            if (permission === 'default' && !userDeclinedNotifications) {
                showPopup(); // Show your custom popup
            } else {
                // If permission is already granted or denied, or user declined before, ensure popup is hidden
                hidePopup();
            }
        } catch (error) {
            console.error("Error getting OneSignal notification permission:", error);
            // Fallback: hide popup if there's an error getting permission status
            hidePopup();
        }

        // Event listener for "Enable Notifications" button in your popup
        if (enableButton) {
            enableButton.addEventListener('click', async function() { // Made async to await requestPermission
                try {
                    const permission = await OneSignal.Notifications.requestPermission(); // Await this call
                    if (permission === 'granted') {
                        console.log('OneSignal Notification permission granted after user click!');
                        hidePopup(); // Hide the popup
                        setAppBadge(1); // Set badge
                    } else if (permission === 'denied') {
                        console.warn('OneSignal Notification permission denied by user.');
                        alert('Notifications denied. Please enable them manually in your iPhone Settings > Notifications for this app if you change your mind.');
                        hidePopup(); // Hide the popup
                        localStorage.setItem('userDeclinedNotifications', 'true');
                        clearAppBadge(); // Clear badge if they denied
                    } else { // 'default' (user dismissed native prompt)
                        console.log('OneSignal Notification permission request dismissed.');
                        hidePopup(); // Hide the popup
                    }
                } catch (error) {
                    console.error('Error requesting OneSignal notification permission:', error);
                    hidePopup(); // Hide the popup on error
                }
            });
        }

        // Event listener for "No Thanks" button in your popup
        if (noThanksButton) {
            noThanksButton.addEventListener('click', function() {
                console.log('User explicitly declined notifications via custom popup.');
                hidePopup();
                localStorage.setItem('userDeclinedNotifications', 'true');
                clearAppBadge();
            });
        }
    });
});
