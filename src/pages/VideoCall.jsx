import React, { useRef, useState } from 'react';
import { Button, Box } from '@mui/material';

export default function VideoCall() {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const toggleCamera = async () => {
    if (!isCameraOn) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } else {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(!isCameraOn);
  };

  return (
    <Box>
      <Button variant="contained" onClick={toggleCamera} sx={{ mb: 2 }}>
        {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </Button>
      <video ref={videoRef} autoPlay style={{ width: '100%', borderRadius: 8 }} />
    </Box>
  );
}
