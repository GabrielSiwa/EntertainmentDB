/*

Author: Gabriel Siwa 
Date: 30/03/2025  
Description:  
This React component provides an "About" page for the MovieDB platform. It describes the platform’s purpose and mission.

Inputs:  
- None 

Processing:  
- Renders static information about the MovieDB platform.  
- Displays a heading and descriptive content.

Outputs:  
- A visually styled section with a heading and description.
*/

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About EntertainmentDB</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="mb-4">
          Entertainment Database is a comprehensive platform that provides
          information about movies, TV shows, music, artist, and celebrities. My
          goal is to create a user-friendly interface that allows users to
          easily search and discover my favorite entertainment.
        </p>
        <p>
          Founded in 2025, EntertainmentDB continues to expand its database and
          enhance its features to better serve the global entertainment
          community.
        </p>
      </div>
    </div>
  );
}
