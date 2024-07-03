// Main Fullscreen Loading Animation
export const main_screen_loader_spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 text-black"></div>
        </div>
        </div>
    ); // Render a loading indicator while checking authentication
}

// Element Loading Animation
export const element_loader_spinner = () => {
    return (
        <div className="flex items-center justify-center h-[30vh]">
        <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 text-black"></div>
        </div>
        </div>
    ); // Render a loading indicator while checking authentication
}