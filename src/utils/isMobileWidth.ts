/**
 * Determines if the current screen width is that of a mobile device.
 * @returns {boolean} `true` if the screen width is mobile width, otherwise `false`.
 */
function isMobileWidth(): boolean {
    // Define the maximum width for mobile screens (can be adjusted based on requirements)
    const maxWidthForMobile = 768;

    // Check if window and window.innerWidth are available (necessary for SSR or non-browser environments)
    if (typeof window !== 'undefined' && window.innerWidth) {
        return window.innerWidth < maxWidthForMobile;
    }

    // Return false if the window or window.innerWidth is not available
    return false;
}

export default isMobileWidth;
