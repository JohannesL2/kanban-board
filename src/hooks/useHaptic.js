export function useHaptic() {
    return (pattern = 30) => {
        if (navigator?.vibrate) {
            navigator.vibrate(pattern);
        }
    };
}