"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [petType, setPetType] = useState<"cat" | "dog" | "">("");
  const [emotion, setEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Select an image!");
  
    const formData = new FormData();
    formData.append("file", image);  // ✅ Key must be "file"
  
    setLoading(true);
    setEmotion(null);
  
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) throw new Error("Server error");
  
      const data = await res.json();
      setEmotion(`${data.emotion} (${(data.confidence * 100).toFixed(2)}%)`); // ✅ Include confidence
    } catch (err) {
      console.error(err);
      alert("Error predicting emotion.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden bg-cover bg-bottom bg-[url('/gg.jpg')]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />
        {/* Floating paw background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="animate-float text-4xl absolute top-10 left-10 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-40 left-2/3 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute bottom-20 right-20 opacity-70">🐾</div>
        <div className="animate-float text-2xl absolute bottom-10 left-1/4 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute top-1/2 right-1/3 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-1/3 left-1/6 opacity-70">🐾</div>
        <div className="animate-float text-2xl absolute top-20 right-1/5 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute bottom-1/3 left-2/3 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute bottom-10 right-1/4 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-5 right-5 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute top-1/4 left-1/3 opacity-70">🐾</div>
        <div className="animate-float text-2xl absolute top-3/4 right-1/6 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-16 left-1/2 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute bottom-5 left-5 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute bottom-1/4 right-2/3 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute top-2/3 left-1/5 opacity-70">🐾</div>
        <div className="animate-float text-2xl absolute bottom-1/5 right-1/2 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute top-14 right-1/4 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute bottom-1/6 left-1/2 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute top-1/5 left-2 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-2/4 left-5 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute bottom-1/3 left-3 opacity-70">🐾</div>
    </div>



      {/* Gradient pulse (optional) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 animate-pulse bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/20 via-blue-100/10 to-transparent pointer-events-none" />

      {/* Upload box */}
      <div className="relative z-10 backdrop-blur-md bg-white/70 p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-white/40">
  <h2 className="text-3xl font-bold mb-4 text-center text-purple-700 drop-shadow-sm">
    Upload Your Pet's Photo
  </h2>

  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <div className="flex gap-4 justify-center text-gray-700 font-medium">
      <label className="cursor-pointer">
        <input
          type="radio"
          name="petType"
          value="cat"
          checked={petType === "cat"}
          onChange={() => setPetType("cat")}
          className="mr-2"
        />
        Cat
      </label>
      <label className="cursor-pointer">
        <input
          type="radio"
          name="petType"
          value="dog"
          checked={petType === "dog"}
          onChange={() => setPetType("dog")}
          className="mr-2"
        />
        Dog
      </label>
    </div>

    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
        isDragActive ? "bg-purple-100 border-purple-400" : "bg-white/60 border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {image ? (
        <p className="text-gray-700">Image selected ✔️</p>
      ) : isDragActive ? (
        <p className="text-purple-500">Drop the image here...</p>
      ) : (
        <p className="text-gray-500">Drag and drop your pet's image here, or click to select</p>
      )}
    </div>

    {preview && (
      <img
        src={preview}
        alt="Preview"
        className="rounded-lg border mt-4 h-64 object-cover"
      />
    )}

    <button
      type="submit"
      disabled={loading}
      className="bg-purple-500 hover:bg-purple-600 transition text-white py-2 px-4 rounded-xl shadow-lg mt-4"
    >
      {loading ? "Analyzing..." : "Detect Emotion"}
    </button>
  </form>

  {emotion && (
    <div className="mt-6 text-center text-xl font-bold text-green-700">
      Detected Emotion: {emotion}
    </div>
  )}
</div>


      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
