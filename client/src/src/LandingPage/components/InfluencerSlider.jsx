import React, { useState, useEffect, useRef } from "react";

const InfluencerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef(null);

  const influencers = [
    {
      id: 1,
      name: "John Fornander",
      category: "Fitness & Wellness",
      imageUrl: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 12500,
      engagement: 4.8,
      posts: 342,
      bio: "Fitness coach sharing workout tips and healthy lifestyle inspiration.",
      profileUrl: "/influencer/alex-johnson",
    },
    {
      id: 2,
      name: "Sophia Chen",
      category: "Fashion & Style",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 38000,
      engagement: 3.6,
      posts: 567,
      bio: "Fashion blogger passionate about sustainable clothing and personal style.",
      profileUrl: "/influencer/sophia-chen",
    },
    {
      id: 3,
      name: "Marcus Wilson",
      category: "Tech & Gaming",
      imageUrl: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D",
      followers: 21500,
      engagement: 5.2,
      posts: 423,
      bio: "Tech reviewer and gaming enthusiast sharing the latest in technology.",
      profileUrl: "/influencer/marcus-wilson",
    },
    {
      id: 4,
      name: "Priya Sharma",
      category: "Travel & Adventure",
      imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
      followers: 52000,
      engagement: 4.3,
      posts: 684,
      bio: "Travel blogger exploring hidden gems around the world.",
      profileUrl: "/influencer/priya-sharma",
    },
    {
      id: 5,
      name: "Jordan Taylor",
      category: "Food & Cooking",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 178000,
      engagement: 6.1,
      posts: 298,
      bio: "Chef and food stylist sharing delicious recipes and cooking tips.",
      profileUrl: "/influencer/jordan-taylor",
    },
    {
      id: 6,
      name: "Emma Rodriguez",
      category: "Beauty & Skincare",
      imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 87000,
      engagement: 5.4,
      posts: 412,
      bio: "Beauty expert sharing skincare routines and makeup tutorials.",
      profileUrl: "/influencer/emma-rodriguez",
    },
  ];

  const formatNumber = (num) =>
    num >= 1_000_000
      ? (num / 1_000_000).toFixed(1) + "M"
      : num >= 1_000
      ? (num / 1_000).toFixed(1) + "K"
      : num.toString();

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(4); // Show more cards per view to make each one smaller
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, influencers.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="py-8 bg-white max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Our Top Influencers</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Connect with our network of talented creators who can help grow your brand
        </p>
      </div>

      <div className="relative px-6">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-600 border border-gray-300 rounded-full p-1 z-10 shadow-md hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="overflow-hidden" ref={sliderRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(100 / cardsPerView) * currentIndex}%)` }}
          >
            {influencers.map((influencer) => (
              <div key={influencer.id} className="p-2" style={{ flex: `0 0 ${100 / cardsPerView}%` }}>
                <div className="bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-300 h-full flex flex-col">
                  <div className="w-full aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={influencer.imageUrl}
                      alt={influencer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/api/placeholder/300/300")}
                    />
                  </div>
                  <div className="p-3 flex-grow flex flex-col">
                    <h3 className="text-base font-semibold text-gray-800">{influencer.name}</h3>
                    <p className="text-xs text-blue-900 mb-2">{influencer.category}</p>

                    <div className="flex justify-between mb-2 text-xs text-gray-600">
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{formatNumber(influencer.followers)}</p>
                        <p>Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{influencer.engagement}%</p>
                        <p>Engagement</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900">{influencer.posts}</p>
                        <p>Posts</p>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs mb-3 flex-grow line-clamp-2">{influencer.bio}</p>

                    <a
                      href={influencer.profileUrl}
                      className="text-center py-1 px-3 bg-gradient-to-r from-blue-900 to-indigo-700 text-white rounded-md text-sm font-medium hover:brightness-110 transition"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-600 border border-gray-300 rounded-full p-1 z-10 shadow-md hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: Math.ceil(influencers.length / cardsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            } transition-colors`}
          />
        ))}
      </div>
    </div>
  );
};

export default InfluencerSlider;