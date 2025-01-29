import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock } from 'lucide-react';

// Interface for submission data
interface Submission {
  type: string; // Matches the Activity interface in UserProfile
  description: string; // Matches the Activity interface in UserProfile
  points: number; // Matches the Activity interface in UserProfile
  time: string; // Matches the Activity interface in UserProfile
  issueType: string;
  issueDescription: string;
  location: string;
  image: string;
}

const PublicView = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [issueDescription, setIssueDescription] = useState<string>('');
  const [issueType, setIssueType] = useState<string>('Traffic Congestion');
  const [location, setLocation] = useState<string>('Fetching location...');
  const [timestamp, setTimestamp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number>(0);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Start the camera and fetch location when the component mounts
  useEffect(() => {
    startCamera();
    fetchLocation();
  }, []);

  // Access the camera and show the preview
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.style.display = 'block';
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
      alert('Failed to access the camera. Please ensure your camera is enabled.');
    }
  };

  // Fetch the user's location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocation('Location unavailable');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  };

  // Capture an image from the camera
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL('image/jpeg'));

        // Capture the current time
        const now = new Date();
        const formattedTime = now.toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"
        setTimestamp(formattedTime);

        alert('Image captured successfully!');
      }
    }
  };

  // Save submission to local storage
  const saveSubmission = (submission: Submission) => {
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(submissions));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmissionResult(null);

    if (!capturedImage || (issueType === 'Other' && !issueDescription)) {
      alert('Please capture an image and describe the issue (if "Other" is selected).');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call or form submission
      const apiKey = 'AIzaSyBHzN0y30E8crAJcf4NNjHqPnAj3frT4-4'; // Replace with your API key
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [
              {
                image: { content: capturedImage.split(',')[1] },
                features: [{ type: 'LABEL_DETECTION', maxResults: 1000 }],
              },
            ],
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        const labels = result.responses[0].labelAnnotations || [];
        const labelDescriptions = labels.map((label) => label.description.toLowerCase());

        // Match the image with the selected issue type or description
        const matchText = issueType === 'Other' ? issueDescription : issueType;
        const matchConfidence = calculateConfidence(matchText, labelDescriptions);
        setConfidence(matchConfidence);

        if (matchConfidence >= 50) { // Valid submission
          setSubmissionResult('Report Submitted Successfully!');

          // Save the submission
          const submission: Submission = {
            type: 'Report', // Matches the Activity interface in UserProfile
            description: `Reported ${issueType}: ${issueDescription}`, // Matches the Activity interface in UserProfile
            points: 50, // Matches the Activity interface in UserProfile
            time: timestamp, // Matches the Activity interface in UserProfile
            issueType,
            issueDescription,
            location,
            image: capturedImage,
          };
          saveSubmission(submission);
        } else { // Invalid submission
          setSubmissionResult('The image does not match the selected issue type or description.');
        }
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      setSubmissionResult('Error submitting report. Please try again.');
    } finally {
      setIsLoading(false);

      // Reset the form after submission
      setCapturedImage(null); // Clear the captured image
      setIssueDescription(''); // Clear the description
      setTimestamp(''); // Clear the timestamp
      setConfidence(0); // Reset confidence
      startCamera(); // Restart the camera
    }
  };

  // Calculate confidence based on the selected issue type or description and detected labels
  const calculateConfidence = (text: string, labels: string[]) => {
    const keywords = text.toLowerCase().split(' ');
    let matchCount = 0;

    keywords.forEach((keyword) => {
      if (labels.some((label) => label.includes(keyword))) {
        matchCount++;
      }
    });

    const confidence = (matchCount / keywords.length) * 100;
    console.log('Confidence:', confidence); // Log confidence for debugging
    return Math.min(confidence, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Report an Issue</h1>
          <p className="text-sm text-gray-600">Help improve your city by reporting issues.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="issue-type" className="block text-sm font-medium text-gray-700">
              Issue Type
            </label>
            <select
              id="issue-type"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            >
              <option>Traffic Congestion</option>
              <option>Road Maintenance</option>
              <option>Air Quality</option>
              <option>Streetlight damaged</option>
              <option>Broken tree</option>
              <option>Blocked Drains</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="Describe the issue..."
              disabled={issueType !== 'Other'} // Disable unless "Other" is selected
            ></textarea>
          </div>

          <div className="text-center">
            {capturedImage ? (
              <div>
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-auto rounded-lg mb-2"
                />
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center justify-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span><strong>Location:</strong> {location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span><strong>Time:</strong> {timestamp}</span>
                  </div>
                </div>
              </div>
            ) : (
              <video
                id="camera-preview"
                ref={videoRef}
                autoPlay
                className="w-full h-auto rounded-lg"
              ></video>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={captureImage}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {capturedImage ? 'Retake Image' : 'Capture Image'}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>

        {submissionResult && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            confidence >= 50 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {submissionResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicView;