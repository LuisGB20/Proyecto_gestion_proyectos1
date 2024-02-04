import React, { useState } from 'react';
import Viewer from 'react-viewer';

const DiseñadorWidget = () => {
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState([
    { src: 'https://unblast.com/wp-content/uploads/2020/01/Instagram-Mockup-3-1536x1024.jpg', alt: 'Maqueta 1' },
    { src: 'https://unblast.com/wp-content/uploads/2023/06/3D-Instagram-Mockup-1536x1152.jpg', alt: 'Maqueta 2' },
    { src: 'https://assets.awwwards.com/awards/sites_of_the_day/2024/01/ferrari-movie-1.jpg', alt: 'Maqueta 3' },
    { src: 'https://assets.awwwards.com/awards/submissions/2024/01/65aac33aeb97b588427933.png', alt: 'Maqueta 4' },
    { src: 'https://assets.awwwards.com/awards/submissions/2024/01/65aa9558729f1893117848.png', alt: 'Maqueta 5' },
    { src: 'https://assets.awwwards.com/awards/submissions/2024/01/65ae269ecff75563282182.jpg', alt: 'Maqueta 6' },
    { src: 'https://assets.awwwards.com/awards/submissions/2024/01/65acbed46c0d6983469625.jpg', alt: 'Maqueta 7' },
    { src: 'https://assets.awwwards.com/awards/media/cache/thumb_440_330/submissions/2024/01/65afb7ee09e05292939422.png', alt: 'Maqueta 8' },
    { src: 'https://assets.awwwards.com/awards/submissions/2024/01/65a909c26bfd1881297915.png', alt: 'Maqueta 9' },
    { src: 'https://assets.awwwards.com/awards/submissions/2024/01/65aede16b2aa6790823069.jpg', alt: 'Maqueta 10' },
  ]);

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-gray-100 rounded shadow-lg">
      <h3 className="text-3xl mb-6 font-bold text-center font-serif">Visor de Maquetas</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full h-48 object-cover rounded cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => setVisible(true)}
          />
        ))}
      </div>

      <Viewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={images.map((image) => ({ src: image.src, alt: image.alt }))}
      />
    </div>
  );
};

export default DiseñadorWidget;
